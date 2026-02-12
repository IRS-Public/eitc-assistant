const getIncomeFutureFlag = (incomes) => {
  const { currentIncomes } = incomes
  currentIncomes.forEach((currIncome) => {
    if (currIncome.futureDateFlag) {
      return currIncome.futureDateFlag
    }
  })
  return false
}
export default getIncomeFutureFlag
