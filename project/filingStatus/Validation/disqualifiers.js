import fsCalc from '../Form/helpers/fsCalc'
import * as scenarios from '../Form/helpers/fsScenarios'
import * as AlertsHtml from '../Structure/AlertsHtml'
import params from '../../../calculations/eitc/EITCParams.json'

const disqualifiers = (values, site, langCode) => {
  const { year, age, qualifiedHomelessYouth, student } = site.forms.generalInfo.values
  const dq = {}

  if (fsCalc(values) === 'married-separate') {
    if (params[year].useARPA) {
      if (scenarios.showMfsLegalDoc(values, year) && values.mfsLegalDoc === 'no') {
        dq.mfsWarning = {
          id: 'mfsWarning',
          elements: AlertsHtml.mfsWarning(year, langCode)
        }
      }
    } else {
      dq.mfsWarning = {
        id: 'mfsWarning',
        elements: AlertsHtml.mfsWarning(year, langCode)
      }
    }
  }

  if (fsCalc(values) === 'head-of-household') {
    if (params[year].useARPA) {
      if (scenarios.showMfsLegalDoc(values, year) && values.mfsLegalDoc === 'no') {
        dq.mfsWarning = {
          id: 'mfsWarning',
          elements: AlertsHtml.mfsWarning(year, langCode)
        }
      }
    }
  }

  if (scenarios.showSpouseValidSSN(values) && values.spouseValidSSN === 'no') {
    dq.spouseValidSSN = {
      id: 'spouseValidSSN',
      elements: AlertsHtml.spouseValidSSNWarning()
    }
  }

  if (scenarios.showDeceasedSpouseValidSSN(values) && values.deceasedSpouseValidSSN === 'no') {
    dq.deceasedSpouseValidSSN = {
      id: 'deceasedSpouseValidSSN',
      elements: AlertsHtml.deceasedSpouseValidSSNWarning()
    }
  }

  if (((((fsCalc(values) === 'single'
    || fsCalc(values) === 'head-of-household'
    || fsCalc(values) === 'widow')
    && !scenarios.meetAgeRequirement(year, age, qualifiedHomelessYouth, student))
    || (fsCalc(values) === 'married'
      && params[year].useARPA
      && (!scenarios.meetAgeRequirement(year, age, qualifiedHomelessYouth, student)
        && ((!scenarios.meetAgeRequirement(year, values.spouseAge, values.spouseQualifiedHomelessYouth, values.spouseStudent)
          && (scenarios.showSpouseAge(values, site) && values.spouseAge !== ''))
          || (!scenarios.meetAgeRequirement(year, values.deceasedSpouseAge, values.deceasedSpouseQualifiedHomelessYouth, values.deceasedSpouseStudent)
            && (scenarios.showDeceasedSpouseAge(values, site) && values.deceasedSpouseAge !== '')))))
    || (fsCalc(values) === 'married'
      && !params[year].useARPA
      && (!scenarios.meetAgeRequirement(year, age, qualifiedHomelessYouth, student)
        && ((!scenarios.meetAgeRequirement(year, values.spouseAge, values.spouseQualifiedHomelessYouth, values.spouseStudent)
          && (scenarios.showSpouseAge(values, site) && values.spouseAge !== ''))
          || ((!scenarios.meetAgeRequirement(year, values.deceasedSpouseAge, values.deceasedSpouseQualifiedHomelessYouth, values.deceasedSpouseStudent))
            && (scenarios.showDeceasedSpouseAge(values, site) && values.deceasedSpouseAge !== ''))))))
    || fsCalc(values) === 'married-separate'
    || (fsCalc(values) === 'head-of-household'
      && ((scenarios.showIsMarriedHoH(values, year) && values.isMarriedHoH === 'yes')
        || (scenarios.showMaritalStatus(values) && values.maritalStatus === 'married'))))
    && (scenarios.showNumOfDependents(values, site) && parseInt(values.numOfDependents) === 0)) {
    dq.noDependentsAge = {
      id: 'noDependentsAgeWarning',
      elements: AlertsHtml.noDependentsAgeWarning(values, year, fsCalc(values))
    }
  }

  if (scenarios.showUs50Percent(values, fsCalc(values), site) && values.us50Percent === 'no') {
    dq.us50Percent = {
      id: 'us50Percent',
      elements: AlertsHtml.us50PercentWarning()
    }
  }

  return dq
}

export default disqualifiers
