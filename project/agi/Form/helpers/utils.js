const reducer = (sum, item) => sum + parseInt(item.amount)

export const isAnyIncomeChecked = (values) => (
  values.earnedIncome.wagesFederalWithheld.checked
  || values.earnedIncome.federalIncomeNotWithheld.checked
  || values.earnedIncome.selfEmploymentGross.checked
  || values.earnedIncome.disabilityRetirement.checked
  || values.earnedIncome.foreignEarnedIncome.checked
  || values.earnedIncome.prisonIncome.checked
)

export const isAnyUnearnedChecked = (values) => (
  values.unearnedIncome.pension.checked
  || values.unearnedIncome.unemploymentInsurance.checked
  || values.unearnedIncome.socialSecurityRailroad.checked
  || values.unearnedIncome.scholarship.checked
  || values.unearnedIncome.investments.checked
  || values.unearnedIncome.unearnedOther.checked
)

export const isAnyAdjustmentsChecked = (values) => (
  values.adjustments.studentLoan.checked
  || values.adjustments.educator.checked
  || values.adjustments.ira.checked
  || values.adjustments.hsa.checked
  || values.adjustments.moving.checked
  || values.adjustments.alimony.checked
  || values.adjustments.earlyWithdrawalPenalty.checked
  || values.adjustments.business.checked
  || values.adjustments.otherAdjustments.checked
)

export const isEarnedOnlyPrisonIncome = (values) => (Number.isNaN(values.earnedIncome.wagesFederalWithheld.info.reduce(reducer, 0)))
  && (Number.isNaN(values.earnedIncome.federalIncomeNotWithheld.info.reduce(reducer, 0)))
  && (Number.isNaN(values.earnedIncome.selfEmploymentGross.info.reduce(reducer, 0)))
  && (Number.isNaN(values.earnedIncome.disabilityRetirement.info.reduce(reducer, 0)))
  && (Number.isNaN(values.earnedIncome.foreignEarnedIncome.info.reduce(reducer, 0)))
