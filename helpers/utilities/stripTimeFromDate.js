/**
 * Strips the time component out of dates.
 *
 * @param {Date} date The Date object.
 * @returns {Date} A copy of `date` reset to midnight.
 */
export default function stripTimeFromDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
