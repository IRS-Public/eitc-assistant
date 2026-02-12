import moment from 'moment'

export function getCurrentYear(param) {
  return param.current_year
}

export function getToday(param) {
  return param.today ? moment(param.today) : moment()
}

export function getNextYear(param) {
  return param.current_year + 1
}

export function getLastYear(param) {
  return param.current_year - 1
}

export function getStartOfYear(param) {
  return "January 1, " + param.current_year + " 12:00:00"
}

export function getEndOfYear(param) {
  return "December 31, " + param.current_year + " 12:00:00"
}

export function cutoffDateStart(param) {
  return "December 15, " + param.current_year + " 00:00:00"
}

export function cutoffDateEnd(param) {
  return "December 31, " + param.current_year + " 23:59:59"
}

export function getRenderDateOutsideRange(param) {
  if (getToday(param).format("M") === "1") {
    return "12/01/" + (param.current_year - 1)
  }

  return "01/01/" + param.current_year
}

export function lastPayDayCheck(lastPayDay, param) {
  if (lastPayDay === undefined || lastPayDay === null) {
    return true
  }

  if (lastPayDay.format("Y") == getLastYear(param)) {
    return false
  }

  return true
}
