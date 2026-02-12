import getTotalAdjustments from './adjustments/getTotalAdjustments'
import getTaxablePartSSI from './income/getTaxablePartSSI'
import getTotalFromArray from './getTotalFromArray'
import getStudentLoanPhaseOut from './adjustments/getStudentLoanPhaseOut'

const getAgi = (filingStatus, adjustments, totalIncome, param) => {
  const { currentIncomes, pastIncomes, otherIncome, ssiIncomes } = totalIncome

  let finalTotalIncome = 0,
    finalTotalRetCafe = 0,
    totalIncomeForEITC = 0,
    earnedIncomeComp = 0,
    totalWageIncomeEstPay = 0,
    modAGI = 0

  currentIncomes.forEach((currIncome) => {
    const tempIncome = currIncome.totalWages + currIncome.bonusAmount + currIncome.bonusAmountFuture

    finalTotalIncome += tempIncome
    finalTotalRetCafe += currIncome.nonTaxPayrollTotal
    if (['salary', 'hourly'].includes(currIncome.incomeType)) {
      totalIncomeForEITC += tempIncome
      totalWageIncomeEstPay += tempIncome
    }
  })

  pastIncomes.forEach((pastIncome) => {
    const tempIncome = pastIncome.totalWages + pastIncome.bonusAmount + pastIncome.bonusAmountFuture

    finalTotalIncome += tempIncome
    finalTotalRetCafe += pastIncome.nonTaxPayrollTotal
    if (['salary', 'hourly'].includes(pastIncome.incomeType)) {
      totalIncomeForEITC += tempIncome
      totalWageIncomeEstPay += tempIncome
    }
  })
  Object.keys(otherIncome).forEach((item) => {
    if (item !== 'otherTaxes') {
      if (item !== 'plannedEstimatedTaxPayments') {
        finalTotalIncome += ['', undefined].includes(otherIncome[item].info[0].amount) ? 0 : parseInt(otherIncome[item].info[0].amount)
      }
    }
    if (item === 'scholarship') {
      earnedIncomeComp = ['', undefined].includes(otherIncome[item].info[0].amount) ? 0 : parseInt(otherIncome[item].info[0].amount)
    }
    if (item === 'selfEmployment') {
      totalIncomeForEITC += ['', undefined].includes(otherIncome[item].info[0].amount) ? 0 : parseInt(otherIncome[item].info[0].amount)
    }
  })

  earnedIncomeComp += totalIncomeForEITC

  const adjustmentsTotal = getTotalAdjustments(adjustments, filingStatus, totalIncome, param)

  let agi = (finalTotalIncome - adjustmentsTotal - finalTotalRetCafe) < 0 ? 0 : (finalTotalIncome - adjustmentsTotal - finalTotalRetCafe)

  modAGI = agi

  const studentLoanTotal = getTotalFromArray(adjustments.studentLoan.info, param.studentLoanDeductionCap)
  const studentLoanPhaseOut = getStudentLoanPhaseOut(agi, studentLoanTotal, filingStatus, param)

  agi -= studentLoanPhaseOut

  const ssiTaxableTotalAmt = getTaxablePartSSI(ssiIncomes, agi, filingStatus, param)

  agi += ssiTaxableTotalAmt

  finalTotalIncome += ssiTaxableTotalAmt

  return {
    agi,
    earnedIncomeComp,
    totalIncomeForEITC,
    finalTotalIncome,
    totalWageIncomeEstPay: totalWageIncomeEstPay - finalTotalRetCafe,
    finalTotalRetCafe,
    modAGI
  }
}

export default getAgi
