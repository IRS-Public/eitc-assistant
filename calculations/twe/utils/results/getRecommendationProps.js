const getRecommendationProps = (overUnderAmt, sliderProps, finalW4Recom, filingStatus) => {
  // console.log('getRecommendationProps overUnderAmt', overUnderAmt)
  // console.log('getRecommendationProps sliderProps', sliderProps)
  const jobs = finalW4Recom.currentIncomes.map((income) => ({
    incomeType: income.incomeType,
    totalWages: income.totalWages,
    withheld: income.addtlWHDue,
    diff: income.taxWHLastPayPeriod - income.finalPaycheck,
    standardWithholding: income.standardWithholding,
    finalPaycheck: income.finalPaycheck,
    accordionTitle: income.accordionTitle,
    addtlWHDueFH: income.addtlWHDueFH,
    suggestedAllowances: income.suggestedAllowances,
    finalAnnualAmtFH: income.finalAnnualAmtFH,
    taxWHLastPayPeriod: income.taxWHLastPayPeriod
  }))

  return {
    filingStatus,
    overUnderAmt,
    sliderProps,
    jobs,
    shutDownSalary: finalW4Recom.shutDownSalary,
    shutDownWithholding: finalW4Recom.shutDownWithholding
  }
}

export default getRecommendationProps
