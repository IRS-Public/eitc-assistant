import getDeductions from './deductions/getDeductions'
import getQBIDeduction from './income/getQBIDeduction'

const getTaxableIncome = (site, agi, seEmployTax, param) => {
    const deductionsTotal = getDeductions(site, agi, param)
    const seChecked = site.forms.incomeWithholding.values.otherIncome.selfEmployment.checked

    let taxableIncome = agi - deductionsTotal < 0 ? 0 : agi - deductionsTotal

    if (seChecked) {
        taxableIncome = getQBIDeduction(site, taxableIncome, seEmployTax, param).total
    }

    return taxableIncome
}

export default getTaxableIncome
