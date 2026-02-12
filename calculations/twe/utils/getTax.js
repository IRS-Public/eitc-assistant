import filingStatusKey from './filingStatusKey'

export function getBaseAmounts(param) {
    let
        base_amount = [],
        TAX_RATES = param.bracket_floor.table[0].length,
        bracket_floor = param.bracket_floor.table,
        tax_rate = param.tax_rate

    for (let n = 0; n < 4; n++) base_amount[n] = []

    for (let i = 0; i < 4; i++) {
        base_amount[i][0] = 0.0
        for (let j = 1; j < TAX_RATES; j++) {
            base_amount[i][j] = ((bracket_floor[i][j] - bracket_floor[i][j - 1]) * tax_rate[j - 1]) + base_amount[i][j - 1];
        }
    }

    return base_amount
}

export function getEffectiveTaxIncome(taxableIncome, param) {
    /* Constants from Parameters JSON File */
    const
        USE_TABLE = param.USE_TABLE,
        USE_SCHEDULES = param.USE_SCHEDULES,
        SM_TABLE_DIFF = param.SM_TABLE_DIFF,
        USE_BIG_TABLE_DIFF = param.USE_BIG_TABLE_DIFF,
        BIG_TABLE_DIFF = param.BIG_TABLE_DIFF,
        TABLE_CUT_1 = param.TABLE_CUT_1,
        TABLE_CUT_2 = param.TABLE_CUT_2,
        effectiveIncome1 = param.effective_income_1,
        effectiveIncome2 = param.effective_income_2,
        effectiveIncome3 = param.effective_income_3;

    let
        effectiveTaxableIncome = 0,
        tableDiff = 0,
        result = 0,
        integer2 = 0
    // fraction = 0

    if (taxableIncome >= USE_TABLE && taxableIncome < USE_SCHEDULES) {
        if (taxableIncome < USE_BIG_TABLE_DIFF) {
            tableDiff = SM_TABLE_DIFF;
        } else {
            tableDiff = BIG_TABLE_DIFF;
        }
        result = taxableIncome / tableDiff;
        integer2 = Math.trunc(result);

        effectiveTaxableIncome = (integer2 * tableDiff) + (tableDiff / 2);
    } else {
        if (taxableIncome >= TABLE_CUT_2 && taxableIncome < USE_TABLE) {
            effectiveTaxableIncome = effectiveIncome3;
        } else if (taxableIncome >= TABLE_CUT_1 && taxableIncome < TABLE_CUT_2) {
            effectiveTaxableIncome = effectiveIncome2;
        } else if (taxableIncome < TABLE_CUT_1) {
            effectiveTaxableIncome = effectiveIncome1;
        } else {
            effectiveTaxableIncome = taxableIncome; /* income above tax table */
        }
    }
    return effectiveTaxableIncome;
}

const getTax = (site, taxableIncome, param) => {
    /* Constants from Parameters JSON File */
    const
        { filingStatus } = site.forms.aboutYou.values,
        bracketFloor = param.bracket_floor,
        taxRate = param.tax_rate,
        baseAmounts = getBaseAmounts(param),
        useSchedules = param.USE_SCHEDULES,
        fsKey = filingStatusKey(filingStatus) === 4 ? 1 : filingStatusKey(filingStatus),
        effectiveTaxableIncome = getEffectiveTaxIncome(taxableIncome, param),
        taxRates = bracketFloor.table[0].length
    let
        tax = 0,
        tableTax = 0,
        n

    // taxPayer.calculations.baseAmounts = baseAmounts
    /* added a check since filingStatus for widow is currently setting to 4 instead of 1 .. need to verify  */
    // if (filingStatus === 4) {
    //     filingStatus = 1
    // }

    /* work down from TAX_RATES-1 because working up will always be true with n = 0 */
    for (n = taxRates - 1; n >= 0; n--) {
        const fs = fsKey === 4 ? 1 : fsKey
        if (taxableIncome > bracketFloor.table[fs][n]) {
            tax = baseAmounts[fs][n] + ((taxableIncome - bracketFloor.table[fs][n]) * taxRate[n])
            break;
        }
    }
    for (n = taxRates - 1; n >= 0; n--) {
        const fs = fsKey === 4 ? 1 : fsKey
        if (effectiveTaxableIncome > bracketFloor.table[fs][n]) {
            tableTax = baseAmounts[fs][n] + ((effectiveTaxableIncome - bracketFloor.table[fs][n]) * taxRate[n])
            break;
        }
    }
    if (taxableIncome < useSchedules) {
        tax = tableTax
    }

    // taxPayer.calculations.tax = Math.round(tax)
    // taxPayer.calculations.tableTax = Math.round(tableTax)
    // taxPayer.calculations.incomeTax = Math.round(tax)

    return { tax, tableTax }
}

export default getTax
