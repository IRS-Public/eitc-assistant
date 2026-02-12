import getCTCandOtherDepTaxCredit from './getCTCandOtherDepTaxCredit'
import getEITCAmount from './getEITCAmount'
import getEducationCredit from './getEducationCredit'

const getTaxCredits = (site, taxes, ssAndMedTaxes, incomes, totalIncomeForEITC, param) => {
  const eitcTotalCredit = getEITCAmount(site, totalIncomeForEITC, param)

  const ctcOtherDepTotalCredits = getCTCandOtherDepTaxCredit(site, taxes.tableTax, ssAndMedTaxes, incomes, eitcTotalCredit, param)

  const educationTotalCredits = getEducationCredit(site, taxes.tableTax, incomes, param)

  // console.log('totalTaxCredits', { ctcOtherDepTotalCredits, eitcTotalCredit, educationTotalCredits })

  return { ctcOtherDepTotalCredits, eitcTotalCredit, educationTotalCredits }
}

export default getTaxCredits
