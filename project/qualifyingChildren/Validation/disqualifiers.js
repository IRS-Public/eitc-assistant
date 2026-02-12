import * as scenarios from '../Form/FormObject'
import params from '../../../calculations/eitc/EITCParams.json'

const disqualifiers = (values, index, site, showYoungerQuestion, filingStatus, spouseAge, deceasedSpouseAge, qualifyUntilSSN) => {
  const dq = {}

  const { year, age, qualifiedHomelessYouth } = site.forms.generalInfo.values

  if (values.children[index].live51Pct === 'no') {
    dq.live51Pct = true
  }

  if (scenarios.showClaimOtherConfirm(values, index) && values.children[index].claimOtherConfirm === 'no') {
    dq.claimOtherConfirm = true
  }

  if (scenarios.showFileJointConfirm(values, index) && values.children[index].fileJointConfirm === 'no') {
    dq.fileJointConfirm = true
  }

  if (scenarios.showRelationship(values, index) && values.children[index].relationship === 'other') {
    dq.relationship = true
  }

  if (scenarios.showAge(values, index) && values.children[index].age === 'age-over24') {
    dq.age = true
  }
  
  if (showYoungerQuestion(values, index) && values.children[index].younger === 'no') {
    dq.younger = true
  }

  if (scenarios.showAge(values, index) && params[year].useARPA && values.year =="2021" && values.children[index].age === 'age-19-23') {
    if (filingStatus === 'married') {
      if (((age === '17under' || (age === '18' && qualifiedHomelessYouth === 'no')) && (spouseAge === '17under' || spouseAge === '18'))
        || (age === '18' && qualifiedHomelessYouth === 'yes')) {
        dq.younger = true
      }
    } else {
      if (age === '17under' || age === '18') {
        dq.younger = true
      }
    }
  } 
  
  if (scenarios.showAge(values, index) && params[year].useARPA && values.year !="2021" && values.children[index].age === 'age-19-23') {
    if (filingStatus === 'married') {
      if ((age === 'under24') && ( spouseAge === 'under24'))
       {
        dq.younger = true
      }
    } 
    else { 
      if (age === 'under24') {
      dq.younger = true
    }
  }
  }

  if (scenarios.showStudent(site, values, index, year, showYoungerQuestion, filingStatus, age, spouseAge, deceasedSpouseAge)
    && values.children[index].student === 'no') {
    dq.student = true
  }

  if (!params[year].useARPA && scenarios.showValidSSN(values, index, qualifyUntilSSN)
    && values.children[index].validSSN === 'no') {
    dq.validSSN = true
  }

  return dq
}

export default disqualifiers
