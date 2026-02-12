import * as Yup from 'yup'
import * as scenarios from '../Form/FormObject'

// CONDITIONS
const live51PctRequired = (live51Pct, values, data, showAccordion, ignoreValidation) => {
  const { index } = data.options

  if (ignoreValidation(values, index)) return true
  
  return !(showAccordion(index, values) && (live51Pct === '' || live51Pct === undefined))
}
const claimOtherRequired = (claimOther, values, data, showAccordion, ignoreValidation) => {
  const { index } = data.options

  if (ignoreValidation(values, index)) return true

  return !(scenarios.showClaimOther(values, index) && showAccordion(index, values) && (claimOther === '' || claimOther === undefined))
}
const claimOtherConfirmRequired = (claimOther, values, data, showAccordion, ignoreValidation) => {
  const { index } = data.options

  if (ignoreValidation(values, index)) return true

  return !(scenarios.showClaimOtherConfirm(values, index) && showAccordion(index, values)
    && (claimOther === '' || claimOther === undefined))
}
const fileJointRequired = (fileJoint, values, data, showAccordion, ignoreValidation) => {
  const { index } = data.options
  
  if (ignoreValidation(values, index)) return true

  return !(scenarios.showFileJoint(values, index) && showAccordion(index, values) && (fileJoint === '' || fileJoint === undefined))
}
const fileJointConfirmRequired = (fileJointConfirm, values, data, showAccordion, ignoreValidation) => {
  const { index } = data.options
  
  if (ignoreValidation(values, index)) return true

  return !(scenarios.showFileJointConfirm(values, index) && showAccordion(index, values)
    && (fileJointConfirm === '' || fileJointConfirm === undefined))
}
const permanentlyDisabledRequired = (permanentlyDisabled, values, data, showAccordion, ignoreValidation) => {
  const { index } = data.options
  
  if (ignoreValidation(values, index)) return true

  return !(scenarios.showPermanentlyDisabled(values, index) && showAccordion(index, values)
    && (permanentlyDisabled === '' || permanentlyDisabled === undefined))
}
const relationshipRequired = (relationship, values, data, showAccordion, ignoreValidation) => {
  const { index } = data.options
  
  if (ignoreValidation(values, index)) return true

  return !(scenarios.showRelationship(values, index) && showAccordion(index, values) && (relationship === '' || relationship === undefined))
}
const ageRequired = (age, values, data, showAccordion, ignoreValidation) => {
  const { index } = data.options
  
  if (ignoreValidation(values, index)) return true

  return !(scenarios.showAge(values, index) && showAccordion(index, values) && (age === '' || age === undefined))
}
const youngerRequired = (younger, values, data, showYoungerQuestion, showAccordion, ignoreValidation) => {
  const { index } = data.options
  
  if (ignoreValidation(values, index)) return true

  return !(showYoungerQuestion(values, index) && showAccordion(index, values) && (younger === '' || younger === undefined))
}
const studentRequired = (student, site, values, data, filingStatus, spouseAge, age, deceasedSpouseAge, year, showYoungerQuestion, showAccordion, ignoreValidation) => {
  const { index } = data.options
  
  if (ignoreValidation(values, index)) return true

  return !(scenarios.showStudent(site, values, index, year, showYoungerQuestion, filingStatus, age, spouseAge, deceasedSpouseAge)
    && showAccordion(index, values)
    && (student === '' || student === undefined))
}
const validSSNRequired = (validSSN, values, data, qualifyUntilSSN, showAccordion, ignoreValidation) => {
  const { index } = data.options
  
  if (ignoreValidation(values, index)) return true

  return !(scenarios.showValidSSN(values, index, qualifyUntilSSN)
    && showAccordion(index, values)
    && (validSSN === '' || validSSN === undefined))
}
const us50PercentRequired = (us50Percent, values, showUs50PercentQuestion) => !(showUs50PercentQuestion(values)
  && (us50Percent === '' || us50Percent === undefined))

// SCHEMA
const validationSchema = (lang, site, values, year, showYoungerQuestion, showUs50PercentQuestion, filingStatus, spouseAge, userAge, deceasedSpouseAge, showAccordion, qualifyUntilSSN, ignoreValidation) => Yup.object({}).shape({
  children: Yup.array().of(Yup.object({}).shape({
    live51Pct: Yup.string()
      .test('live51Pct is required', lang('qualifyingChildren.a.live51Pct'),
        (live51Pct, data) => live51PctRequired(live51Pct, values, data, showAccordion, ignoreValidation)),
    claimOther: Yup.string()
      .test('claimOther is required', lang('qualifyingChildren.a.claimOther'),
        (claimOther, data) => claimOtherRequired(claimOther, values, data, showAccordion, ignoreValidation)),
    claimOtherConfirm: Yup.string()
      .test('claimOtherConfirm is required', lang('qualifyingChildren.a.claimOtherConfirm'),
        (claimOtherConfirm, data) => claimOtherConfirmRequired(claimOtherConfirm, values, data, showAccordion, ignoreValidation)),
    fileJoint: Yup.string()
      .test('fileJoint is required', lang('qualifyingChildren.a.fileJoint'),
        (fileJoint, data) => fileJointRequired(fileJoint, values, data, showAccordion, ignoreValidation)),
    fileJointConfirm: Yup.string()
      .test('fileJointConfirm is required', lang('qualifyingChildren.a.fileJointConfirm'),
        (fileJointConfirm, data) => fileJointConfirmRequired(fileJointConfirm, values, data, showAccordion, ignoreValidation)),
    permanentlyDisabled: Yup.string()
      .test('permanentlyDisabled is required', lang('qualifyingChildren.a.permanentlyDisabled'),
        (permanentlyDisabled, data) => permanentlyDisabledRequired(permanentlyDisabled, values, data, showAccordion, ignoreValidation)),
    relationship: Yup.string()
      .test('relationship is required', lang('qualifyingChildren.a.relationship'),
        (relationship, data) => relationshipRequired(relationship, values, data, showAccordion, ignoreValidation)),
    age: Yup.string()
      .test('age is required', lang('qualifyingChildren.a.age'), (age, data) => ageRequired(age, values, data, showAccordion, ignoreValidation)),
    younger: Yup.string()
      .test('younger is required', lang('qualifyingChildren.a.younger'),
        (younger, data) => youngerRequired(younger, values, data, showYoungerQuestion, showAccordion, ignoreValidation)),
    student: Yup.string()
      .test('student is required', lang('qualifyingChildren.a.student'),
        (student, data) => studentRequired(student, site, values, data, filingStatus, spouseAge, userAge, deceasedSpouseAge, year, showYoungerQuestion, showAccordion, ignoreValidation)),
    validSSN: Yup.string()
      .test('validSSN is required', lang('qualifyingChildren.a.validSSN'),
        (validSSN, data) => validSSNRequired(validSSN, values, data, qualifyUntilSSN, showAccordion, ignoreValidation)),
  })),
  us50Percent: Yup.string()
    .test('us50Percent is required', lang('qualifyingChildren.a.us50Percent'),
      (us50Percent) => us50PercentRequired(us50Percent, values, showUs50PercentQuestion)),
})

export default validationSchema
