const getTotalTaxLiability = (taxCredits, tax, selfEmployTax, medTaxMod) => {
  let finalTaxObligation = 0,
    taxBeforeRefundable = 0

  const refundableCredits = taxCredits.eitcTotalCredit
    + taxCredits.ctcOtherDepTotalCredits.refundableAddtlChildTaxCredit
    + taxCredits.educationTotalCredits.refundableAOTC

  const nonrefundableCredits = taxCredits.ctcOtherDepTotalCredits.totalNonrefundCredits

  // console.log('tax creds', taxCredits, tax, selfEmployTax, medTaxMod, nonrefundableCredits, refundableCredits)

  // finalTaxObligation = ((tax + selfEmployTax + medTaxMod) - nonrefundableCredits) < 0
  //                    ? 0
  //                    : (tax + selfEmployTax + medTaxMod) - nonrefundableCredits

  const totalTaxes = ((tax.tax + selfEmployTax + medTaxMod) - nonrefundableCredits)

  if (totalTaxes > 0) {
    finalTaxObligation = totalTaxes
  } else {
    finalTaxObligation = 0
  }
  taxBeforeRefundable = finalTaxObligation

  finalTaxObligation -= refundableCredits

  return { finalTaxObligation, taxBeforeRefundable }
}

export default getTotalTaxLiability
