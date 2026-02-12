import filingStatusKey from '../filingStatusKey'

const getQBIDeduction = (site, taxableIncome, seEmployTax, param) => {
    const { selfEmployment } = site.forms.incomeWithholding.values.otherIncome
    const { seHealthInsurance, seHealthInsuranceSpouse, sepSimple, sepSimpleSpouse } = site.forms.adjustments.values.adjustments
    const { filingStatus } = site.forms.aboutYou.values

    let selfEmployIncome = selfEmployment.info[0].amount === '' ? 0 : parseInt(selfEmployment.info[0].amount),
        adjustHealthIns = seHealthInsurance.info[0].amount === '' ? 0 : parseInt(seHealthInsurance.info[0].amount),
        selfEmployIncomeSpouse = seHealthInsuranceSpouse.info[0].amount === '' ? 0 : parseInt(seHealthInsuranceSpouse.info[0].amount),
        adjustHealthInsSpouse = seHealthInsuranceSpouse.info[0].amount === '' ? 0 : parseInt(seHealthInsuranceSpouse.info[0].amount),
        halfSETaxAdj = 0.5 * seEmployTax,
        fs = filingStatusKey(filingStatus),
        adjustSERetire = sepSimple.info[0].amount === '' ? 0 : parseInt(sepSimple.info[0].amount),
        adjustSERetireSpouse = sepSimpleSpouse.info[0].amount === '' ? 0 : parseInt(sepSimpleSpouse.info[0].amount),
        adjustNetQBI = 0,
        tentativeTaxIncome = taxableIncome,
        applAmt = 0,
        tentativeQBIDeduct = 0,
        phaseThresh = 0,
        phaseRange = fs === 1 ? 100000 : 50000,
        threshHelper = 0,
        threshPct = 0,
        reduceDed = 0,
        finalQBI = 0

    if (fs === 1 || fs === 4) {
        phaseThresh = param.bracket_floor.table[1][4]
    } else {
        phaseThresh = param.bracket_floor.table[fs][4]
    }

    adjustNetQBI = (selfEmployIncome + selfEmployIncomeSpouse) - ((adjustHealthIns + adjustHealthInsSpouse) + halfSETaxAdj + (adjustSERetire + adjustSERetireSpouse))

    if (adjustNetQBI < 0) {
        adjustNetQBI = 0
    }

    applAmt = adjustNetQBI < tentativeTaxIncome ? adjustNetQBI : tentativeTaxIncome

    tentativeQBIDeduct = param.QBI_DEDUCT_PCT * applAmt

    threshHelper = tentativeTaxIncome - phaseThresh > 0 ? tentativeTaxIncome - phaseThresh : 0

    threshPct = threshHelper / phaseRange < 1 ? threshHelper / phaseRange : 1

    reduceDed = tentativeQBIDeduct * threshPct

    finalQBI = tentativeQBIDeduct - reduceDed > 0 ? tentativeQBIDeduct - reduceDed : 0

    // console.log('QBI', tentativeTaxIncome - finalQBI)

    return { total: tentativeTaxIncome - finalQBI, finalQBI }
}

export default getQBIDeduction
