import { factGraph, saveFactGraph, resetEntireGraphKeepingTaxYear } from './fg-fact-graph.js'
import { makeCollectionIdPath } from './fg-collection-utils.js'

/**
 * Destructive confirmations (TXE-21928): pending values and "show dialog" flags live on the fact
 * graph (/flowPending*, /flowShow* in flowConfirmations.xml). fg-set-before-commit sets them and
 * blocks commit; modal actions clear or apply them.
 */

function factValueToComparableString (result) {
  if (!result || result.hasValue === false) return null
  const g = result.get
  if (g == null) return null
  if (typeof g === 'object' && g !== null && 'value' in g) return g.value
  return String(g)
}

function clearTaxYearConfirmFlowFacts () {
  try {
    factGraph.delete('/flowShowTaxYearChangeConfirm')
    factGraph.delete('/flowPendingChosenTaxYear')
  } catch (e) {
    console.debug('clearTaxYearConfirmFlowFacts', e)
  }
}

function clearMfjConfirmFlowFacts () {
  try {
    factGraph.delete('/flowShowMfjToNonmfjQcClearConfirm')
    factGraph.delete('/flowPendingInitialFilingStatus')
  } catch (e) {
    console.debug('clearMfjConfirmFlowFacts', e)
  }
}

function openFlowModal (modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.showModal()
    document.body.classList.add('usa-js-modal--active')
  }
}

function clearQualifyingChildrenCollection () {
  const collectionPath = '/familyAndHousehold'
  let ids
  try {
    ids = factGraph.getCollectionIds(collectionPath)
  } catch (e) {
    console.error('clearQualifyingChildrenCollection: getCollectionIds', e)
    return
  }
  for (const id of ids) {
    try {
      factGraph.delete(makeCollectionIdPath(`${collectionPath}/*`, id))
      factGraph.removeFromCollection(collectionPath, id)
    } catch (err) {
      console.error('clearQualifyingChildrenCollection: item', id, err)
    }
  }
}

document.addEventListener('fg-set-before-commit', function (e) {
  const fgSet = e.target
  if (!fgSet || fgSet.tagName !== 'FG-SET') return
  const path = e.detail.path
  const proposed = e.detail.proposedValue

  if (path === '/chosenTaxYear') {
    const cur = factGraph.get('/chosenTaxYear')
    if (!cur || cur.complete === false) return
    const oldVal = factValueToComparableString(cur)
    const newVal = proposed != null ? String(proposed) : null
    if (oldVal === newVal) return
    e.preventDefault()
    fgSet.setInputValueFromFactValue()
    factGraph.set('/flowPendingChosenTaxYear', newVal)
    factGraph.set('/flowShowTaxYearChangeConfirm', true)
    saveFactGraph()
    openFlowModal('modal-confirm-tax-year-change')
    return
  }

  if (path === '/initialFilingStatus') {
    const cur = factGraph.get('/initialFilingStatus')
    if (!cur || cur.complete === false) return
    const oldVal = factValueToComparableString(cur)
    const newVal = proposed != null ? String(proposed) : null
    if (oldVal !== 'marriedFilingJointly' || newVal === 'marriedFilingJointly') return

    const age = factGraph.get('/ageRange')
    const ageOk = age && age.complete && factValueToComparableString(age) === 'under24'
    if (!ageOk) return

    let ids = []
    try {
      ids = factGraph.getCollectionIds('/familyAndHousehold')
    } catch (err) {
      return
    }
    if (!ids || ids.length === 0) return

    e.preventDefault()
    fgSet.setInputValueFromFactValue()
    factGraph.set('/flowPendingInitialFilingStatus', newVal)
    factGraph.set('/flowShowMfjToNonmfjQcClearConfirm', true)
    saveFactGraph()
    openFlowModal('modal-confirm-mfj-to-nonmfj-qc-clear')
  }
})

function wireFlowConfirmationModals () {
  document.getElementById('modal-confirm-tax-year-change-continue')?.addEventListener('click', () => {
    const pending = factGraph.get('/flowPendingChosenTaxYear')
    const newYear = factValueToComparableString(pending)
    if (newYear == null) {
      clearTaxYearConfirmFlowFacts()
      saveFactGraph()
      document.getElementById('modal-confirm-tax-year-change')?.close()
      document.body.classList.remove('usa-js-modal--active')
      return
    }
    resetEntireGraphKeepingTaxYear(newYear)
  })

  document.getElementById('modal-confirm-mfj-to-nonmfj-continue')?.addEventListener('click', () => {
    const pending = factGraph.get('/flowPendingInitialFilingStatus')
    const status = factValueToComparableString(pending)
    const modal = document.getElementById('modal-confirm-mfj-to-nonmfj-qc-clear')
    if (status == null) {
      clearMfjConfirmFlowFacts()
      saveFactGraph()
      modal?.close()
      document.body.classList.remove('usa-js-modal--active')
      return
    }
    clearMfjConfirmFlowFacts()
    clearQualifyingChildrenCollection()
    factGraph.set('/initialFilingStatus', status)
    saveFactGraph()
    modal?.close()
    document.body.classList.remove('usa-js-modal--active')
    window.location.reload()
  })

  const clearTaxYearModalState = () => {
    clearTaxYearConfirmFlowFacts()
    saveFactGraph()
  }
  const clearMfjModalState = () => {
    clearMfjConfirmFlowFacts()
    saveFactGraph()
  }
  document.getElementById('modal-confirm-tax-year-change')?.addEventListener('close', clearTaxYearModalState)
  document.getElementById('modal-confirm-mfj-to-nonmfj-qc-clear')?.addEventListener('close', clearMfjModalState)
}

wireFlowConfirmationModals()
