import moment from 'moment'
import initialTaxDedCalc from './initialTaxDedCalc'

const salesTaxDedCalc = (moves, year, liveAllYear) => {
  let initialTaxTotal = 0
  let finalTaxTotal = 0
  const finalTaxTotalArray = []
  moves.forEach((move) => {
    const getPercentage = () => {
      if (liveAllYear === 'yes') {
        return 1
      }

      const dateDifference = moment(move.info.date.endDate).diff(moment(move.info.date.startDate), 'days') + 1
      const percentage = moment([parseInt(year)]).isLeapYear()
        ? (dateDifference / 366)
        : (dateDifference / 365)

      return percentage
    }

    // eslint-disable-next-line camelcase
    const { local_category, localTax, local_rate, stateTax, state_rate } = move.info
    const newLocalTax = local_category >= 4 ? parseFloat(localTax) : 0
    const initialTax = initialTaxDedCalc(parseInt(local_category), getPercentage(), newLocalTax, local_rate, parseFloat(stateTax), state_rate)
    finalTaxTotalArray.push(initialTax)

    // eslint-disable-next-line max-len
    initialTaxTotal += initialTax
  })
  finalTaxTotal = initialTaxTotal
  return {
    finalTaxTotal,
    finalTaxTotalArray
  }
}

export default salesTaxDedCalc
