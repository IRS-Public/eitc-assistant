import calcAgiForEitc from '../../../calculations/agi/calcAgiForEitc'
import params from '../../../calculations/eitc/EITCParams.json'

export default (values, numOfDependents, filingStatus, year) => {
  const dq = {}
  const maxLimit = params[year]?.EITCMaxLimits[filingStatus !== 'married' ? 'single' : 'married'][numOfDependents > 3 ? 3 : numOfDependents]

  const reducer = (sum, item) => sum + parseInt(item.amount)

  if (values.unearnedIncome.investments.info.reduce(reducer, 0) > params[year]?.investmentsThreshold) {
    dq.investmentIncome = true
  }

  if (
    ((values.earnedIncome.wagesFederalWithheld.info.reduce(reducer, 0) > 0)
      || (values.earnedIncome.federalIncomeNotWithheld.info.reduce(reducer, 0) > 0)
      || (values.earnedIncome.selfEmploymentGross.info.reduce(reducer, 0) > 0)
      || (values.earnedIncome.disabilityRetirement.info.reduce(reducer, 0) > 0)
      || (values.earnedIncome.foreignEarnedIncome.info.reduce(reducer, 0) > 0))
    && (calcAgiForEitc(values).earned - calcAgiForEitc(values).deductions) <= 0
  ) {
    dq.earnedIncomeNeg = true
  }

  if (calcAgiForEitc(values).agi >= maxLimit) {
    dq.agi = true
  }

  if ((calcAgiForEitc(values).earned - calcAgiForEitc(values).deductions) >= maxLimit) {
    dq.earned = true
  }

  return dq
}
