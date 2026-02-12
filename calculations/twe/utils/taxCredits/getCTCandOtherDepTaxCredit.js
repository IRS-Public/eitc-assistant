
import getAgi from '../getAgi'
import getEducationCredit from './getEducationCredit'
import getDepCareCredit from './getDepCareCredit'
import getSelfEmployTax from '../getSelfEmployTax'

const getCTCandOtherDepTaxCredit = (site, tableTax, ssAndMedTaxes, incomes, eitcTaxCreditAmt, param) => {
    // Child Tax Credit and Credit for Other Dependents Worksheet
    // https://www.irs.gov/publications/p972#en_US_2020_publink100052125

    const { filingStatus } = site.forms.aboutYou.values,
        { currentIncomes, pastIncomes, otherIncome } = incomes,
        selfEmployIncome = otherIncome.selfEmployment.info[0].amount === '' ? 0 : otherIncome.selfEmployment.info[0].amount,
        { childrenAges } = site.forms.taxCredits.values,
        { values } = site.forms.taxCredits,
        { adjustments } = site.forms.adjustments.values,
        selfEmpTax = getSelfEmployTax(incomes, param)

    const agi = getAgi(filingStatus, adjustments, incomes, param),
        depCareCredit = getDepCareCredit(agi.agi, filingStatus, incomes, values, param)

    const { nonRefundableAOTC } = getEducationCredit(site, tableTax, incomes, param)

    let totalEarnedIncome = 0,
        finalTotalRetCafe = 0,
        finalEarnedIncome = 0

    currentIncomes.forEach((currIncome) => {
        const tempIncome = currIncome.totalWages + currIncome.bonusAmount + currIncome.bonusAmountFuture
        totalEarnedIncome += tempIncome
        finalTotalRetCafe += currIncome.nonTaxPayrollTotal
    })

    pastIncomes.forEach((pastIncome) => {
        const tempIncome = pastIncome.totalWages + pastIncome.bonusAmount + pastIncome.bonusAmountFuture
        totalEarnedIncome += tempIncome
        finalTotalRetCafe += pastIncome.nonTaxPayrollTotal
    })
    finalEarnedIncome = totalEarnedIncome + selfEmployIncome - finalTotalRetCafe

    let totalOtherTaxCredits = 0
    const taxCreditNames = [
        'adoptionCreditAmount',
        'foreignTaxCredit',
        'retirementSavingsCredit',
        'homeOwnerTaxCredit',
        'homeOwnerMortgageTaxCredit',
        'elderlyTaxCredit',
        'businessCredit',
        'alternativeMinimumCredit',
        'energyMotorVehicleTaxCredit',
        'energyRefuelingTaxCredit',
        'energyPlugInTaxCredit'
    ]

    taxCreditNames.forEach((taxName) => {
        totalOtherTaxCredits += parseInt(values[taxName]) || 0
    })
    totalOtherTaxCredits += (nonRefundableAOTC + depCareCredit)// TODO: add DepCareCredit

    // console.log('totalOtherTaxCredits', totalOtherTaxCredits)

    let depUnder17 = 0,
        depOver = 0,
        total = 0

    childrenAges.forEach((child) => {
        if (child !== '') {
            parseInt(child) >= 17 ? depOver++ : depUnder17++
        }
    })
    // console.log('test', childrenAges, depUnder17, depOver)

    let
        nonRefundCreditCTC = 0,
        totalNonrefundCredits = 0,
        refundableAddtlChildTaxCredit = 0,
        Line1 = depUnder17 * param.CH_CR_AMOUNT,
        Line2 = depOver * param.NON_CHILD_DEPENDENT_AMOUNT,
        Line3 = Line1 + Line2,
        Line4 = agi.agi,
        Line5 = filingStatus === 'married' ? param.CH_CR_LIMIT_JOINT : param.CH_CR_LIMIT_SINGLE,
        Line6 = 0,
        Line7 = 0,
        Line8 = 0,
        Line9 = tableTax + selfEmpTax,
        Line10 = 0,
        Line11 = 0,
        Line12 = 0;

    if (Line4 > Line5) {
        Line6 = Math.ceil((Line4 - Line5) / 1000) * 1000;
        Line7 = Line6 * 0.05;
    }
    Line8 = Line3 > Line7 ? Line3 - Line7 : 0;
    Line10 = totalOtherTaxCredits
    Line11 = Line9 - Line10;
    Line12 = Line8 > Line11 ? Line11 : Line8;
    nonRefundCreditCTC = Line12 < 0 ? 0 : Line12;
    totalNonrefundCredits = Line10 + nonRefundCreditCTC;

    // Additional Child Tax Credit (Refundable portion, Schedule 8812)
    // Part I. All Filers

    let
        schedule8812Line1 = Line8,
        schedule8812Line2 = Line12,
        schedule8812Line3 = schedule8812Line1 - schedule8812Line2,
        schedule8812Line15 = 0;

    if (schedule8812Line3 > 0) {
        let
            schedule8812Line4 = depUnder17 * param.SCHEDULE_8812_CHILD_AMT,
            schedule8812Line5 = Math.min(schedule8812Line3, schedule8812Line4),
            schedule8812Line6a = finalEarnedIncome < 0 ? 0 : finalEarnedIncome,
            schedule8812Line6b = 0,
            schedule8812Line7 = 0,
            schedule8812Line8 = 0,
            schedule8812Line9 = 0,
            schedule8812Line10 = 0, // Assume always zero
            schedule8812Line11 = 0,
            schedule8812Line12 = 0,
            schedule8812Line13 = 0,
            schedule8812Line14 = 0;

        if (schedule8812Line6a > 2500) {
            schedule8812Line7 = schedule8812Line6a - 2500;
            schedule8812Line8 = schedule8812Line7 * 0.15;
        }

        if (schedule8812Line4 >= 4200) {
            if (schedule8812Line8 >= schedule8812Line5) {
                schedule8812Line15 = schedule8812Line5;
            } else {
                // Part II. Certain Filers Who Have Three or More Qualifying Children

                if (depUnder17 >= 3) {
                    // TODO need to calculate and add ssTax and medSSTax
                    schedule8812Line9 = ssAndMedTaxes.ssTax + ssAndMedTaxes.medSSTax; // Assume Additional Medicare taxes withheld = 0
                    schedule8812Line11 = schedule8812Line9 + schedule8812Line10;
                    // TODO need to get computeEITC value
                    schedule8812Line12 = eitcTaxCreditAmt
                    schedule8812Line13 = Math.max(0, schedule8812Line11 - schedule8812Line12);
                    schedule8812Line14 = Math.max(schedule8812Line8, schedule8812Line13);
                    schedule8812Line15 = Math.min(schedule8812Line5, schedule8812Line14);
                }
            }
        } else {
            if (schedule8812Line8 > 0) {
                schedule8812Line15 = Math.min(schedule8812Line5, schedule8812Line8)
            }
        }
        refundableAddtlChildTaxCredit = schedule8812Line15;
    }
    // console.log('child credits', nonRefundCreditCTC, totalNonrefundCredits, refundableAddtlChildTaxCredit)

    // total = totalNonrefundCredits + refundableAddtlChildTaxCredit

    return { nonRefundCreditCTC, totalNonrefundCredits, refundableAddtlChildTaxCredit }
}

export default getCTCandOtherDepTaxCredit
