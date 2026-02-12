import stateSelectItems from './stateSelectItems'

const stateObject = (lowerCase = false) => {
  const states = {}
  const list = stateSelectItems()

  list.forEach((i) => {
    lowerCase
      ? states[i.text.toLowerCase()] = i.key
      : states[i.text] = i.key
  })
  return states
}

export default stateObject
