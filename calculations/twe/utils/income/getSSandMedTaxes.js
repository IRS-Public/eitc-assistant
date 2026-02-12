const getSSandMedTaxes = (incomes, param) => {
  const { currentIncomes, pastIncomes } = incomes

  let totalSSIncomeAmts = 0,
    totalIncomeAmts = 0

  currentIncomes.forEach((currIncome) => {
    const tempIncome = currIncome.totalWages + currIncome.bonusAmount + currIncome.bonusAmountFuture

    totalSSIncomeAmts += param.SS_LIMIT > tempIncome ? param.SS_LIMIT : tempIncome
    totalIncomeAmts += tempIncome
  })

  pastIncomes.forEach((pastIncome) => {
    const tempIncome = pastIncome.totalWages + pastIncome.bonusAmount + pastIncome.bonusAmountFuture

    totalSSIncomeAmts += tempIncome
    totalIncomeAmts += tempIncome
  })

  const ssTax = totalSSIncomeAmts * param.ss_rate,
    medSSTax = totalIncomeAmts * param.medicare_rate

  return { ssTax, medSSTax }
}

export default getSSandMedTaxes
