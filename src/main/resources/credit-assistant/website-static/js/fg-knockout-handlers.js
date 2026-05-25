import { factGraph, saveFactGraph } from './fg-fact-graph.js'
import { validateSectionForNavigation, focusKnockoutAlert } from './fg-validation.js'

export function handleSectionContinue (event) {
  if (!validateSectionForNavigation()) {
    event.preventDefault()
    return false
  }
  if (handleIncomeNonPositiveEarnedIncomeKnockoutRevealOnContinue(event)) {
    return false
  }
  if (handleQualifyingChildrenRequiredQcKnockoutRevealOnContinue(event)) {
    return false
  }
  if (handleQualifyingChildrenIncomeLimitKnockoutRevealOnContinue(event)) {
    return false
  }
  if (handleAdjustmentsAgiKnockoutRevealOnContinue(event)) {
    return false
  }
  return true
}

/**
 * First Continue from Income while earned income is non-positive:
 * set /flowClickedNextOnIncomePageForNonPositiveEarnedIncomeKnockout, reveal the knockout in-place
 * (no navigation). Subsequent Continue attempts are blocked by validateSectionForNavigation while
 * the knockout is visible.
 */
function handleIncomeNonPositiveEarnedIncomeKnockoutRevealOnContinue (event) {
  const path = window.location.pathname
  if (!path.includes('/eitc/agi')) {
    return false
  }
  let shouldReveal
  try {
    const reveal = factGraph.get('/flowShouldShowNonPositiveEarnedIncomeKnockout')
    if (!reveal.hasValue) return false
    shouldReveal = reveal.get === true
  } catch (e) {
    console.error('Error reading /flowShouldShowNonPositiveEarnedIncomeKnockout in handleIncomeNonPositiveEarnedIncomeKnockoutRevealOnContinue', e)
    return false
  }
  if (!shouldReveal) {
    return false
  }
  try {
    const clicked = factGraph.get('/flowClickedNextOnIncomePageForNonPositiveEarnedIncomeKnockout')
    if (clicked.hasValue && clicked.get === true) {
      return false
    }
  } catch (e) {
    console.error('Error reading /flowClickedNextOnIncomePageForNonPositiveEarnedIncomeKnockout in handleIncomeNonPositiveEarnedIncomeKnockoutRevealOnContinue', e)
    return false
  }
  factGraph.set('/flowClickedNextOnIncomePageForNonPositiveEarnedIncomeKnockout', true)
  saveFactGraph()
  document.dispatchEvent(new CustomEvent('fg-update'))
  const knockoutAlert = document.querySelector('fg-alert[knockout="true"]:not(.hidden)')
  if (knockoutAlert) {
    focusKnockoutAlert(knockoutAlert)
  }
  event.preventDefault()
  return true
}

/**
 * First Continue from Qualifying Children when the add-child required-QC knockout condition is true:
 * set /flowClickedNextOnQualifyingChildrenPage, reveal the knockout in-place (no navigation), then
 * subsequent Continue attempts are blocked by validateSectionForNavigation while knockout is visible.
 */
function handleQualifyingChildrenRequiredQcKnockoutRevealOnContinue (event) {
  const path = window.location.pathname
  if (!path.includes('/eitc/qualifying-children')) {
    return false
  }
  let shouldShowRequiredQcKnockout
  try {
    const shouldShowAddChild = factGraph.get('/flowShouldShowQcRequiredAddChildKnockout')
    if (!shouldShowAddChild.hasValue) return false
    shouldShowRequiredQcKnockout = shouldShowAddChild.get === true
  } catch (e) {
    console.error('Error reading QC required knockout conditions in handleQualifyingChildrenRequiredQcKnockoutRevealOnContinue', e)
    return false
  }
  if (!shouldShowRequiredQcKnockout) {
    return false
  }
  try {
    const clicked = factGraph.get('/flowClickedNextOnQualifyingChildrenPage')
    if (clicked.hasValue && clicked.get === true) {
      return false
    }
  } catch (e) {
    console.error('Error reading /flowClickedNextOnQualifyingChildrenPage in handleQualifyingChildrenRequiredQcKnockoutRevealOnContinue', e)
    return false
  }
  factGraph.set('/flowClickedNextOnQualifyingChildrenPage', true)
  saveFactGraph()
  document.dispatchEvent(new CustomEvent('fg-update'))
  const knockoutAlert = document.querySelector('fg-alert[knockout="true"]:not(.hidden)')
  if (knockoutAlert) {
    focusKnockoutAlert(knockoutAlert)
  }
  event.preventDefault()
  return true
}

/**
 * First Continue from Qualifying Children when final AGI/earned income is at or above the
 * completed phase-out line: set /flowClickedNextOnQualifyingChildrenPageForIncomeLimit, reveal the
 * knockout in-place (no navigation). Subsequent Continue attempts are blocked by
 * validateSectionForNavigation while the knockout is visible.
 */
function handleQualifyingChildrenIncomeLimitKnockoutRevealOnContinue (event) {
  const path = window.location.pathname
  if (!path.includes('/eitc/qualifying-children')) {
    return false
  }
  let shouldReveal
  try {
    const reveal = factGraph.get('/flowShouldRevealEitcIncomeLimitOnQualifyingChildrenContinue')
    if (!reveal.hasValue) return false
    shouldReveal = reveal.get === true
  } catch (e) {
    console.error('Error reading /flowShouldRevealEitcIncomeLimitOnQualifyingChildrenContinue in handleQualifyingChildrenIncomeLimitKnockoutRevealOnContinue', e)
    return false
  }
  if (!shouldReveal) {
    return false
  }
  try {
    const clicked = factGraph.get('/flowClickedNextOnQualifyingChildrenPageForIncomeLimit')
    if (clicked.hasValue && clicked.get === true) {
      return false
    }
  } catch (e) {
    console.error('Error reading /flowClickedNextOnQualifyingChildrenPageForIncomeLimit in handleQualifyingChildrenIncomeLimitKnockoutRevealOnContinue', e)
    return false
  }
  factGraph.set('/flowClickedNextOnQualifyingChildrenPageForIncomeLimit', true)
  saveFactGraph()
  document.dispatchEvent(new CustomEvent('fg-update'))
  const knockoutAlert = document.querySelector('fg-alert[knockout="true"]:not(.hidden)')
  if (knockoutAlert) {
    focusKnockoutAlert(knockoutAlert)
  }
  event.preventDefault()
  return true
}

/**
 * First Continue from Adjustments while over the tentative EITC AGI limit:
 * set /flowClickedNextOnAdjustmentsPage, reveal the AGI knockout in-place (no navigation).
 * Subsequent Continue attempts are blocked by validateSectionForNavigation while the knockout is
 * visible.
 */
function handleAdjustmentsAgiKnockoutRevealOnContinue (event) {
  const path = window.location.pathname
  if (!path.includes('/eitc/adjustments')) {
    return false
  }
  let belowLimitTrue
  try {
    const below = factGraph.get('/belowHighestEitcAgiLimit')
    if (!below.hasValue) return false
    belowLimitTrue = below.get === true
  } catch (e) {
    console.error('Error reading /belowHighestEitcAgiLimit in handleAdjustmentsAgiKnockoutRevealOnContinue', e)
    return false
  }
  if (belowLimitTrue) {
    return false
  }
  try {
    const clicked = factGraph.get('/flowClickedNextOnAdjustmentsPage')
    if (clicked.hasValue && clicked.get === true) {
      return false
    }
  } catch (e) {
    console.error('Error reading /flowClickedNextOnAdjustmentsPage in handleAdjustmentsAgiKnockoutRevealOnContinue', e)
    return false
  }
  factGraph.set('/flowClickedNextOnAdjustmentsPage', true)
  saveFactGraph()
  document.dispatchEvent(new CustomEvent('fg-update'))
  const knockoutAlert = document.querySelector('fg-alert[knockout="true"]:not(.hidden)')
  if (knockoutAlert) {
    focusKnockoutAlert(knockoutAlert)
  }
  event.preventDefault()
  return true
}

window.handleSectionContinue = handleSectionContinue
