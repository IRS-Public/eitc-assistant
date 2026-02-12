import moment from 'moment';

/**
 * Adapted from React-Dates (MIT License)
 * https://github.com/airbnb/react-dates
 * @param  {object} month - Moment object representing the month we're working with
 * @returns {array}       - An array containing an array of moment objects for
 *                          each full week in the month (i.e. row in the display grid)
 * @throws {TypeError} - when passed param is not a valid moment object
 */
export default function getCalendarMonthWeeks(month) {
  if (!moment.isMoment(month) || !month.isValid()) {
    throw new TypeError('`month` must be a valid moment object');
  }

  // set utc offset to get correct dates in future (when timezone changes)
  const firstOfMonth = month.clone().startOf('month').hour(12);
  const lastOfMonth = month.clone().endOf('month').hour(12);

  // calculate the exact first and last days to fill the entire matrix
  // (considering days outside month)
  const prevDays = ((firstOfMonth.day() + 7) % 7);
  const nextDays = ((6 - lastOfMonth.day()) % 7);
  const firstDay = firstOfMonth.clone().subtract(prevDays, 'day');
  const lastDay = lastOfMonth.clone().add(nextDays, 'day');

  const totalDays = lastDay.diff(firstDay, 'days') + 1;

  const currentDay = firstDay.clone();
  const weeksInMonth = [];

  for (let i = 0; i < totalDays; i += 1) {
    if (i % 7 === 0) {
      weeksInMonth.push([]);
    }

    let day = null;
    if (i >= prevDays && i < (totalDays - nextDays)) {
      day = currentDay.clone();
    }

    weeksInMonth[weeksInMonth.length - 1].push(day);

    currentDay.add(1, 'day');
  }

  return weeksInMonth;
}
