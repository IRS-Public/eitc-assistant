const getOverUnderAmt = (incomes, taxLiability, projectedTotalWH, projectWithholding) => {
  const { currentIncomes } = incomes
  let sumOfFutureIncomeAmt = 0

  currentIncomes.forEach((item) => {
    if (item.futureFlag) {
      sumOfFutureIncomeAmt += item.remainingWHAmounts[0]
    }
  })

  return taxLiability - (projectWithholding.total + sumOfFutureIncomeAmt)
}

export default getOverUnderAmt
