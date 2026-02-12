/**
 * [formatNumber description]
 * @param   {number} numToFormat - Number to format
 * @returns {string} - Formatted number
 */
export default function formatNumber(numToFormat) {
  const num = typeof numToFormat === "string" ? parseFloat(numToFormat) : numToFormat;

  if (typeof num === "number" && !isNaN(num)) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  } else {
    return numToFormat;
  }
}
