import * as Yup from 'yup'
import { isAnyIncomeChecked } from '../Form/helpers/utils'
import calcAgiForEitc from '../../../calculations/agi/calcAgiForEitc'

// CONDITIONS
const incomeRequired = (noIncome, values) => !((!isAnyIncomeChecked(values) && noIncome.length === 0) || (calcAgiForEitc(values).earned <= 0))

// SCHEMA
const validationSchema = (lang, values) => Yup.object({}).shape({
  noIncome: Yup.array()
    .test('noIncome is required', lang('agi.a.noIncomeError'), (noIncome) => incomeRequired(noIncome, values)),
})

export default validationSchema
