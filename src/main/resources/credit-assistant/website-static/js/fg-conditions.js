import { factGraph } from './fg-fact-graph.js'

export function checkCondition (condition, operator) {
  let value
  // Defaults to true because having to answer an unnecessary question is likely preferable to not
  // being presented a necessary question.
  try {
    value = factGraph.get(condition)
  } catch (e) {
    console.error(`Error attempting to fetch ${condition}, ignoring condition:\n`, e)
    return true
  }

  switch (operator) {
    // We need to explicitly check for true/false to account for incompletes
    case 'isTrue': {
      return value.hasValue && (value.get === true)
    } case 'isFalse': {
      return value.hasValue && (value.get === false)
    } case 'isTrueAndComplete': {
      return value.complete === true && value.hasValue && (value.get === true)
    } case 'isZero': {
      return value.hasValue && (value.get === 0)
    } case 'isGreaterThanZero': {
      return value.hasValue && (value.get > 0)
    } case 'isIncomplete': {
      return value.complete === false
    } case 'notHasValue': {
      return value.hasValue === false
    } default: {
      console.error(`Unknown condition operator ${operator}`)
      return false
    }
  }
}

/**
 * Show or hide the elements in the document based on the Fact Graph config.
 *
 * This method will delete facts that are hidden, making them incomplete.
 */
export function showOrHideAllElements () {
  // At present, this naive implementation relies on <fg-set>s not having conditions on facts that
  // are set after them in the DOM order. This is a deliberate choice to limit complexity at this
  // stage, but it is not set in stone. If you see bugs related to showing/hiding, this is the place
  // to start looking.
  const hideableElements = document.querySelectorAll('[condition][operator]')
  for (const element of hideableElements) {
    const condition = element.getAttribute('condition')
    const operator = element.getAttribute('operator')
    const meetsCondition = checkCondition(condition, operator)

    if (!meetsCondition && !element.classList.contains('hidden')) {
      element.classList.add('hidden')
      if (element.tagName === 'FG-SET') {
        element?.deleteFactNoUpdate()
      } else {
        const fgSetChildren = element.querySelectorAll('fg-set')
        for (const fgSetChild of fgSetChildren) fgSetChild.deleteFactNoUpdate()
      }
    } else if (meetsCondition && element.classList.contains('hidden')) {
      element.classList.remove('hidden')
    }
  }
}
