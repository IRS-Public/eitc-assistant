import * as Yup from 'yup'
import * as scenarios from '../Form/helpers/fsScenarios'
import fsCalc from '../Form/helpers/fsCalc'

// CONDITIONS
const filingStatusRequired = (filingStatus, data) => !(scenarios.showFilingStatus(data.from[0].value)
  && (filingStatus === '' || filingStatus === undefined))

const isMarriedHoHRequired = (isMarriedHoH, data, year) => !(scenarios.showIsMarriedHoH(data.from[0].value, year)
  && (isMarriedHoH === '' || isMarriedHoH === undefined))

const maritalStatusRequired = (maritalStatus, values) => !(scenarios.showMaritalStatus(values)
  && (maritalStatus === '' || maritalStatus === undefined))

const fileJointReturnRequired = (fileJointReturn, values) => !(scenarios.showFileJointReturn(values)
  && (fileJointReturn === '' || fileJointReturn === undefined))

const liveWithSpouseRequired = (liveWithSpouse, values) => !(scenarios.showLiveWithSpouse(values)
  && (liveWithSpouse === '' || liveWithSpouse === undefined))

const houseUpkeep1Required = (houseUpkeep1, values) => !(scenarios.showHouseUpkeep1(values)
  && (houseUpkeep1 === '' || houseUpkeep1 === undefined))

const spousesPassingRequired = (spousesPassing, values) => !(scenarios.showSpousesPassing(values)
  && (spousesPassing === '' || spousesPassing === undefined))

const intendJointReturnDeceasedRequired = (intendJointReturnDeceased, values) => !(scenarios.showIntendJointReturnDeceased(values)
  && (intendJointReturnDeceased === '' || intendJointReturnDeceased === undefined))

const entitledJointReturnDeceasedRequired = (entitledJointReturnDeceased, values) => !(scenarios.showEntitledJointReturnDeceased(values)
  && (entitledJointReturnDeceased === '' || entitledJointReturnDeceased === undefined))

const houseUpkeep2Required = (houseUpkeep2, values) => !(scenarios.showHouseUpkeep2(values)
  && (houseUpkeep2 === '' || houseUpkeep2 === undefined))

const claimDependent1Required = (claimDependent1, values) => !(scenarios.showClaimDependent1(values)
  && (claimDependent1 === '' || claimDependent1 === undefined))

const claimDependent2Required = (claimDependent2, values) => !(scenarios.showClaimDependent2(values)
  && (claimDependent2 === '' || claimDependent2 === undefined))

const houseUpkeep3Required = (houseUpkeep3, values) => !(scenarios.showHouseUpkeep3(values)
  && (houseUpkeep3 === '' || houseUpkeep3 === undefined))

const deceasedSpouseValidSSNRequired = (deceasedSpouseValidSSN, values) => !(scenarios.showDeceasedSpouseValidSSN(values)
  && (deceasedSpouseValidSSN === '' || deceasedSpouseValidSSN === undefined))

const spouseValidSSNRequired = (spouseValidSSN, data) => !(scenarios.showSpouseValidSSN(data.from[0].value)
  && (spouseValidSSN === '' || spouseValidSSN === undefined))

const wasSpouseAliveEndOfYearRequired = (wasSpouseAliveEndOfYear, values, site) => !(scenarios.showWasSpouseAliveEndOfYear(values, site)
  && (wasSpouseAliveEndOfYear === '' || wasSpouseAliveEndOfYear === undefined))

const spouseAgeRequired = (spouseAge, values, site) => !(scenarios.showSpouseAge(values, site)
  && (spouseAge === '' || spouseAge === undefined))

const spouseQualifiedHomelessYouthRequired = (spouseQualifiedHomelessYouth, values, site) => !(scenarios.showSpouseQualifiedHomelessYouth(values, site)
  && (spouseQualifiedHomelessYouth === '' || spouseQualifiedHomelessYouth === undefined))

const spouseStudentRequired = (spouseStudent, values, site) => !(scenarios.showSpouseStudent(values, site)
  && (spouseStudent === '' || spouseStudent === undefined))

const deceasedSpouseAgeRequired = (deceasedSpouseAge, values, site) => !(scenarios.showDeceasedSpouseAge(values, site)
  && (deceasedSpouseAge === '' || deceasedSpouseAge === undefined))

const deceasedSpouseQualifiedHomelessYouthRequired = (deceasedSpouseQualifiedHomelessYouth, values, site) => !(scenarios.showDeceasedSpouseQualifiedHomelessYouth(values, site)
  && (deceasedSpouseQualifiedHomelessYouth === '' || deceasedSpouseQualifiedHomelessYouth === undefined))

const deceasedSpouseStudentRequired = (deceasedSpouseStudent, values, site) => !(scenarios.showDeceasedSpouseStudent(values, site)
  && (deceasedSpouseStudent === '' || deceasedSpouseStudent === undefined))

const liveApartFromSpouseRequired = (liveApartFromSpouse, data, site) => {
  const { year } = site.forms.generalInfo.values

  return !(scenarios.showLiveApartFromSpouse(data.from[0].value, year)
    && (liveApartFromSpouse === '' || liveApartFromSpouse === undefined))
}

const mfsLegalDocRequired = (mfsLegalDoc, data, site) => {
  const { year } = site.forms.generalInfo.values

  return !(scenarios.showMfsLegalDoc(data.from[0].value, year)
    && (mfsLegalDoc === '' || mfsLegalDoc === undefined))
}

const numOfDependentsRequired = (numOfDependents, values, site) => !(scenarios.showNumOfDependents(values, site)
  && (numOfDependents === '' || numOfDependents === undefined))

const us50PercentRequired = (us50Percent, values, site) => !(scenarios.showUs50Percent(values, fsCalc(values), site)
  && (us50Percent === '' || us50Percent === undefined))

// SCHEMA
const validationSchema = (site, lang, values) => Yup.object({}).shape({
  fsKnown: Yup.string().required(lang('filingStatus.a.fsKnownRequiredError')),
  filingStatus: Yup.string()
    .test('filingStatus is required', lang('filingStatus.a.filingStatusError'),
      (filingStatus, data) => filingStatusRequired(filingStatus, data)),
  isMarriedHoH: Yup.string()
    .test('isMarriedHoH is required', lang('filingStatus.a.isMarriedHoHError'),
      (isMarriedHoH, data) => isMarriedHoHRequired(isMarriedHoH, data, site.forms.generalInfo.values.year)),
  maritalStatus: Yup.string()
    .test('maritalStatus is required', lang('filingStatus.a.maritalStatusError'),
      (maritalStatus) => maritalStatusRequired(maritalStatus, values)),
  fileJointReturn: Yup.string()
    .test('fileJointReturn is required', lang('filingStatus.a.fileJointReturnError'),
      (fileJointReturn) => fileJointReturnRequired(fileJointReturn, values)),
  liveWithSpouse: Yup.string()
    .test('liveWithSpouse is required', lang('filingStatus.a.liveWithSpouseError'),
      (liveWithSpouse) => liveWithSpouseRequired(liveWithSpouse, values)),
  houseUpkeep1: Yup.string()
    .test('houseUpkeep1 is required', lang('filingStatus.a.houseUpkeep1Error'),
      (houseUpkeep1) => houseUpkeep1Required(houseUpkeep1, values)),
  spousesPassing: Yup.string()
    .test('spousesPassing is required', lang('filingStatus.a.spousesPassingError'),
      (spousesPassing) => spousesPassingRequired(spousesPassing, values)),
  intendJointReturnDeceased: Yup.string()
    .test('intendJointReturnDeceased is required', lang('filingStatus.a.intendJointReturnDeceasedError'),
      (intendJointReturnDeceased) => intendJointReturnDeceasedRequired(intendJointReturnDeceased, values)),
  entitledJointReturnDeceased: Yup.string()
    .test('entitledJointReturnDeceased is required', lang('filingStatus.a.entitledJointReturnDeceasedError'),
      (entitledJointReturnDeceased) => entitledJointReturnDeceasedRequired(entitledJointReturnDeceased, values)),
  houseUpkeep2: Yup.string()
    .test('houseUpkeep2 is required', lang('filingStatus.a.houseUpkeep2Error'),
      (houseUpkeep2) => houseUpkeep2Required(houseUpkeep2, values)),
  claimDependent1: Yup.string()
    .test('claimDependent1 is required', lang('filingStatus.a.claimDependent1Error'),
      (claimDependent1) => claimDependent1Required(claimDependent1, values)),
  claimDependent2: Yup.string()
    .test('claimDependent2 is required', lang('filingStatus.a.claimDependent2Error'),
      (claimDependent2) => claimDependent2Required(claimDependent2, values)),
  houseUpkeep3: Yup.string()
    .test('houseUpkeep3 is required', lang('filingStatus.a.houseUpkeep3Error'),
      (houseUpkeep3) => houseUpkeep3Required(houseUpkeep3, values)),
  deceasedSpouseValidSSN: Yup.string()
    .test('deceasedSpouseValidSSN is required', lang('filingStatus.a.deceasedSpouseValidSSNError'),
      (deceasedSpouseValidSSN) => deceasedSpouseValidSSNRequired(deceasedSpouseValidSSN, values)),
  spouseValidSSN: Yup.string()
    .test('spouseValidSSN is required', lang('filingStatus.a.spouseValidSSNError'),
      (spouseValidSSN, data) => spouseValidSSNRequired(spouseValidSSN, data)),
  wasSpouseAliveEndOfYear: Yup.string()
    .test('wasSpouseAliveEndOfYear is required', lang('filingStatus.a.wasSpouseAliveEndOfYearError'),
      (wasSpouseAliveEndOfYear) => wasSpouseAliveEndOfYearRequired(wasSpouseAliveEndOfYear, values, site)),
  spouseAge: Yup.string()
    .test('spouseAge is required', lang('filingStatus.a.spouseAgeError'),
      (spouseAge) => spouseAgeRequired(spouseAge, values, site)),
  spouseQualifiedHomelessYouth: Yup.string()
    .test('spouseQualifiedHomelessYouth is required', lang('filingStatus.a.spouseQualifiedHomelessYouthError'),
      (spouseQualifiedHomelessYouth) => spouseQualifiedHomelessYouthRequired(spouseQualifiedHomelessYouth, values, site)),
  spouseStudent: Yup.string()
    .test('spouseStudent is required', lang('filingStatus.a.spouseStudentError'),
      (spouseStudent) => spouseStudentRequired(spouseStudent, values, site)),
  deceasedSpouseAge: Yup.string()
    .test('deceasedSpouseAge is required', lang('filingStatus.a.deceasedSpouseAgeError'),
      (deceasedSpouseAge) => deceasedSpouseAgeRequired(deceasedSpouseAge, values, site)),
  deceasedSpouseQualifiedHomelessYouth: Yup.string()
    .test('deceasedSpouseQualifiedHomelessYouth is required', lang('filingStatus.a.deceasedSpouseQualifiedHomelessYouthError'),
      (deceasedSpouseQualifiedHomelessYouth) => deceasedSpouseQualifiedHomelessYouthRequired(deceasedSpouseQualifiedHomelessYouth, values, site)),
  deceasedSpouseStudent: Yup.string()
    .test('deceasedSpouseStudent is required', lang('filingStatus.a.deceasedSpouseStudentError'),
      (deceasedSpouseStudent) => deceasedSpouseStudentRequired(deceasedSpouseStudent, values, site)),
  liveApartFromSpouse: Yup.string()
    .test('liveApartFromSpouse is required', lang('filingStatus.a.liveApartFromSpouseError'),
      (liveApartFromSpouse, data) => liveApartFromSpouseRequired(liveApartFromSpouse, data, site)),
  mfsLegalDoc: Yup.string()
    .test('mfsLegalDoc is required', lang('filingStatus.a.mfsLegalDocError'),
      (mfsLegalDoc, data) => mfsLegalDocRequired(mfsLegalDoc, data, site)),
  numOfDependents: Yup.string()
    .test('numOfDependents is required', lang('filingStatus.a.numOfDependentsError'),
      (numOfDependents) => numOfDependentsRequired(numOfDependents, values, site)),
  us50Percent: Yup.string()
    .test('us50Percent is required', lang('filingStatus.a.us50PercentError'),
      (us50Percent) => us50PercentRequired(us50Percent, values, site)),
})

export default validationSchema
