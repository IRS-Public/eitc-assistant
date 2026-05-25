import './fg-fact-graph.js'
import { showOrHideAllElements } from './fg-conditions.js'
import './fg-set.js'
import './fg-collection.js'
import './fg-display.js'
import './fg-knockout-handlers.js'
import './fg-flow-confirmations.js'
import { initSingleQuestionNav } from './fg-navigator.js'

// Add show/hide functionality to all elements
document.addEventListener('fg-update', showOrHideAllElements)
showOrHideAllElements()
document.querySelector('#page-content-wrapper').classList.remove('hidden')
document.querySelector('#loading-spinner').classList.add('hidden')

initSingleQuestionNav()

// Open all <details> elements that have a complete fact, so users can see information they've
// entered if they return to a page.
for (const fgSet of document.querySelectorAll('.fg-detail fg-set:not(.hidden)')) {
  if (fgSet.isComplete()) {
    fgSet.closest('.fg-detail').setAttribute('open', '')
  }
}
