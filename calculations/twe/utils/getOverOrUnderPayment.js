import getTax from './getTax'
import getTaxCredits from './taxCredits/getTaxCredits'

const getOverOrUnderPayment = (site, taxableIncome, taxesWithheld, selfEmployIncomeTax, addtlMedicareTax, param) => {
    // const { taxesWithheld } = site.forms.incomeWithholding.values
    // const taxableIncome = getTaxableIncome(site, param)

    const taxes = getTax(site, taxableIncome, param)
    // console.log('taxes', taxes)

    // TODO income variable should be Earned Income = Total Income for you and spouse + self employ income/spouse   -   totalplansandcafe
    const { ctcOtherDepTotalCredits, eitcTotalCredit, educationTotalCredits } = getTaxCredits(site, taxes, param)

    const refundableCredits = 0,
        nonrefundableCredits = 0

    const overOrUnderPayment = (taxes.tax + selfEmployIncomeTax + addtlMedicareTax) - totalFinalCredits - taxesWithheld

    return overOrUnderPayment
}

export default getOverOrUnderPayment
