import * as Yup from 'yup'
import * as scenarios from '../Form/FormObject'

// CONDITIONS
const citizenRequired = (citizen, values) => !(scenarios.showCitizen(values) && (citizen === '' || citizen === undefined))
const validSSNRequired = (validSSN, values) => !(scenarios.showValidSSN(values) && (validSSN === '' || validSSN === undefined))
const foreignIncomeRequired = (foreignIncome, values) => !(scenarios.showForeignIncome(values)
  && (foreignIncome === '' || foreignIncome === undefined))
const claimedAsDependentRequired = (claimedAsDependent, values) => !(scenarios.showClaimedAsDependent(values)
  && (claimedAsDependent === '' || claimedAsDependent === undefined))
const ageRequired = (age, values) => !(scenarios.showAge(values) && (age === '' || age === undefined))
const qualifiedHomelessYouthRequired = (qualifiedHomelessYouth, values) => !(scenarios.showQualifiedHomelessYouth(values)
  && (qualifiedHomelessYouth === '' || qualifiedHomelessYouth === undefined))
const studentRequired = (student, values) => !(scenarios.showStudent(values) && (student === '' || student === undefined))

// SCHEMA
const validationSchema = (lang, values) => Yup.object({}).shape({
  year: Yup.string().required(lang('generalInfo.a.yearRequiredError')),
  citizen: Yup.string()
    .test('citizen is required', lang('generalInfo.a.citizenError'), (citizen) => citizenRequired(citizen, values)),
  validSSN: Yup.string()
    .test('validSSN is required', lang('generalInfo.a.validSSNError'), (validSSN) => validSSNRequired(validSSN, values)),
  foreignIncome: Yup.string()
    .test('foreignIncome is required', lang('generalInfo.a.foreignIncomeError'), (foreignIncome) => foreignIncomeRequired(foreignIncome, values)),
  claimedAsDependent: Yup.string()
    .test('claimedAsDependent is required', lang('generalInfo.a.claimedAsDependentError'), (claimedAsDependent) => claimedAsDependentRequired(claimedAsDependent, values)),
  age: Yup.string()
    .test('age is required', lang('generalInfo.a.ageError'), (age) => ageRequired(age, values)),
  qualifiedHomelessYouth: Yup.string()
    .test('qualifiedHomelessYouth is required', lang('generalInfo.a.qualifiedHomelessYouthError'), (qualifiedHomelessYouth) => qualifiedHomelessYouthRequired(qualifiedHomelessYouth, values)),
  student: Yup.string()
    .test('student is required', lang('generalInfo.a.studentError'), (student) => studentRequired(student, values)),
})

export default validationSchema
