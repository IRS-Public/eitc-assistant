import * as fg from '../vendor/fact-graph/factgraph-3.1.0.js'

const res = await fetch('/app/eitc/resources/fact-dictionary.xml')
const text = await res.text()
export const factDictionary = fg.FactDictionaryFactory.importFromXml(text)

const serializedGraphJSON = sessionStorage.getItem('factGraph')
export let factGraph = serializedGraphJSON
  ? fg.GraphFactory.fromJSON(factDictionary, serializedGraphJSON)
  : fg.GraphFactory.apply(factDictionary)

window.factGraph = factGraph
document.dispatchEvent(new CustomEvent('fg-load'))

// Presence of an unload event listener will disable bfcache in Firefox.
window.addEventListener('unload', () => {})

export function saveFactGraph () {
  sessionStorage.setItem('factGraph', factGraph.toJSON())
}

export function loadFactGraph (factGraphAsString) {
  factGraph = fg.GraphFactory.fromJSON(factDictionary, factGraphAsString)
  saveFactGraph()
  window.location.reload()
}
window.loadFactGraph = loadFactGraph

export function resetEntireGraphKeepingTaxYear (newYearValue) {
  sessionStorage.removeItem('factGraph')
  factGraph = fg.GraphFactory.apply(factDictionary)
  window.factGraph = factGraph
  factGraph.set('/chosenTaxYear', newYearValue)
  saveFactGraph()
  window.location.reload()
}
