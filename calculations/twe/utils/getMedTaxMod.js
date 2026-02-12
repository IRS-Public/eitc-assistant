import filingStatusKey from './filingStatusKey'

const getMedTaxMod = (filingStatus, incomes, seIncomeTax, param) => {
    let totalIncome = 0,
        totalRetCafe = 0,
        totalOtherIncome = 0

    const { currentIncomes, pastIncomes, otherIncome } = incomes

    // console.log('superIncomesMED', incomes)

    currentIncomes.forEach((currIncome) => {
        const tempIncome = currIncome.totalWages + currIncome.bonusAmount + currIncome.bonusAmountFuture
        totalIncome += tempIncome
        totalRetCafe += currIncome.nonTaxPayrollTotal
    })

    pastIncomes.forEach((pastIncome) => {
        const tempIncome = pastIncome.totalWages + pastIncome.bonusAmount + pastIncome.bonusAmountFuture
        totalIncome += tempIncome
        totalRetCafe += pastIncome.nonTaxPayrollTotal
    })
    Object.keys(otherIncome).forEach((item) => {
        if (item !== 'otherTaxes') {
            totalOtherIncome += ['', undefined].includes(otherIncome[item].info[0].amount) ? 0 : parseInt(otherIncome[item].info[0].amount)
        }
    })

    let
        addtlMedicareTax = 0,
        fskey = filingStatusKey(filingStatus),
        totalMedicareSalaries = 0,
        addtlMedicareThreshold = 0
    // kiddieTax = taxPayer.calculations.kiddieTax,
    // seIncomeTax = taxPayer.calculations.selfEmployIncomeTax

    if (fskey === 1) {
        addtlMedicareThreshold = param.addtl_medicare_mfj_threshold
    }
    else if (fskey === 2) {
        addtlMedicareThreshold = param.addtl_medicare_mfs_threshold
    }
    else {
        addtlMedicareThreshold = param.addtl_medicare_single_threshold
    }

    totalMedicareSalaries = totalIncome + totalOtherIncome - totalRetCafe

    if (totalMedicareSalaries > addtlMedicareThreshold) {
        addtlMedicareTax = (totalMedicareSalaries - addtlMedicareThreshold) * param.addtl_medicare_rate
    }

    // if(taxPayer.calculations.kiddieFlag === true){
    //     taxPayer.calculations.tax = (kiddieTax + seIncomeTax + addtlMedicareTax)
    //                               - (taxPayer.calculations.nonChildDependentCredit
    //                                  + taxPayer.calculations.childCredit
    //                                  + taxPayer.calculations.earnedIncomeTaxCredit)
    // }

    return addtlMedicareTax
}

export default getMedTaxMod
