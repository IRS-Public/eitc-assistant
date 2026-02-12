import moment from 'moment'
import getWHAmounts from '../getWHAmounts'
import getAnnualIncome from '../../../../project/incomeWithholding/helpers/getAnnualIncome'

export const calculateNoOfDaysPerPP = (frequencyOfPay) => {
  let noOfDays = 0

  switch (frequencyOfPay) {
    case 'weekly':
      noOfDays = 21
      break;
    case 'biweekly':
      noOfDays = 28
      break;
    case 'twiceMonthly':
      noOfDays = 30
      break;
    case 'monthly':
      noOfDays = 30
      break;
    default:
      noOfDays = 30
      break
  }
  return noOfDays
}

const getToday = (param) => (param.today ? moment(param.today) : moment())

export const futureJobCheck = (startDate, noOfDays, param) => {
  let flag = false

  if (getToday(param).diff(startDate, 'days') <= noOfDays) {
    flag = true
  }

  return flag
}

const calculateRemainPayPeriods2 = (lastPayDay, frequencyOfPay, datesJobEnd, param) => {
  let remainingPayPeriods = 0,
    endOfYear = moment(`December 31, ${param.current_year} 12:00:00`)

  if (datesJobEnd < endOfYear && datesJobEnd !== null) {
    endOfYear = datesJobEnd
  }
  switch (frequencyOfPay) {
    case 'weekly':
      // remainingPayPeriods = ((endOfYear.diff(lastPayDay, 'days') + 1) / 365) * 52
      remainingPayPeriods = (endOfYear.diff(lastPayDay, 'days')) / 7
      break;
    case 'biweekly':
      // remainingPayPeriods = ((endOfYear.diff(lastPayDay, 'days') + 1) / 365) * 26
      remainingPayPeriods = (endOfYear.diff(lastPayDay, 'days')) / 14
      break;
    case 'twiceMonthly':
      // remainingPayPeriods = ((endOfYear.diff(lastPayDay, 'days') + 1) / 365) * 24
      remainingPayPeriods = (endOfYear.diff(lastPayDay, 'days')) / (365 / 24)
      break;
    case 'monthly':
      // remainingPayPeriods = (endOfYear.diff(lastPayDay, 'months'))
      remainingPayPeriods = (endOfYear.diff(lastPayDay, 'days')) / (365 / 12)
      break;
    default:
      break
  }
  if (endOfYear.format('MM/DD') === '12/31') {
    remainingPayPeriods = Math.trunc(remainingPayPeriods)
  }
  return remainingPayPeriods
}

export const totalDaysInPP = (frequencyOfPay) => {
  switch (frequencyOfPay) {
    case 'weekly':
      return 7
    case 'biweekly':
      return 14
    case 'twiceMonthly':
      return 15
    case 'monthly':
      return 30
    default:
      return 30
  }
}

const adjustRPP = (rPP, frequencyOfPay, lastPayDay, flag, futureFlag, holdJob, partialDays, daysInPP, totalPP, datesJobEnd, param) => {
  let newYRPct = 0,
    endOfYear = moment(`December 31, ${param.current_year} 12:00:00`)

  if (datesJobEnd < endOfYear && datesJobEnd !== null) {
    endOfYear = datesJobEnd
  }

  const today = getToday(param)

  if (holdJob !== 'allYear') {
    switch (frequencyOfPay) {
      case ('weekly'):
        // rPP = ((endOfYear.diff(lastPayDay, 'days') + 1 - 28) / 365) * 52
        rPP = (endOfYear.diff(lastPayDay, 'days')) / 7
        break
      case ('biweekly'):
        // rPP = ((endOfYear.diff(lastPayDay, 'days') + 1 - 14) / 365) * 26
        rPP = (endOfYear.diff(lastPayDay, 'days')) / 14
        break
      case ('twiceMonthly'):
        // rPP = ((endOfYear.diff(lastPayDay, 'days') + 1 - 14) / 365) * 24
        rPP = (endOfYear.diff(lastPayDay, 'days')) / (365 / 24)
        break
      case ('monthly'):
        // rPP = ((endOfYear.diff(lastPayDay, 'days') + 1) / 365) * 12
        rPP = (endOfYear.diff(lastPayDay, 'days')) / (365 / 12)
        break;
      default:
    }
  }
  if (endOfYear.format('MM/DD') === '12/31') {
    rPP = Math.trunc(rPP)
  }

  if (!futureFlag) {
    switch (frequencyOfPay) {
      case ('weekly'):
        rPP -= 2
        newYRPct = rPP / 52
        break;
      case ('biweekly'):
        rPP -= 1
        newYRPct = rPP / 26
        break;
      case ('twiceMonthly'):
        rPP -= 1
        newYRPct = rPP / 24
        break;
      case ('monthly'):
        if (today.diff(lastPayDay, 'days') > 15) {
          rPP -= 1
        } else {
          rPP -= 0
        }
        newYRPct = rPP / 12
        break;
      default:
    }
  }
  if (rPP < 0) {
    rPP = 0
  }

  if (flag) {
    return rPP
  }

  return newYRPct
}

const adjustWHPaycheckTax = (taxToDate, frequencyOfPay, fedIncomeTaxLastPay, lastPayDay, param) => {
  const today = getToday(param)

  switch (frequencyOfPay) {
    case ('weekly'):
      taxToDate += (fedIncomeTaxLastPay * 2)
      break;
    case ('biweekly'):
      taxToDate += (fedIncomeTaxLastPay * 1)
      break;
    case ('twiceMonthly'):
      taxToDate += (fedIncomeTaxLastPay * 1)
      break;
    case ('monthly'):
      if (today.diff(lastPayDay, 'days') > 15) {
        taxToDate += (fedIncomeTaxLastPay * 1)
      } else {
        taxToDate += (fedIncomeTaxLastPay * 0)
      }
      break;
    default:
  }
  return taxToDate
}

const totalPayPeriods = (frequencyOfPay, startDate, endDate, param) => {
  let tPP = 0,
    endOfYr = moment(`December 31,  ${param.current_year} 12:00:00`),
    startOfYr = moment(`January 01,  ${param.current_year} 12:00:00`)

  if (endDate < endOfYr && endDate !== null) {
    endOfYr = endDate
  }
  if (startDate > startOfYr && startDate !== null) {
    startOfYr = startDate
  }

  switch (frequencyOfPay) {
    case 'weekly':
      tPP = Math.trunc((endOfYr.diff(startOfYr, 'days') / 7))
      break;
    case 'biweekly':
      tPP = Math.trunc((endOfYr.diff(startOfYr, 'week')) / 2)
      break;
    case 'twiceMonthly':
      tPP = ((endOfYr.diff(startOfYr, 'months') + 1) * 2)
      break;
    case 'monthly':
      tPP = endOfYr.diff(startOfYr, 'months', true) % 1 === 0
        ? endOfYr.diff(startOfYr, 'months', true)
        : (endOfYr.diff(startOfYr, 'months') + 1)
      break;
    default:
  }
  return tPP
}

const getRemainAllowances = (whAmounts, newRPP, totalPP, holdJob, partialDays, daysInPP) => {
  const remainsArr = [],
    jobPct = partialDays / daysInPP

  if (holdJob === 'allYear') {
    for (let i = 0; i < whAmounts.length; i++) {
      remainsArr[i] = (whAmounts[i] / totalPP) * newRPP
      if (remainsArr[i] === 0) break
    }
  } else {
    for (let i = 0; i < whAmounts.length; i++) {
      remainsArr[i] = (whAmounts[i] * (newRPP / totalPP))
      if (remainsArr[i] === 0) break
    }
  }

  return remainsArr
}

const getRemainSSIMonth = (dateRange) => {
  const start = moment(dateRange.startDate)
  const end = moment(dateRange.endDate)

  // console.log('dateRange', Math.abs(start.diff(end, 'month')))

  return Math.abs(start.diff(end, 'month')) + 1
}

const getTotalIncome = (site, param) => {
  const { jobs, otherIncome } = site.forms.incomeWithholding.values

  const startOfYear = moment(`January 01, ${param.current_year} 12:00:00`),
    endOfYear = moment(`December 31, ${param.current_year} 12:00:00`)
  const currentIncomes = [],
    pastIncomes = [],
    ssiIncomes = []

  jobs.forEach((job, index) => {
    const incomeStartDate = job.timePeriodOfJob === 'allYear' ? startOfYear : moment(job.dateRange.startDate),
      incomeEndDate = job.timePeriodOfJob === 'allYear' ? endOfYear : moment(job.dateRange.endDate),
      lastPayDate = job.dateLastPayPeriod !== '' ? moment(job.dateLastPayPeriod) : incomeStartDate,
      numOfDaysPerPPPastJob = calculateNoOfDaysPerPP(job.payFrequency),
      futureDateFlag = futureJobCheck(incomeStartDate, numOfDaysPerPPPastJob, param),
      remainingPayPeriods = calculateRemainPayPeriods2(lastPayDate, job.payFrequency, incomeEndDate, param),
      baseWHAmounts = getWHAmounts(site, index, remainingPayPeriods, param),
      acutalNumOfDaysInJob = incomeEndDate.diff(incomeStartDate, 'days'),
      numOfDaysInPayPeriod = totalDaysInPP(job.payFrequency),
      totalPPEmployer = totalPayPeriods(
        job.payFrequency,
        startOfYear,
        endOfYear,
        param,
      ),
      adjustedRemainingPayPeriods = adjustRPP(
        remainingPayPeriods,
        job.payFrequency,
        lastPayDate,
        true,
        futureDateFlag,
        job.timePeriodOfJob,
        acutalNumOfDaysInJob,
        numOfDaysInPayPeriod,
        totalPPEmployer,
        incomeEndDate,
        param,
      ),
      adjustedTaxWHPP = adjustWHPaycheckTax(0, job.payFrequency, parseInt(job.taxesPerPayPeriod), lastPayDate, adjustedRemainingPayPeriods, incomeEndDate, param),
      adjustedTotalTaxWH = adjustWHPaycheckTax(
        parseInt(job.taxesYTD),
        job.payFrequency,
        parseInt(job.taxesPerPayPeriod),
        lastPayDate,
        adjustedRemainingPayPeriods,
        incomeEndDate,
        param),
      totalPP = totalPayPeriods(
        job.payFrequency,
        incomeStartDate,
        incomeEndDate,
        param,
      ),
      remainingWHAmounts = getRemainAllowances(
        baseWHAmounts,
        adjustedRemainingPayPeriods,
        totalPPEmployer,
        job.timePeriodOfJob,
        acutalNumOfDaysInJob,
        numOfDaysInPayPeriod
      ),
      { bonusPast, bonusFuture, retirement, cafeteriaPlan } = job.contributionsAndBonuses,
      bonusAmount = bonusPast.info[0].amount === '' ? 0 : parseInt(bonusPast.info[0].amount),
      bonusAmountFuture = bonusFuture?.info[0]?.amount === '' ? 0 : parseInt(bonusFuture.info[0].amount),
      bonusTaxWH = bonusFuture?.info[0]?.employerWillWithhold && bonusFuture?.info[0]?.employerWillWithhold[0] === 'employerWillWithhold' ? bonusAmountFuture * param.BONUS_WH_RATE : 0,
      retirementPP = ['', undefined].includes(retirement.info[0].amount) ? 0 : parseInt(retirement.info[0].amount),
      cafeteriaPP = ['', undefined].includes(cafeteriaPlan.info[0].amount) ? 0 : parseInt(cafeteriaPlan.info[0].amount),
      retirementTotal = ['', undefined].includes(retirement.info[0].amountYTD) ? 0 : parseInt(retirement.info[0].amountYTD),
      cafeteriaTotal = ['', undefined].includes(cafeteriaPlan.info[0].amountYTD) ? 0 : parseInt(cafeteriaPlan.info[0].amountYTD),
      nonTaxPayrollTotal = ((retirementPP + cafeteriaPP) * remainingPayPeriods) + retirementTotal + cafeteriaTotal,
      accordionTitle = `Income ${index + 1}`

    if (incomeEndDate.diff(lastPayDate, 'days') > numOfDaysPerPPPastJob && incomeEndDate > getToday(param)) {
      currentIncomes.push({
        'totalWages': getAnnualIncome(site, index, param).correctedAnnualIncome, // wagesYTD
        index,
        accordionTitle,
        incomeStartDate,
        incomeEndDate,
        baseWHAmounts, // calculated based off totalWages
        lastPayDate,
        numOfDaysPerPPPastJob, // calculated payFrequency 21, 28, 28, 30 (this is to determine if a current partial is a past job)
        futureDateFlag, // calculated based off current portion job and payFrequency , # of days in payFrequency
        remainingPayPeriods, // calculated from date and frequency
        acutalNumOfDaysInJob, // calculated with start/end dates dateRange.startDate / dateRange.endDate
        numOfDaysInPayPeriod, // calculated on payFrequncy, 7 14 15 or 30
        adjustedRemainingPayPeriods, // calculated based on when W-4 goes into effect  payFrequency
        'adjustedTaxWHPP': futureDateFlag ? 0 : adjustedTaxWHPP, // newTaxWithheld0 calculated with taxesPerPayPeriod
        'adjustedTotalTaxWH': futureDateFlag ? 0 : adjustedTotalTaxWH, // newTaxWithheld0 taxesPerPayPeriod + taxesYTD
        totalPP, // total Pay periods within the job's timeframe payFrequency  dateRange.start/endDates
        totalPPEmployer, // total Pay periods for entire year
        'percentOfFullYrLeft': adjustedRemainingPayPeriods / totalPPEmployer,
        remainingWHAmounts, // timePeriodOfJob === 'allYear' this is for holdJobALlYear or not
        'baselineFinalWH': futureDateFlag ? remainingWHAmounts[0] : adjustedTotalTaxWH + remainingWHAmounts[0],
        'totalProjectedTaxWH': futureDateFlag ? remainingWHAmounts[0] : (parseInt(job.taxesPerPayPeriod) * remainingPayPeriods) + parseInt(job.taxesYTD), // projectTax calculated
        bonusAmount, // contributionsAndBonuses.bonusPast.info.amount
        bonusAmountFuture, // contributionsAndBonuses.bonusFuture.info.amount
        'wagesAndBonus': getAnnualIncome(site, index, param).correctedAnnualIncome + bonusAmount + bonusAmountFuture,
        bonusTaxWH, // default for now until checkbox comes up
        nonTaxPayrollTotal, // contributionsAndBonuses object totals
        'frequencyOfPay': job.payFrequency, // weekly, bi-weekly, etc just the payFrequency
        'holdJobAllYear': job.timePeriodOfJob, // just timePeriodOfJob === 'allYear' this is for holdJobALlYear or not
        'taxWHLastPayPeriod': futureDateFlag ? 0 : parseInt(job.taxesPerPayPeriod), // taxesPerPayPeriod
        'taxWithheldYTD': futureDateFlag ? remainingWHAmounts[0] : parseInt(job.taxesYTD), // taxesYTD
        'suggestedAllowances': 0, // calculated from FINAL calc
        'suggestAllowFH': 0,
        'incomeType': job.incomeType, // job, hourly, salary, etc
        'finalAnnualAmt': 0, // calculated from FINAL calc
        'finalPaycheck': 0, // calculated from FINAL calc to provide to front-end
        'zeroAllowancesPct': 0, // calculated from FINAL calc
        'finalAnnualAmtFH': 0,
        'addtlWHDueFH': 0,
        'addtlWHDue': 0,
        'pastDateFlag': false
      })
    } else {
      if (job.incomeType !== 'ssi') {
        pastIncomes.push({
          'totalWages': parseInt(job.wagesYTD), // wagesYTD
          index,
          incomeStartDate,
          incomeEndDate,
          lastPayDate,
          acutalNumOfDaysInJob, // calculated with start/end dates dateRange.startDate / dateRange.endDate
          numOfDaysInPayPeriod, // calculated on payFrequncy, 7 14 15 or 30
          adjustedTaxWHPP, // newTaxWithheld0 calculated with taxesPerPayPeriod
          adjustedTotalTaxWH, // newTaxWithheld0 taxesPerPayPeriod + taxesYTD
          totalPP, // total Pay periods within the job's timeframe payFrequency  dateRange.start/endDates
          totalPPEmployer, // total Pay periods for entire year
          'totalProjectedTaxWH': parseInt(job.taxesYTD), // projectTax calculated
          bonusAmount, // contributionsAndBonuses.bonusPast.info.amount
          bonusAmountFuture, // contributionsAndBonuses.bonusFuture.info.amount
          bonusTaxWH, // default for now until checkbox comes up
          nonTaxPayrollTotal, // contributionsAndBonuses object totals
          'frequencyOfPay': job.payFrequency, // weekly, bi-weekly, etc just the payFrequency
          'holdJobAllYear': job.timePeriodOfJob, // just timePeriodOfJob === 'allYear' this is for holdJobALlYear or not
          'taxWHLastPayPeriod': parseInt(job.taxesPerPayPeriod), // taxesPerPayPeriod
          'taxWithheldYTD': parseInt(job.taxesYTD), // taxesYTD
          'suggestAllowances': 0, // calculated from FINAL calc
          'incomeType': job.incomeType, // job, hourly, salary, etc
          'finalAnnualAmount': 0, // calculated from FINAL calc
          'displayFinalPaycheck': 0, // calculated from FINAL calc to provide to front-end
          'zeroAllowancesPct': 0, // calculated from FINAL calc
          'pastDateFlag': true,
          'wagesAndBonus': parseInt(job.wagesYTD) + bonusAmount + bonusAmountFuture
        })
      }
    }
    if (job.incomeType === 'ssi') {
      const remainingSSIPayPeriods = job.ssiAllYear === 'yes' ? 12 : getRemainSSIMonth(job.dateRange)
      const ssiIncomeStartDate = job.ssiAllYear === 'yes' ? startOfYear : moment(job.dateRange.startDate)
      const ssiIncomeEndDate = job.ssiAllYear === 'yes' ? endOfYear : moment(job.dateRange.endDate)

      const ssiTotalAmt = job.ssiMonthlyAmount === '' ? 0 : parseInt(job.ssiMonthlyAmount) * remainingSSIPayPeriods
      const ssiPastTotalAmt = job.ssiBenefitsYTD === '' ? 0 : parseInt(job.ssiBenefitsYTD)
      const totalSSITax = job.taxesPerPayPeriod === '' ? 0 : parseInt(job.taxesPerPayPeriod)
      const pastFlag = ssiIncomeEndDate <= getToday(param)

      ssiIncomes.push({
        remainingSSIPayPeriods,
        'ssiAllYear': job.ssiAllYear,
        ssiTotalAmt,
        'futureDateFlag': job.ssiAllYear === 'yes' ? false : futureDateFlag,
        pastFlag,
        'ssiMonthlyAmount': job.ssiMonthlyAmount === '' ? 0 : parseInt(job.ssiMonthlyAmount),
        // 'ssiTotalAmt': ssiMonthlyAmount * remainingSSIPayPeriods, // all year, future, current partials
        // 'ssiBenefitsYTD': ssiPastTotalAmt, // past only ssi income amount
        'incomeStartDate': ssiIncomeStartDate,
        'incomeEndDate': ssiIncomeEndDate,
        'taxWHLastPayPeriod': futureDateFlag || pastFlag ? 0 : totalSSITax, // taxesPerPayPeriod
        'taxWithheldYTD': job.taxesYTD === '' || futureDateFlag ? 0 : parseInt(job.taxesYTD),
        'totalIncome': pastFlag ? ssiPastTotalAmt : ssiTotalAmt,
        'totalTax': futureDateFlag || pastFlag ? 0 : totalSSITax * remainingSSIPayPeriods,
        'incomeType': 'ssi'
      })
    }
  })

  // console.log('currentIncomes', currentIncomes)
  // console.log('pastIncomes', pastIncomes)
  // console.log('otherIncome', otherIncome)
  // console.log('ssiIncomes', ssiIncomes)
  return { currentIncomes, pastIncomes, otherIncome, ssiIncomes }
}

export default getTotalIncome
