import totalAgiCalc from './totalAgiCalc'

const calcAgiForEitc = (values) => {
  let earned = 0
  let deductions = 0
  let unearned = 0
  let adjustments = 0

  const netNotWithheld = Math.round((values.earnedIncome.federalIncomeNotWithheld.info[0].amount - values.earnedIncome.federalIncomeNotWithheldNested.selfEmploymentExpensesFINW.info[0].amount))
  const netSelfEmployment = Math.round((values.earnedIncome.selfEmploymentGross.info[0].amount - values.earnedIncome.selfEmploymentGrossNested.selfEmploymentExpensesSEG.info[0].amount))
  
  const mergedValues = {
    ...values.earnedIncome,
    ...values.earnedIncome.wagesFederalWithheldNested,
    ...values.earnedIncome.federalIncomeNotWithheldNested,
    ...values.earnedIncome.selfEmploymentGrossNested,
    ...values.unearnedIncome,
    ...values.adjustments,
  }

  mergedValues.selfEmploymentPaidSEG.info[0].amount = (netNotWithheld * .9235 * .153 * .5)
  mergedValues.federalIncomeNotWithheldNested.selfEmploymentPaidFINW.info[0].amount = (netSelfEmployment * .9235 * .153 * .5)

  delete mergedValues.wagesFederalWithheldNested
  delete mergedValues.federalIncomeNotWithheldNested
  delete mergedValues.selfEmploymentGrossNested

  const reducer = (sum, item) => {
    const amount = item.amount === '' ? 0 : item.amount

    return sum + parseInt(amount)
  }

  Object.keys(mergedValues).forEach((item) => {
    switch (mergedValues[item].category) {
      case 'earned':
        earned += Number.isNaN(mergedValues[item]?.info.reduce(reducer, 0))
          ? 0 : mergedValues[item]?.info.reduce(reducer, 0)
        break
      case 'unearned':
        unearned += Number.isNaN(mergedValues[item]?.info.reduce(reducer, 0))
          ? 0 : mergedValues[item]?.info.reduce(reducer, 0)
        break
      case 'adjustments':
        adjustments += Number.isNaN(mergedValues[item]?.info.reduce(reducer, 0))
          ? 0 : mergedValues[item]?.info.reduce(reducer, 0)
        break
      case 'deductions':
        deductions += Number.isNaN(mergedValues[item]?.info.reduce(reducer, 0))
          ? 0 : mergedValues[item]?.info.reduce(reducer, 0)
        break
      default:
        null
    }
  })

  const total = totalAgiCalc(earned, unearned, adjustments, deductions)

  return {
    agi: total < 0 ? 0 : total,
    earned,
    deductions
  }
}

export default calcAgiForEitc
