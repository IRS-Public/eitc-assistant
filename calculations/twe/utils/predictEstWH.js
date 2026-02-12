import moment from 'moment'
import { getToday } from '../../../helpers/dateHelper'

const predictEstWH = (incomes, totalWHTaxesYTD, param) => {
  const { currentIncomes, pastIncomes, ssiIncomes, otherIncome } = incomes,
    endOfYr = moment(`December 31, ${param.current_year} 12:00:00`)

  let projectedTotalWH = 0,
    projectedSSTaxes = 0,
    bonusTaxWH = 0

  currentIncomes.forEach((currIncome) => {
    projectedTotalWH += (currIncome.taxWHLastPayPeriod * currIncome.remainingPayPeriods)
    bonusTaxWH += currIncome.bonusTaxWH
  })

  ssiIncomes.forEach((ssiInc) => {
    let ssiPayPeriods = 0,
      tempDate = moment(getToday(param))

    if (ssiInc.ssiAllYear === 'yes') {
      ssiPayPeriods = endOfYr.diff(moment(getToday(param)), 'months') + 1
    } else {
      if (ssiInc.incomeStartDate > moment(getToday(param))) {
        tempDate = ssiInc.incomeStartDate
      }
      ssiPayPeriods = ssiInc.incomeEndDate.diff(tempDate, 'months') + 1
    }

    projectedTotalWH += (ssiInc.taxWHLastPayPeriod * ssiPayPeriods)
    projectedSSTaxes += (ssiInc.taxWHLastPayPeriod * ssiPayPeriods)
  })

  return { projectedTotalWH, projectedSSTaxes, totalWHTaxesYTD, bonusTaxWH, total: projectedTotalWH + totalWHTaxesYTD + bonusTaxWH }
}

export default predictEstWH
