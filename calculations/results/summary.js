import { formatMoney } from '../../helpers'
import calcAgiForEitc from '../agi/calcAgiForEitc'

const summary = (site, values, lang, numOfDependents) => {
  const earnedArray = []
  const unearnedArray = []
  const adjustmentsArray = []
  const { agi } = calcAgiForEitc(site.forms.agi.values)


  const mergedEarned = {
    wagesFederalWithheld: { ...site.forms.agi.values.earnedIncome.wagesFederalWithheld },
    ...site.forms.agi.values.earnedIncome.wagesFederalWithheldNested,
    federalIncomeNotWithheld: { ...site.forms.agi.values.earnedIncome.federalIncomeNotWithheld },
    ...site.forms.agi.values.earnedIncome.federalIncomeNotWithheldNested,
    selfEmploymentGross: { ...site.forms.agi.values.earnedIncome.selfEmploymentGross },
    ...site.forms.agi.values.earnedIncome.selfEmploymentGrossNested,
    ...site.forms.agi.values.earnedIncome
  }

  const mergedValues = {
    ...mergedEarned,
    ...site.forms.agi.values.unearnedIncome,
    ...site.forms.agi.values.adjustments,
  }

  delete mergedValues.wagesFederalWithheldNested
  delete mergedValues.federalIncomeNotWithheldNested
  delete mergedValues.selfEmploymentGrossNested

  const reducer = (sum, item) => sum + parseInt(item.amount)

  Object.keys(mergedValues).forEach((fieldName) => {
    if (mergedValues[fieldName]?.info.reduce(reducer, 0) > 0) {
      if (mergedValues[fieldName].category === 'earned' || mergedValues[fieldName].category === 'deductions') {
        earnedArray.push({
          indent: true,
          label: '',
          value: [`result.span.${fieldName}`, mergedValues[fieldName].category === 'deductions'
            ? `${formatMoney(mergedValues[fieldName]?.info.reduce(reducer, 0))}`
            : formatMoney(mergedValues[fieldName]?.info.reduce(reducer, 0))],
          edit: 'agi',
          ariaLabel: lang(`agi.label.${fieldName}`, { ':bold': lang('agi.label.federalIncomeNotWithheldNot') }),
          dataTestId: fieldName,
        })
        earnedArray[0].label = 'earned'
      }

      if (mergedValues[fieldName].category === 'unearned') {
        unearnedArray.push({
          indent: true,
          label: '',
          value: [`result.span.${fieldName}`, formatMoney(mergedValues[fieldName]?.info.reduce(reducer, 0))],
          edit: 'agi',
          ariaLabel: `agi.label.${fieldName}`,
          dataTestId: fieldName,
        })
        unearnedArray[0].label = 'unearned'
      }

      if (mergedValues[fieldName].category === 'adjustments') {
        adjustmentsArray.push({
          indent: true,
          label: '',
          value: [`result.span.${fieldName}`, formatMoney(mergedValues[fieldName]?.info.reduce(reducer, 0))],
          edit: 'agi',
          ariaLabel: `agi.label.${fieldName}`,
          dataTestId: fieldName,
        })
        adjustmentsArray[0].label = 'adjustment'
      }
    }

    return null
  })

  const childValue = () => {
    if (numOfDependents === 0) {
      return 'results.p.noQualifyingChildren'
    }
    if (numOfDependents === 1) {
      return 'results.p.oneQualifyingChild'
    }
    if (numOfDependents === 2) {
      return 'results.p.twoQualifyingChildren'
    }
    if (numOfDependents === 3) {
      return 'results.p.threeQualifyingChildren'
    }
    return 'results.p.noQualifyingChildren'
  }

  const childrenArray = [
    {
      label: 'children',
      value: childValue(),
      edit: 'qualifyingChildren',
      ariaLabel: 'results.label.children',
      dataTestId: 'qualifyingChildren',
    },
  ]

  const temp = [
    {
      label: 'taxYear',
      value: values.generalInfo.values.year,
      edit: 'generalInfo',
      ariaLabel: 'results.label.taxYear',
      dataTestId: 'year',
    },
    {
      label: 'filingStatus',
      value: `global.label.${values.filingStatus.fsCalc}`,
      edit: 'filingStatus',
      ariaLabel: 'results.label.filingStatus',
      dataTestId: 'filingStatus',
    },
    {
      label: 'agi',
      value: formatMoney(agi),
      edit: 'agi',
      ariaLabel: 'results.label.agi',
      dataTestId: 'agi',
    },
  ]

  return [...temp, ...earnedArray, ...unearnedArray, ...adjustmentsArray, ...childrenArray]
}

export default summary
