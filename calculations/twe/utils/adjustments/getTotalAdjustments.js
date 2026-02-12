import getTotalFromArray from '../getTotalFromArray'
import getSelfEmployTax from '../getSelfEmployTax'

const getTotalAdjustments = (adjustmentsArr, filingStatus, incomes, param) => {
  let total = 0,
    halfSETaxAdj = 0

  const educatorLimit = filingStatus === 'married' ? param.EDUCATOR_MFJ : param.EDUCATOR_NON_MFJ
  const educatorTotal = getTotalFromArray(adjustmentsArr.educator.info, educatorLimit)

  const adjustmentNames = [
    'seHealthInsurance',
    'seHealthInsuranceSpouse',
    'sepSimple',
    'sepSimpleSpouse',
    'ira',
    'hsa',
    'moving',
    'alimony',
    'earlyWithdrawal',
    'business'
  ]

  adjustmentNames.forEach((name) => {
    total += getTotalFromArray(adjustmentsArr[name].info)
  })

  const seEmployTax = getSelfEmployTax(incomes, param)

  if (seEmployTax > 0) {
    halfSETaxAdj = 0.5 * seEmployTax
    total += halfSETaxAdj
  }

  return total + educatorTotal
}

export default getTotalAdjustments
