const getSelfEmployTax = (incomes, param) => {
    const
        fractionOfSEIncomeTax = param.FRACTION_OF_SE_INCOME_SUBJECT_TO_TAX,
        seIncomeThreshold = param.SE_INCOME_THRESHOLD,
        ssLimit = param.SS_LIMIT,
        medicareTaxRate = param.MEDICARE_TAXRATE,
        ssTax = param.SS_TAXRATE,
        { currentIncomes, pastIncomes, otherIncome } = incomes,
        selfEmployIncome = otherIncome.selfEmployment.info[0].amount === '' ? 0 : parseInt(otherIncome.selfEmployment.info[0].amount)

    let totalSEIncome = 0,
        finalSETaxes = 0

    currentIncomes.forEach((currIncome) => {
        const tempIncome = currIncome.totalWages + currIncome.bonusAmount + currIncome.bonusAmountFuture
        totalSEIncome += tempIncome
    })

    pastIncomes.forEach((pastIncome) => {
        const tempIncome = pastIncome.totalWages + pastIncome.bonusAmount + pastIncome.bonusAmountFuture
        totalSEIncome += tempIncome
    })

    let
        selfIncomeSubjToTaxYou = 0,
        salariesLessSSLimit = 0,
        line6 = 0

    if (selfEmployIncome > 0) {
        selfIncomeSubjToTaxYou = fractionOfSEIncomeTax * selfEmployIncome
        if (selfIncomeSubjToTaxYou < seIncomeThreshold) {
            finalSETaxes = 0
        } else {
            salariesLessSSLimit = (ssLimit - totalSEIncome) <= 0 ? 0 : (ssLimit - totalSEIncome)
            line6 = salariesLessSSLimit < selfIncomeSubjToTaxYou ? salariesLessSSLimit : selfIncomeSubjToTaxYou
            finalSETaxes = medicareTaxRate * selfIncomeSubjToTaxYou + ssTax * line6
        }
    } else {
        finalSETaxes = 0
    }

    return finalSETaxes
}

export default getSelfEmployTax
