const getTotalFromArray = (array, limit) => {
  let total = 0
  array.forEach((item) => parseInt(item.amount) && (total += parseInt(item.amount)))

  return total > limit ? limit : total
}

export default getTotalFromArray
