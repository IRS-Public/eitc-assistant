import * as scenarios from '../Form/FormObject'
import * as AlertsHtml from '../Structure/AlertsHtml'

const disqualifiers = (values, langCode) => {
  const dq = {}

  if (scenarios.showCitizen(values) && values.citizen === 'no') {
    dq.citizenWarning = {
      id: 'citizenWarning',
      elements: AlertsHtml.citizenWarning(values.year)
    }
  }

  if (scenarios.showValidSSN(values) && values.validSSN === 'no') {
    dq.validSSNWarning = {
      id: 'validSSNWarning',
      elements: AlertsHtml.validSSNWarning(langCode)
    }
  }

  if (scenarios.showForeignIncome(values) && values.foreignIncome === 'yes') {
    dq.foreignIncome = {
      id: 'foreignIncomeWarning',
      elements: AlertsHtml.foreignIncomeWarning()
    }
  }

  if (scenarios.showClaimedAsDependent(values) && values.claimedAsDependent === 'yes') {
    dq.claimedAsDependentWarning = {
      id: 'claimedAsDependentWarning',
      elements: AlertsHtml.claimedAsDependentWarning()
    }
  }

  return dq
}

export default disqualifiers
