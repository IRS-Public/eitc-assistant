const getTotalWHTaxesYTD = (incomes, otherIncome, futureFlag) => {
    const { currentIncomes, ssiIncomes, pastIncomes } = incomes

    let
        withholdTaxToDate = 0

    currentIncomes.forEach((currIncome) => {
        if (!futureFlag || !currIncome.futureDateFlag) {
            withholdTaxToDate += currIncome.taxWithheldYTD
        }
    })
    ssiIncomes.forEach((ssiIncome) => {
        withholdTaxToDate += ssiIncome.taxWithheldYTD
    })

    pastIncomes.forEach((pastIncome) => {
        withholdTaxToDate += pastIncome.taxWithheldYTD
    })

    Object.keys(otherIncome).forEach((item) => {
        if (item === 'otherTaxes') {
            withholdTaxToDate += ['', undefined].includes(otherIncome[item].info[0].amount) ? 0 : parseInt(otherIncome[item].info[0].amount)
        } else {
            withholdTaxToDate += ['', undefined].includes(otherIncome[item].info[0].taxes) ? 0 : parseInt(otherIncome[item].info[0].taxes)
        }
    })

    // WHToDate = taxPayer.incomes.numOfRegIncome.totals.fedIncomeTaxWithheld + taxPayer.incomes.numOfRegSpouseIncome.totals.fedIncomeTaxWithheld
    // + taxPayer.incomes.numOfPensions.totals.taxWithheldYTD + taxPayer.incomes.numOfSpousePension.totals.taxWithheldYTD
    // + taxPayer.incomes.otherIncome.totals.estTaxesPaidSelfEmploy + taxPayer.incomes.otherIncome.totals.estTaxesPaidSelfEmploySpouse
    // + taxPayer.incomes.otherIncome.totals.taxWithheldUnemployment + taxPayer.incomes.otherIncome.totals.taxWithheldUnemploymentSpouse
    // + taxPayer.incomes.socialSecurity.totals.ssiAmtHeldYTD + taxPayer.incomes.socialSecuritySpouse.totals.ssiAmtHeldYTD
    // + taxPayer.incomes.otherIncome.totals.catchAllTaxesAmount + taxPayer.incomes.numOfRegIncome.bonusFutureWH + taxPayer.incomes.numOfRegSpouseIncome.bonusFutureWH

    return withholdTaxToDate
}

export default getTotalWHTaxesYTD
