// Toolbar state for the /all-screens audit view.
// The audit panel is NOT shown on this page — the toolbar's "Show conditions" toggle drives
// `displayConditions()` / `hideConditions()` directly. State is persisted under 'allScreens'.

import { displayConditions, hideConditions } from './audit-panel.js'

const STORAGE_KEY = 'allScreens'

const defaults = {
  section: '',
  showConditions: true,
  horizontalLayout: false,
}

function readStorage () {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? { ...defaults, ...JSON.parse(raw) } : { ...defaults }
  } catch (e) {
    return { ...defaults }
  }
}

function writeStorage (patch) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readStorage(), ...patch }))
}

function expandAllDetails () {
  document.querySelectorAll('details').forEach(d => d.setAttribute('open', 'true'))
}

// Show only the section matching `slug`. Empty slug means show every section.
function showSection (slug) {
  document.querySelectorAll('main .all-screens__section').forEach(section => {
    section.hidden = !!slug && section.dataset.section !== slug
  })
}

function applyShowConditions (show) {
  document.body.classList.toggle('display-conditions', show)
  if (show) displayConditions()
  else hideConditions()
}

function applyLayout (horizontal) {
  document.body.classList.toggle('layout--horizontal', horizontal)
}

export function initAllScreens () {
  const conditionsToggle = document.querySelector('#all-screens-toggle-conditions')
  const layoutToggle = document.querySelector('#all-screens-toggle-layout')
  const sectionTabs = document.querySelectorAll('.all-screens__section-tab')

  // Force every collection to render its first child instance, even with an empty fact graph.
  document.querySelectorAll('fg-collection').forEach(c => c.setAttribute('disallowempty', 'true'))

  // Give fg-components a tick to materialize collection instances before we open details and
  // render condition annotations.
  setTimeout(() => {
    expandAllDetails()
    const stored = readStorage()
    if (conditionsToggle) conditionsToggle.checked = stored.showConditions
    applyShowConditions(stored.showConditions)
    if (layoutToggle) layoutToggle.checked = stored.horizontalLayout
    applyLayout(stored.horizontalLayout)
  }, 100)

  const stored = readStorage()
  sectionTabs.forEach(tab => {
    tab.classList.toggle('all-screens__section-tab--active', tab.dataset.section === stored.section)
  })
  showSection(stored.section)

  conditionsToggle?.addEventListener('change', () => {
    writeStorage({ showConditions: conditionsToggle.checked })
    applyShowConditions(conditionsToggle.checked)
  })

  layoutToggle?.addEventListener('change', () => {
    writeStorage({ horizontalLayout: layoutToggle.checked })
    applyLayout(layoutToggle.checked)
  })

  sectionTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      sectionTabs.forEach(t => t.classList.remove('all-screens__section-tab--active'))
      tab.classList.add('all-screens__section-tab--active')
      const slug = tab.dataset.section
      writeStorage({ section: slug })
      showSection(slug)
      if (slug) document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  })
}
