import params from '../../../../calculations/eitc/EITCParams.json'

export const meetAgeRequirement = (year, age, qualifiedHomelessYouth, student) => {
  if (params[year].useARPA && year == "2021") {
    return (age === '24over'
     || ((age === '19-23' || age === '18') && qualifiedHomelessYouth === 'yes')
     || (age === '19-23' && qualifiedHomelessYouth === 'no' && student === 'no'))
 } 

  if (params[year].useARPA && year != "2021" )
  {
    return age === 'age-25-64' 
  }
  return age === 'age-25-64' || age === 'deceasedSpouseAge-25-64' || age === 'spouseAge-25-64'
}

// ********** INDIVIDUAL QUESTION SCENARIOS ********** //
export const showFilingStatus = (values) => (values.fsKnown === 'yes')

export const showIsMarriedHoH = (values, year) => params[year].useARPA
  && showFilingStatus(values) && values.filingStatus === 'head-of-household'

export const showMaritalStatus = (values) => (values.fsKnown === 'no')

export const showFileJointReturn = (values) => (showMaritalStatus(values) && values.maritalStatus === 'married')

export const showSpousesPassing = (values) => (showMaritalStatus(values) && values.maritalStatus === 'widow')

export const showIntendJointReturnDeceased = (values) => (showSpousesPassing(values) && values.spousesPassing === 'lastYear')

export const showLiveWithSpouse = (values) => {
  const { fileJointReturn, intendJointReturnDeceased } = values

  return ((showFileJointReturn(values) && fileJointReturn === 'no')
    || (showIntendJointReturnDeceased(values) && intendJointReturnDeceased === 'no'))
}

export const showHouseUpkeep1 = (values) => (showLiveWithSpouse(values) && values.liveWithSpouse === 'no')

export const showEntitledJointReturnDeceased = (values) => (showSpousesPassing(values) && values.spousesPassing === 'last2Years')

export const showHouseUpkeep2 = (values) => (showEntitledJointReturnDeceased(values) && values.entitledJointReturnDeceased === 'yes')

export const showClaimDependent1 = (values) => (showHouseUpkeep2(values) && values.houseUpkeep2 === 'yes')

export const showClaimDependent2 = (values) => (showClaimDependent1(values) && values.claimDependent1 === 'no')

export const showHouseUpkeep3 = (values) => {
  const {
    maritalStatus,
    spousesPassing,
    entitledJointReturnDeceased,
    houseUpkeep2,
    claimDependent2
  } = values

  return ((showMaritalStatus(values) && (maritalStatus === 'divorced' || maritalStatus === 'neverMarried'))
    || (showSpousesPassing(values) && spousesPassing === '3YearsPlus')
    || (showEntitledJointReturnDeceased(values) && entitledJointReturnDeceased === 'no')
    || (showHouseUpkeep2(values) && houseUpkeep2 === 'no')
    || (showClaimDependent2(values) && claimDependent2 === 'no'))
}

export const showDeceasedSpouseValidSSN = (values) => (showIntendJointReturnDeceased(values) && values.intendJointReturnDeceased === 'yes')

export const showSpouseValidSSN = (values) => {
  const { fileJointReturn, filingStatus } = values

  return ((showFileJointReturn(values) && fileJointReturn === 'yes')
    || (showFilingStatus(values) && filingStatus === 'married'))
}

export const showWasSpouseAliveEndOfYear = (values, site) => {
  const { age, year, qualifiedHomelessYouth, student } = site.forms.generalInfo.values
  const {
    fsKnown,
    filingStatus,
    spouseValidSSN,
    maritalStatus,
    spousesPassing,
    entitledJointReturnDeceased,
  } = values

  return ((fsKnown === 'yes'
    && filingStatus === 'married'
    && spouseValidSSN === 'yes'
    && !(meetAgeRequirement(year, age, qualifiedHomelessYouth, student)))
    || 
    ((showMaritalStatus(values) && maritalStatus === 'widow')
      && (showSpousesPassing(values) && spousesPassing === 'last2Years')
      && (showEntitledJointReturnDeceased(values) && entitledJointReturnDeceased === 'no')))
}

export const showSpouseAge = (values, site) => {
  const { age, year, qualifiedHomelessYouth, student } = site.forms.generalInfo.values
  const {
    fsKnown,
    spouseValidSSN,
    maritalStatus,
    fileJointReturn,
    wasSpouseAliveEndOfYear,
  } = values

  return (((fsKnown === 'no'
    && maritalStatus === 'married'
    && fileJointReturn === 'yes'
    && spouseValidSSN === 'yes'
    && (!meetAgeRequirement(year, age, qualifiedHomelessYouth, student)))
    || (showWasSpouseAliveEndOfYear(values, site)
      && wasSpouseAliveEndOfYear === 'yes')))
}

export const showSpouseQualifiedHomelessYouth = (values, site) => (
  showSpouseAge(values, site)
  && (values.spouseAge === '18' || values.spouseAge === '19-23'))

export const showSpouseStudent = (values, site) => (showSpouseQualifiedHomelessYouth(values, site)
  && values.spouseQualifiedHomelessYouth === 'no' && values.spouseAge === '19-23')

export const showDeceasedSpouseAge = (values, site) => {
  const { age, year, qualifiedHomelessYouth, student } = site.forms.generalInfo.values
  const { wasSpouseAliveEndOfYear, deceasedSpouseValidSSN } = values

  return ((showDeceasedSpouseValidSSN(values)
    && deceasedSpouseValidSSN === 'yes'
    && !meetAgeRequirement(year, age, qualifiedHomelessYouth, student))
    || (showWasSpouseAliveEndOfYear(values, site) && wasSpouseAliveEndOfYear === 'no'))
}

export const showDeceasedSpouseQualifiedHomelessYouth = (values, site) => (
  showDeceasedSpouseAge(values, site)
  && (values.deceasedSpouseAge === '18' || values.deceasedSpouseAge === '19-23'))

export const showDeceasedSpouseStudent = (values, site) => (showDeceasedSpouseQualifiedHomelessYouth(values, site)
  && values.deceasedSpouseQualifiedHomelessYouth === 'no' && values.deceasedSpouseAge === '19-23')

export const showLiveApartFromSpouse = (values, year) => (
  params[year].useARPA && ((showFilingStatus(values) && values.filingStatus === 'married-separate')
    || (showIsMarriedHoH(values, year) && values.isMarriedHoH === 'yes'))
)

export const showMfsPrincipalRes = (values, year) => (
  params[year].useARPA
  && (/*(showLiveApartFromSpouse(values, year) && values.liveApartFromSpouse === 'yes')
    ||*/ (showLiveWithSpouse(values) && values.liveWithSpouse === 'yes'))
)

export const showMfsLegalDoc = (values, year) => (
  params[year].useARPA
  && ((showMfsPrincipalRes(values, year) && values.mfsPrincipalRes === 'yes')
     || (showLiveApartFromSpouse(values, year) && values.liveApartFromSpouse === 'yes')
    /*|| (showLiveWithSpouse(values) && values.liveWithSpouse === 'yes')*/)
)

export const showNumOfDependents = (values, site) => {
  const { year, age, qualifiedHomelessYouth, student } = site.forms.generalInfo.values
  const {
    fsKnown,
    spouseValidSSN,
    filingStatus,
    maritalStatus,
    deceasedSpouseValidSSN,
    deceasedSpouseAge,
    deceasedSpouseQualifiedHomelessYouth,
    deceasedSpouseStudent,
    spouseAge,
    spouseQualifiedHomelessYouth,
    spouseStudent,
    mfsLegalDoc,
    houseUpkeep1,
    houseUpkeep3,
    claimDependent1,
    claimDependent2,
    isMarriedHoH,
    liveApartFromSpouse,
    mfsPrincipalRes,
  } = values

  if (params[year].useARPA && values.year == "2021") {
    return (
      (fsKnown === 'yes' && showFilingStatus(values) && (filingStatus === 'single' || filingStatus === 'widow'))
      || (showMfsLegalDoc(values, year) && mfsLegalDoc === 'yes')
      || (showSpouseValidSSN(values) && spouseValidSSN === 'yes' && meetAgeRequirement(year, age, qualifiedHomelessYouth, student))
      || (showSpouseAge(values, site) && (spouseAge === '24over' || spouseAge === '17under'))
      || (showSpouseStudent(values, site) && spouseStudent !== '')
      || (showDeceasedSpouseStudent(values, site) && deceasedSpouseStudent !== '')
      || (showDeceasedSpouseAge(values, site)
        && (deceasedSpouseAge === '24over' || deceasedSpouseAge === '17under'))
      || (showSpouseQualifiedHomelessYouth(values, site)
        && spouseQualifiedHomelessYouth !== '' && spouseAge === '18')
      || (showSpouseQualifiedHomelessYouth(values, site)
        && spouseQualifiedHomelessYouth === 'yes' && spouseAge === '19-23')
      || (showDeceasedSpouseQualifiedHomelessYouth(values, site)
        && deceasedSpouseQualifiedHomelessYouth !== '' && deceasedSpouseAge === '18')
      || (showDeceasedSpouseQualifiedHomelessYouth(values, site)
        && deceasedSpouseQualifiedHomelessYouth === 'yes' && deceasedSpouseAge === '19-23')
      || (showDeceasedSpouseValidSSN(values) && deceasedSpouseValidSSN === 'yes'
        && meetAgeRequirement(year, age, qualifiedHomelessYouth, student))
      || (showHouseUpkeep3(values) && houseUpkeep3 === 'none')
      || (showHouseUpkeep3(values) && (houseUpkeep3 === 'dependent' || houseUpkeep3 === 'parent' || houseUpkeep3 === 'spousesChild')
        && showMaritalStatus(values) && maritalStatus !== 'married')
      || (showClaimDependent1(values) && claimDependent1 === 'yes')
      || (showClaimDependent2(values) && claimDependent2 === 'yes')
      || (showIsMarriedHoH(values, year) && isMarriedHoH === 'no')
      || (showLiveApartFromSpouse(values, year) && liveApartFromSpouse === 'no')
      || (showHouseUpkeep1(values) && houseUpkeep1 !== '')
    )
  }

  if (params[year].useARPA && values.year != "2021") {
    return (
      (fsKnown === 'yes' && showFilingStatus(values) && (filingStatus === 'single' || filingStatus === 'widow'))
      || (showMfsLegalDoc(values, year) && mfsLegalDoc === 'yes')
      || (showSpouseValidSSN(values) && spouseValidSSN === 'yes' && meetAgeRequirement(year, age, qualifiedHomelessYouth, student))
      || (showSpouseAge(values, site) && spouseAge !== '')
      || (showDeceasedSpouseAge(values, site) && deceasedSpouseAge !== '')
      || (showDeceasedSpouseValidSSN(values) && deceasedSpouseValidSSN === 'yes'
        && meetAgeRequirement(year, age, qualifiedHomelessYouth, student))
      || (showHouseUpkeep3(values) && houseUpkeep3 === 'none')
      || (showHouseUpkeep3(values) && (houseUpkeep3 === 'dependent' || houseUpkeep3 === 'parent' || houseUpkeep3 === 'spousesChild')
        && showMaritalStatus(values) && maritalStatus !== 'married')
      || (showClaimDependent1(values) && claimDependent1 === 'yes')
      || (showClaimDependent2(values) && claimDependent2 === 'yes')
      || (showIsMarriedHoH(values, year) && isMarriedHoH === 'no')
      || (showLiveApartFromSpouse(values, year) && liveApartFromSpouse === 'no')
      || (showHouseUpkeep1(values) && houseUpkeep1 !== '')
      || (showMfsPrincipalRes(values, year) && values.mfsPrincipalRes === 'no')
    )
}
  
  return (
    (fsKnown === 'yes' && (filingStatus === 'single' || filingStatus === 'widow' || filingStatus === 'head-of-household'))
    || (showSpouseValidSSN(values) && spouseValidSSN === 'yes' && age === 'age-25-64')
    || (showSpouseAge(values, site) && spouseAge !== '')
    || (showDeceasedSpouseAge(values, site) && deceasedSpouseAge !== '')
    || (showHouseUpkeep3(values) && houseUpkeep3 !== '')
    || (showDeceasedSpouseValidSSN(values) && deceasedSpouseValidSSN === 'yes'
      && meetAgeRequirement(year, age, qualifiedHomelessYouth, student))
    || (showClaimDependent1(values) && claimDependent1 === 'yes')
    || (showClaimDependent2(values) && claimDependent2 === 'yes')
    || (showHouseUpkeep1(values) && houseUpkeep1 === 'yes')
    || (showMfsPrincipalRes(values, year) && values.mfsPrincipalRes === 'no')
  )
}
export const showUs50Percent = (values, fsCalc, site) => {
  const { year, age, qualifiedHomelessYouth, student } = site.forms.generalInfo.values
  const {
    fsKnown,
    spouseValidSSN,
    wasSpouseAliveEndOfYear,
    numOfDependents,
    spouseAge,
    spouseQualifiedHomelessYouth,
    spouseStudent,
    deceasedSpouseAge,
    deceasedSpouseQualifiedHomelessYouth,
    deceasedSpouseStudent,
  } = values

  if (params[year].useARPA) {
    return (showNumOfDependents(values, site)
      && parseInt(numOfDependents) === 0
      && ((((fsCalc === 'single'
        || (fsCalc === 'head-of-household'
          && ((showIsMarriedHoH(values, year) && values.isMarriedHoH === 'no')
            || (showMaritalStatus(values) && values.maritalStatus !== 'married')))
        || fsCalc === 'widow')
        && meetAgeRequirement(year, age, qualifiedHomelessYouth, student)))
        || (fsKnown === 'no'
          && fsCalc === 'married'
          && (meetAgeRequirement(year, age, qualifiedHomelessYouth, student) || meetAgeRequirement(year, spouseAge, spouseQualifiedHomelessYouth, spouseStudent)))
        || (fsKnown === 'yes'
          && fsCalc === 'married'
          && spouseValidSSN === 'yes'
          && (meetAgeRequirement(year, age, qualifiedHomelessYouth, student)
            || (wasSpouseAliveEndOfYear === 'yes'
              && meetAgeRequirement(year, spouseAge, spouseQualifiedHomelessYouth, spouseStudent))
            || (wasSpouseAliveEndOfYear === 'no'
              && meetAgeRequirement(year, deceasedSpouseAge, deceasedSpouseQualifiedHomelessYouth, deceasedSpouseStudent))))))
  }

  return (showNumOfDependents(values, site)
    && parseInt(numOfDependents) === 0
    && ((((fsCalc === 'single'
      || fsCalc === 'head-of-household'
      || fsCalc === 'widow')
      && meetAgeRequirement(year, age, qualifiedHomelessYouth, student)))
      || (fsKnown === 'no'
        && fsCalc === 'married'
        && (meetAgeRequirement(year, age, qualifiedHomelessYouth, student) || meetAgeRequirement(year, spouseAge, spouseQualifiedHomelessYouth, spouseStudent)))
      || (fsKnown === 'yes'
        && fsCalc === 'married'
        && spouseValidSSN === 'yes'
        && (meetAgeRequirement(year, age, qualifiedHomelessYouth, student)
          || (wasSpouseAliveEndOfYear === 'yes'
            && meetAgeRequirement(year, spouseAge, spouseQualifiedHomelessYouth, spouseStudent))
          || (wasSpouseAliveEndOfYear === 'no'
            && meetAgeRequirement(year, deceasedSpouseAge, deceasedSpouseQualifiedHomelessYouth, deceasedSpouseStudent))))))
}

// ********** FILING STATUS SCENARIOS ********** //
export const isSingle = (values) => {
  const {
    fsKnown,
    filingStatus,
    houseUpkeep3,
  } = values

  return (
    (fsKnown === 'yes' && filingStatus === 'single')
    || (showHouseUpkeep3(values) && houseUpkeep3 === 'none')
  )
}

export const isHoH = (values) => {
  const {
    fsKnown,
    filingStatus,
    houseUpkeep3,
    houseUpkeep1,
  } = values

  return (
    (fsKnown === 'yes' && filingStatus === 'head-of-household')
    || (showHouseUpkeep1(values) && houseUpkeep1 === 'yes')
    || (showHouseUpkeep3(values) && (houseUpkeep3 === 'dependent' || houseUpkeep3 === 'spousesChild' || houseUpkeep3 === 'parent'))
  )
}

export const isWidow = (values) => {
  const {
    fsKnown,
    filingStatus,
    claimDependent1,
    claimDependent2,
  } = values

  return (
    (fsKnown === 'yes' && filingStatus === 'widow')
    || (showClaimDependent1(values) && claimDependent1 === 'yes')
    || (showClaimDependent2(values) && claimDependent2 === 'yes')
  )
}

export const isMarried = (values) => {
  const {
    fsKnown,
    filingStatus,
    fileJointReturn,
    intendJointReturnDeceased,
  } = values

  return (
    (fsKnown === 'yes' && filingStatus === 'married')
    || (showFileJointReturn(values) && fileJointReturn === 'yes')
    || (showIntendJointReturnDeceased(values) && intendJointReturnDeceased === 'yes')
  )
}

export const isMFS = (values) => {
  const {
    fsKnown,
    filingStatus,
    liveWithSpouse,
    houseUpkeep1,
  } = values

  return (
    (fsKnown === 'yes' && filingStatus === 'married-separate')
    || (showHouseUpkeep1(values) && houseUpkeep1 === 'no')
    || (showLiveWithSpouse(values) && liveWithSpouse === 'yes')
  )
}
