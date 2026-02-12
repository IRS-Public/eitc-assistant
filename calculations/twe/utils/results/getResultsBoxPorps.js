const getResultsBoxPorps = (projectWithholding, totalTaxLiability, ssiIncome, taxCredits, taxBeforeRefundable) => ({
  expectedTaxWithholding: projectWithholding.total,
  anticipatedTaxObligation: totalTaxLiability < 0 ? 0 : totalTaxLiability,
  estimatedOverPayment: projectWithholding.total - totalTaxLiability,
  ssiIncome,
  taxBeforeRefundable,
  isRefund: projectWithholding.total > totalTaxLiability,
  refundableTaxCreditsTotal: taxCredits.ctcOtherDepTotalCredits.refundableAddtlChildTaxCredit + taxCredits.eitcTotalCredit + taxCredits.educationTotalCredits.refundableAOTC
})

export default getResultsBoxPorps
