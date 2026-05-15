const parser = new DOMParser()
const XML_SERIALIZER = new XMLSerializer()

const res = await fetch('/app/eitc/resources/fact-dictionary.xml')
const text = await res.text()
const factDictionaryXml = parser.parseFromString(text, 'application/xml')
const factSelect = document.querySelector('#fact-select')
const openAuditPanelButton = document.querySelector('#show-audit-panel')
const closeAuditPanelButton = document.querySelector('#close-audit-panel')
const auditPanel = document.querySelector('#audit-panel')
const auditPanelResizer = document.querySelector('#audit-panel-resizer')
const AUDIT_PANEL_STORAGE_KEY = 'auditPanel'
const AUDIT_PANEL_STORAGE_FIELDS = new Set(['isOpen', 'trackedFacts', 'showConditions', 'width'])
const AUDIT_PANEL_DEFAULT_WIDTH = 38
const AUDIT_PANEL_MIN_WIDTH = 320
const AUDIT_PANEL_MAX_WIDTH_RATIO = 0.7
const AUDIT_PANEL_KEYBOARD_STEP = 24

const DQ_MARRIED_NOT_JOINT_FACTS = [
  '/isDisqualifiedFlowSeparationTestNotMarriedLivedNotSeparated',
  '/isDisqualifiedHohMarriedLivedTogetherNotSeparatedNoQcs',
  '/isDisqualifiedMfsLivedNotSeparatedNoQcs',
  '/isDisqualifiedMfsSameResidenceNotSeparated',
  '/isDisqualifiedInitialMfsLivedNotSeparated',
  '/isDisqualifiedHohMarriedLivedTogetherNotSeparated',
  '/isDisqualifiedMarriedNotMfjSameResidenceSeparatedNoQcs',
  '/isDisqualifiedWidowedNotJointlySameResidenceSeparatedNoQcs',
  '/isDisqualifiedWidowedNotJointlyDifferentResidenceNoQcs',
  '/isDisqualifiedMfsDifferentResidenceNoQcs',
  '/isDisqualifiedMfsOrHohSpouseDidNotLiveNoQcs',
  '/isDisqualifiedHohMarriedSeparatedNoQcs',
  '/isDisqualifiedInitialAndFilingMfsSeparatedNoQcs',
  '/isDisqualifiedMarriedNotFilingJointly',
]

const DQ_AGE_WITHOUT_QC_FACTS = [
  '/userDeclinesEitcQualifyingChildrenForDisqualifier',
  '/filingAllowsEitcWithoutQualifyingChildrenForDisqualifier',
  '/notBlockedAsDependentForEitcForDisqualifier',
  '/failsEitcAgeBandWithoutQualifyingChildren',
  '/primaryFilerIsClaimingQualifyingChildren',
  '/isDisqualifiedForEitcAgeWithoutQualifyingChildren',
]

const DQ_AGE_WITH_QC_FACTS = [
  '/hasQcAndShouldSeeAgeComparisonTest',
  '/eitcQualifyingChildren',
  '/isDisqualifiedForEitcAgeWithQualifyingChildren',
]

const FS_MARITAL_STATUS_FACTS = [
  '/isSingle',
  '/isDivorcedOrLegallySeparated',
  '/maritalStatusAllowsFilingMarried',
  '/isWidowedInTaxYear',
  '/isWidowedInPastTwoTaxYears',
  '/isWidowedAtLeastTwoTaxYearsAgo',
]

const FS_HOUSEHOLD_FACTS = [
  '/intendsToFileJointly',
  '/spouseLivedWithTaxpayerLastSixMonths',
  '/paidMoreThanHalfHomeCostsForChild',
  '/tentativelyHOHFromHomeUpkeep',
  '/entitledToPreviouslyFileJointReturn',
  '/canClaimChildAsDependentInCurrentTaxYear',
  '/couldClaimChildAsDependentInCurrentTaxYearWithExceptions',
  '/derivedFilingStatus',
]

function renderDashboardSection (facts, rollupPath, heading, getStatus) {
  const items = facts.map(p => {
    let status = 'incomplete'
    let badge = 'incomplete'
    try {
      const fact = window.factGraph.get(p)
      if (fact.complete) {
        const val = fact.get.toString()
        if (getStatus) {
          const result = getStatus(p, val)
          status = result.status
          badge = result.badge ?? result.status
        } else {
          status = p.startsWith('/isDisqualified')
            ? (val === 'true' ? 'disqualified' : 'passed')
            : (val === 'true' ? 'passed' : 'failed')
          badge = status
        }
      }
    } catch {}
    const isRollup = p === rollupPath
    return `<li class="ap-dq-item ap-dq-${status}${isRollup ? ' ap-dq-rollup' : ''}" title="${p}">
        <span class="ap-dq-label">${p}</span>
        <span class="ap-dq-badge ap-dq-badge--${status}">${badge}</span>
      </li>`
  }).join('')
  return `<li class="ap-dq-section-heading">${heading}</li>${items}`
}

function renderDQDashboard () {
  const list = document.querySelector('#dq-dashboard-list')
  if (!list || !window.factGraph) return

  list.innerHTML = [
    renderDashboardSection(DQ_MARRIED_NOT_JOINT_FACTS, '/isDisqualifiedMarriedNotFilingJointly', 'Married Not Joint'),
    renderDashboardSection(DQ_AGE_WITHOUT_QC_FACTS, '/isDisqualifiedForEitcAgeWithoutQualifyingChildren', 'Age (No QC)'),
    renderDashboardSection(DQ_AGE_WITH_QC_FACTS, '/isDisqualifiedForEitcAgeWithQualifyingChildren', 'Age (With QC)'),
  ].join('')
}

function fsFilingStatusLabel (val) {
  switch (val) {
    case 'marriedFilingJointly': return 'MFJ'
    case 'marriedFilingSeparately': return 'MFS'
    case 'single': return 'Single'
    case 'headOfHousehold': return 'HOH'
    case 'qualifiedSurvivingSpouse': return 'QSS'
    default: return val
  }
}

function fsDashboardStatus (path, val) {
  if (path === '/derivedFilingStatus') return { status: 'resolved', badge: fsFilingStatusLabel(val) }
  return { status: val === 'true' ? 'passed' : 'failed' }
}

function renderFSDashboard () {
  const list = document.querySelector('#fs-dashboard-list')
  if (!list || !window.factGraph) return

  list.innerHTML = [
    renderDashboardSection(FS_MARITAL_STATUS_FACTS, null, 'Marital Status', fsDashboardStatus),
    renderDashboardSection(FS_HOUSEHOLD_FACTS, '/derivedFilingStatus', 'Household & Filing Intent', fsDashboardStatus),
  ].join('')
}

document.addEventListener('fg-update', () => {
  renderDQDashboard()
  renderFSDashboard()
})
document.addEventListener('fg-load', () => {
  renderDQDashboard()
  renderFSDashboard()
})

export function displayConditions () {
  document.body.classList.add('display-conditions')
  document.querySelectorAll('[condition]').forEach(el => {
    const operator = el.getAttribute('operator')
    const conditionPath = el.getAttribute('condition')
    if (!operator || !conditionPath) return

    const abstractPath = conditionPath.replace(/#[^/]+/, '*')

    const detail = document.createElement('condition-detail')
    detail.setAttribute('condition-path', conditionPath)
    detail.setAttribute('condition-operator', operator)
    detail.setAttribute('abstract-path', abstractPath)

    if (el.tagName.toLowerCase() === 'span') {
      el.appendChild(detail)
    } else {
      el.prepend(detail)
    }
  })
}

export function hideConditions () {
  document.body.classList.remove('display-conditions')
  document.querySelectorAll('condition-detail').forEach(el => el.remove())
}
window.displayConditions = displayConditions
window.hideConditions = hideConditions

// Save the open/closed state of the audit panel in session storage so it persists across page reloads and forward navigation.
function getAuditPanelStorage () {
  const storage = sessionStorage.getItem(AUDIT_PANEL_STORAGE_KEY)
  if (storage) {
    return JSON.parse(storage)
  } else {
    return {}
  }
}

// Set a key/value pair in session storage for the audit panel, with special handling to ensure tracked facts are unique by path and collectionId
function setAuditPanelStorage (key, value) {
  if (!AUDIT_PANEL_STORAGE_FIELDS.has(key)) {
    throw new Error(`Unsupported audit panel storage key: ${key}`)
  }

  const storage = getAuditPanelStorage()
  if (key === 'trackedFacts') {
    const uniqueFacts = []
    const seen = new Set()
    for (const fact of value) {
      const factId = `${fact.path}#${fact.collectionId}`
      if (!seen.has(factId)) {
        uniqueFacts.push(fact)
        seen.add(factId)
      }
    }
    storage.trackedFacts = uniqueFacts
  } else if (key === 'isOpen') {
    storage.isOpen = value
  } else if (key === 'showConditions') {
    storage.showConditions = value
  } else if (key === 'width') {
    storage.width = value
  }
  sessionStorage.setItem(AUDIT_PANEL_STORAGE_KEY, JSON.stringify(storage))
}

window.enableAuditMode = enable
window.disableAuditMode = disable
window.trackSelectedFact = trackSelectedFact
window.pathSelectListener = (event) => {
  if (event.key === 'Enter') trackSelectedFact()
}

class FactLink extends HTMLElement {
  connectedCallback () {
    this.path = this.getAttribute('path')
    this.collectionId = this.getAttribute('collectionId')

    const link = document.createElement('a')
    link.href = `#${this.path}`
    while (this.firstChild) { link.appendChild(this.firstChild) } // Move all children to the link
    link.onclick = () => {
      document.body.classList.add('audit-panel-open')
      setAuditPanelStorage('isOpen', true)
      trackFact(this.path, this.collectionId)
      return false
    }
    this.replaceChildren(link)
  }
}
customElements.define('fact-link', FactLink)

class AuditedFact extends HTMLElement {
  constructor () {
    super()

    this.deleteListener = () => {
      const storage = getAuditPanelStorage()
      const trackedFacts = storage.trackedFacts || []
      const newTrackedFacts = trackedFacts.filter((fact) => fact.path !== this.abstractPath && fact.collectionId !== this.collectionId)
      setAuditPanelStorage('trackedFacts', newTrackedFacts)
      this.remove()
    }
    this.renderListener = () => this.render()

    const templateContent = document.querySelector('#audit-panel__fact').content.cloneNode(true)
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.append(templateContent)

    this.factPathElem = this.shadowRoot.querySelector('.audit-panel__fact__path')
    this.factTypeElem = this.shadowRoot.querySelector('.audit-panel__fact__type')
    this.factValueElem = this.shadowRoot.querySelector('.audit-panel__fact__value')
    this.factDefinitionElem = this.shadowRoot.querySelector('.audit-panel__fact__definition')

    this.removeButton = this.shadowRoot.querySelector('.audit-panel__fact__remove')
  }

  connectedCallback () {
    this.abstractPath = this.getAttribute('path')
    this.collectionId = this.getAttribute('collectionid')
    this.factPath = makeCollectionIdPath(this.abstractPath, this.collectionId)

    this.removeButton.addEventListener('click', this.deleteListener)
    this.addEventListener('click', this.handleLinksListener)
    document.addEventListener('fg-update', this.renderListener)

    this.render()
  }

  disconnectedCallback () {
    this.removeButton.removeEventListener('click', this.deleteListener)
    this.removeEventListener('click', this.handleLinksListener)
    document.removeEventListener('fg-update', this.renderListener)
    factSelect.focus()
  }

  render () {
    const definition = window.factGraph.dictionary.getDefinition(this.factPath)
    const fact = window.factGraph.get(this.factPath)

    // Fill out the data fields
    this.factPathElem.innerText = this.factPath
    this.factTypeElem.innerText = definition.typeNode
    const factValueString = fact.hasValue ? fact.get.toString() + ' ' : ''
    const factCompleteString = fact.complete ? '[Complete]' : '[Incomplete]'
    this.factValueElem.innerText = `${factValueString} ${factCompleteString}`

    // Serialize and sanitize the fact definition for inclusion as HTML
    // Replace brackets with HTML entities to prevent the XML from being rendered, and remove leading indentation after first line for readability
    // We do this because the definition will have live <a> links in it
    const xmlDefinition = factDictionaryXml.querySelector(`Fact[path="${this.abstractPath}"]`)
    const stringDefinition = XML_SERIALIZER.serializeToString(xmlDefinition)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .split('\n')
      .map((line, index) => index === 0 ? line : line.replace(/^ {4}/, ''))
      .join('\n')

    // Enhance the definition by adding links to dependencies
    const dependencyNodes = Array.from(xmlDefinition.querySelectorAll('Dependency'))
    const fullDefinition = dependencyNodes.reduce((result, dependencyNode) => {
      const rawPath = dependencyNode.getAttribute('path')

      // For now, we can't resolve abstract collection paths ("/jobs/*/income")
      if (rawPath.includes('*')) {
        return result
      }
      // but we can resolve relative paths ("../income")
      const abstractPath = rawPath.replace('..', this.abstractPath.replace(/\*\/.*/, '*'))
      const link = `<fact-link path="${abstractPath}" collectionId="${this.collectionId}">${rawPath}</fact-link>`
      return result.replace(`path="${rawPath}"`, `path="${link}"`)
    }, stringDefinition)

    const definitionElement = document.createElement('div')
    definitionElement.setAttribute('slot', 'definition')
    definitionElement.innerHTML = fullDefinition

    this.querySelector('[slot="definition"]')?.remove()
    this.append(definitionElement)
  }
}
customElements.define('audited-fact', AuditedFact)

class ConditionDetail extends HTMLElement {
  constructor () {
    super()
    this.renderListener = () => this.render()
    this._hideTimeout = null
  }

  connectedCallback () {
    this.conditionPath = this.getAttribute('condition-path')
    this.operator = this.getAttribute('condition-operator')
    this.abstractPath = this.getAttribute('abstract-path')

    this._popover = document.createElement('div')
    this._popover.className = 'condition-detail-popover'
    document.body.appendChild(this._popover)
    this._popover.addEventListener('mouseenter', () => clearTimeout(this._hideTimeout))
    this._popover.addEventListener('mouseleave', () => this._startHide())

    document.addEventListener('fg-update', this.renderListener)
    this.render()
  }

  disconnectedCallback () {
    document.removeEventListener('fg-update', this.renderListener)
    this._popover?.remove()
  }

  _startHide () {
    this._hideTimeout = setTimeout(() => this._popover.classList.remove('visible'), 150)
  }

  render () {
    const isHidden = this.parentElement?.classList.contains('hidden') ?? false
    const statusText = isHidden ? 'UNSET_CONDITION' : 'SET_CONDITION'
    const statusClass = isHidden ? 'condition-detail__status--hidden' : 'condition-detail__status--shown'

    let valueText = '(unavailable)'
    let completeText = ''
    if (window.factGraph) {
      try {
        const fact = window.factGraph.get(this.conditionPath)
        valueText = fact.hasValue ? fact.get.toString() : '(no value)'
        completeText = fact.complete ? 'complete' : 'incomplete'
      } catch (e) {
        valueText = '(error)'
      }
    }

    const pathHtml = this.abstractPath.includes('*')
      ? `<span class="condition-detail__path">${this.conditionPath}</span>`
      : `<fact-link path="${this.conditionPath}"><span class="condition-detail__path">${this.conditionPath}</span></fact-link>`

    this.innerHTML = `
      <span class="condition-detail__status ${statusClass}">${statusText}</span>
      ${pathHtml}
      <span class="condition-detail__value">${valueText}</span>
      <span class="condition-detail__complete">${completeText}</span>
      <button class="condition-detail__debug-btn" type="button">show definition</button>
    `

    this._popover.innerHTML = this._buildHumanReadable()
    this._popover.querySelectorAll('.hr-toggle-xml').forEach(btn => {
      btn.addEventListener('click', () => {
        this._popover.querySelector('.hr-fact').hidden = !this._popover.querySelector('.hr-fact').hidden
        this._popover.querySelector('.hr-xml-view').hidden = !this._popover.querySelector('.hr-xml-view').hidden
      })
    })

    const btn = this.querySelector('.condition-detail__debug-btn')
    btn.addEventListener('mouseenter', () => {
      clearTimeout(this._hideTimeout)
      const rect = btn.getBoundingClientRect()
      this._popover.style.top = `${rect.bottom + 4}px`
      this._popover.style.left = `${rect.left}px`
      this._popover.classList.add('visible')
    })
    btn.addEventListener('mouseleave', () => this._startHide())
  }

  _getFactLabel (rawAbstractPath) {
    const factNode = factDictionaryXml.querySelector(`Fact[path="${rawAbstractPath}"]`)
    const nameText = factNode?.querySelector('Name')?.textContent?.trim()
    if (nameText) return nameText
    const segment = rawAbstractPath.split('/').filter(Boolean).pop() ?? rawAbstractPath
    return segment.replace(/([A-Z])/g, ' $1').toLowerCase().trim()
  }

  _resolveAbstractPath (rawPath) {
    if (!rawPath.startsWith('..')) return rawPath
    const prefix = this.abstractPath.replace(/\*\/.*/, '*')
    return rawPath.replace('..', prefix)
  }

  _resolveConcretePath (rawPath, collectionId) {
    let p = this._resolveAbstractPath(rawPath)
    if (collectionId) p = p.replace('*', `#${collectionId}`)
    return p
  }

  _getDepValue (concretePath) {
    if (!concretePath || concretePath.includes('*')) return null
    try {
      const fact = window.factGraph.get(concretePath)
      return fact.hasValue ? { value: fact.get.toString(), complete: fact.complete } : null
    } catch { return null }
  }

  _renderDep (node, collectionId, { negated = false, isComplete = false } = {}) {
    const rawPath = node?.getAttribute('path')
    if (!rawPath) return ''
    const abstractPath = this._resolveAbstractPath(rawPath)
    const label = this._getFactLabel(abstractPath)
    const concrete = this._resolveConcretePath(rawPath, collectionId)
    const result = this._getDepValue(concrete)

    const pathSpan = `<span class="hr-dep-path" title="${rawPath}">${label}</span>`

    if (isComplete) {
      const answered = result !== null
      const chip = answered ? `<span class="hr-val hr-val--answered">${result.value}</span>` : ''
      return `<span class="hr-dep">${pathSpan} <span class="hr-qualifier">${answered ? 'has been answered' : 'has not been answered'}</span>${chip}</span>`
    }
    if (negated) {
      const chip = result ? `<span class="hr-val hr-val--secondary">${result.value}</span>` : ''
      return `<span class="hr-dep">${pathSpan} <span class="hr-qualifier">is false</span>${chip}</span>`
    }

    let chip = ''
    if (result) {
      const cls = result.value === 'true'
        ? 'hr-val--true'
        : result.value === 'false'
          ? 'hr-val--false'
          : 'hr-val--other'
      const incomplete = !result.complete ? ' <span class="hr-incomplete">(incomplete)</span>' : ''
      chip = ` <span class="hr-val ${cls}">${result.value}</span>${incomplete}`
    }
    return `<span class="hr-dep">${pathSpan}${chip}</span>`
  }

  _renderNode (node, collectionId) {
    if (!node || node.nodeType !== 1) return ''
    const tag = node.tagName
    const kids = Array.from(node.children)

    switch (tag) {
      case 'Derived':
        return this._renderNode(kids[0], collectionId)

      case 'Writable': {
        const type = kids[0]?.tagName ?? 'value'
        return `<span class="hr-writable">User-entered ${type}</span>`
      }

      case 'Any':
      case 'All': {
        const label = tag === 'Any' ? 'ANY of:' : 'ALL of:'
        const cls = tag === 'Any' ? 'hr-any' : 'hr-all'
        const rows = kids.map(c => `<li>${this._renderNode(c, collectionId)}</li>`).join('')
        return `<div class="hr-group ${cls}"><span class="hr-op">${label}</span><ul>${rows}</ul></div>`
      }

      case 'Not': {
        const child = kids[0]
        if (!child) return ''
        if (child.tagName === 'Dependency') return this._renderDep(child, collectionId, { negated: true })
        if (child.tagName === 'IsComplete') {
          return this._renderDep(child.children[0], collectionId, { isComplete: true, negated: true })
        }
        return `<div class="hr-not"><span class="hr-op hr-op--not">NOT:</span> ${this._renderNode(child, collectionId)}</div>`
      }

      case 'IsComplete':
        return this._renderDep(kids[0], collectionId, { isComplete: true })

      case 'Dependency':
        return this._renderDep(node, collectionId)

      case 'Switch': {
        const rows = kids.map(c => this._renderNode(c, collectionId)).join('')
        return `<div class="hr-switch">${rows}</div>`
      }

      case 'Case': {
        const when = node.querySelector('When')?.children[0]
        const then = node.querySelector('Then')?.children[0]
        return `<div class="hr-case"><span class="hr-kw">if</span> ${this._renderNode(when, collectionId)} <span class="hr-kw">→</span> ${this._renderNode(then, collectionId)}</div>`
      }

      case 'Equal': {
        const left = node.querySelector('Left')?.children[0]
        const right = node.querySelector('Right')?.children[0]
        return `${this._renderNode(left, collectionId)} <span class="hr-eq">=</span> ${this._renderNode(right, collectionId)}`
      }

      case 'True':
        return '<span class="hr-literal">always</span>'

      case 'String':
        return `<span class="hr-literal">"${node.textContent}"</span>`

      case 'Enum':
        return `<span class="hr-literal">${node.textContent}</span>`

      default:
        return `<span class="hr-unknown" title="unhandled: ${tag}">${tag}</span>`
    }
  }

  _buildHumanReadable () {
    const factDef = factDictionaryXml.querySelector(`Fact[path="${this.abstractPath}"]`)
    if (!factDef) return '<p class="hr-error">(fact not found in dictionary)</p>'

    const collectionId = this._extractCollectionId()

    let headerChip = ''
    try {
      const fact = window.factGraph.get(this.conditionPath)
      if (fact.hasValue) {
        const v = fact.get.toString()
        const cls = v === 'true' ? 'hr-val--true' : v === 'false' ? 'hr-val--false' : 'hr-val--other'
        headerChip = `<span class="hr-val ${cls}">${v}</span>`
      }
    } catch { /* fact may not be accessible */ }

    const body = this._renderNode(factDef.firstElementChild, collectionId)

    return `<div class="hr-fact">
      <div class="hr-fact-header">
        <span class="hr-fact-path">${this.conditionPath}</span>
        ${headerChip}
      </div>
      <div class="hr-body">${body}</div>
      <button class="hr-toggle-xml" type="button">Show XML</button>
    </div>
    <div class="hr-xml-view" hidden>
      <pre><code>${this._buildAnnotatedXml()}</code></pre>
      <button class="hr-toggle-xml" type="button">Show summary</button>
    </div>`
  }

  _buildAnnotatedXml () {
    const factDef = factDictionaryXml.querySelector(`Fact[path="${this.abstractPath}"]`)
    if (!factDef) return '(fact not found in dictionary)'

    const collectionId = this._extractCollectionId()

    // Serialize and escape the XML, mirroring AuditedFact.render() and Graph.debugFact()
    let xmlStr = XML_SERIALIZER.serializeToString(factDef)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .split('\n')
      .map((line, i) => i === 0 ? line : line.replace(/^ {4}/, ''))
      .join('\n')

    // Annotate each <Dependency> with its current value, matching debugFact's ⮕ annotation
    Array.from(factDef.querySelectorAll('Dependency')).forEach(dep => {
      const rawPath = dep.getAttribute('path')
      if (!rawPath) return

      const resolvedAbstract = rawPath.startsWith('..')
        ? rawPath.replace('..', this.abstractPath.replace(/\*\/.*/, '*'))
        : rawPath

      if (resolvedAbstract.includes('*')) return

      const concreteDep = collectionId
        ? resolvedAbstract.replace('*', `#${collectionId}`)
        : resolvedAbstract

      try {
        const fact = window.factGraph.get(concreteDep)
        const annotation = fact.hasValue
          ? ` ⮕ ${fact.get} (${fact.complete ? 'complete' : 'incomplete'})`
          : ' ⮕ (no value)'
        xmlStr = xmlStr.replace(`path="${rawPath}"`, `path="${rawPath}"${annotation}`)
      } catch (e) { /* path may not exist yet */ }
    })

    return xmlStr
  }

  _extractCollectionId () {
    const abstractSegs = this.abstractPath.split('/')
    const concreteSegs = this.conditionPath.split('/')
    for (const [i, abstractSeg] of abstractSegs.entries()) {
      if (abstractSeg === '*') {
        const [seg = ''] = concreteSegs.slice(i, i + 1)
        return seg.startsWith('#') ? seg.slice(1) : null
      }
    }
    return null
  }
}
customElements.define('condition-detail', ConditionDetail)

function trackSelectedFact () {
  const factPath = factSelect.value
  const collectionId = document.querySelector('#fact-collection-id').value
  if (factPath) {
    trackFact(factPath, collectionId)
    factSelect.value = ''
  }
}

// Add a fact to the audit panel to track
function trackFact (path, collectionId, setFocus = true) {
  const factPath = makeCollectionIdPath(path, collectionId)
  const auditedFactsList = document.querySelector('#audit-panel__fact-list')

  const existingFact = auditedFactsList.querySelector(`audited-fact[path="${factPath}"]`)
  if (existingFact) {
    return existingFact.scrollIntoView()
  }
  console.debug(`Tracking ${factPath}`)

  // Store the tracked fact in session storage so it persists across page reloads with forward/back navigation
  const storage = getAuditPanelStorage()
  const trackedFacts = storage.trackedFacts || []
  trackedFacts.push({ path, collectionId })
  setAuditPanelStorage('trackedFacts', trackedFacts)

  const auditedFact = document.createElement('audited-fact')
  auditedFact.setAttribute('path', path)
  auditedFact.setAttribute('collectionId', collectionId)

  auditedFactsList.appendChild(auditedFact)
  auditedFact.scrollIntoView()

  // Set focus to the newly added fact for accessibility, and remove the tabindex after focus is lost so the fact doesn't remain in the tab order unnecessarily
  if (setFocus) {
    auditedFact.setAttribute('tabindex', '-1')
    auditedFact.focus()

    auditedFact.addEventListener('focusout', () => {
      auditedFact.removeAttribute('tabindex')
    }, { once: true })
  }
}

function setFactOptions () {
  const paths = window.factGraph.paths().sort()
  const options = paths.map((path) => `<option path=${path}>${path}</option>`)
  document.querySelector('#fact-options').innerHTML = options
}

function makeCollectionIdPath (abstractPath, id) {
  return abstractPath.replace('*', `#${id}`)
}

async function copyFactGraphToClipboard () {
  const fg = window.factGraph.toJson()
  const status = document.getElementById('copy-fg-status')
  try {
    await navigator.clipboard.writeText(fg)
    status.classList.add('animate-success')
    status.onanimationend = () => {
      status.classList.remove('animate-success')
    }
  } catch (err) {
    console.error(`Failed to copy: ${err}`)
  }
}
window.copyFactGraphToClipboard = copyFactGraphToClipboard

// Enable audit mode
export function enable () {
  // This focus handling is a bit of a hack, but it ensures that the track facts in the audit panel are not stealing focus when navigating with the keyboard.
  document.documentElement.tabIndex = -1
  document.documentElement.focus()
  document.documentElement.addEventListener('focusout', () => {
    document.documentElement.removeAttribute('tabindex')
  }, { once: true })

  // Set up the audit to display on the page and display the open button
  document.querySelector('#audit-panel-styles').disabled = false
  document.querySelector('#audit-panel').classList.remove('hidden')
  openAuditPanelButton.classList.remove('hidden')

  // Set up adjustable width controls for the audit panel
  function initializeAdjustableWidth () {
    if (!auditPanel) {
      return () => {}
    }

    if (auditPanel.dataset.widthControlsInitialized === 'true' && typeof auditPanel.syncAuditPanelWidth === 'function') {
      return auditPanel.syncAuditPanelWidth
    }

    function getAuditPanelMaxWidth () {
      return Math.max(AUDIT_PANEL_MIN_WIDTH, Math.floor(window.innerWidth * AUDIT_PANEL_MAX_WIDTH_RATIO))
    }

    function clampAuditPanelWidth (width) {
      return Math.min(Math.max(width, AUDIT_PANEL_MIN_WIDTH), getAuditPanelMaxWidth())
    }

    function updateAuditPanelResizerAccessibility (width) {
      if (!auditPanelResizer) {
        return
      }

      const maxWidth = getAuditPanelMaxWidth()
      auditPanelResizer.setAttribute('aria-valuemin', String(AUDIT_PANEL_MIN_WIDTH))
      auditPanelResizer.setAttribute('aria-valuemax', String(maxWidth))
      auditPanelResizer.setAttribute('aria-valuenow', String(width))
      auditPanelResizer.setAttribute('aria-valuetext', `${width}px wide`)
    }

    function applyAuditPanelWidth (width, persist = true) {
      const nextWidth = clampAuditPanelWidth(width)
      document.documentElement.style.setProperty('--audit-panel-width', `${nextWidth}px`)
      updateAuditPanelResizerAccessibility(nextWidth)

      if (persist) {
        setAuditPanelStorage('width', nextWidth)
      }

      return nextWidth
    }

    function applyDefaultAuditPanelWidth () {
      document.documentElement.style.setProperty('--audit-panel-width', `${AUDIT_PANEL_DEFAULT_WIDTH}vw`)
      const fallbackWidth = Math.round(window.innerWidth * AUDIT_PANEL_DEFAULT_WIDTH / 100)
      const renderedWidth = Math.round(auditPanel.getBoundingClientRect().width) || fallbackWidth
      updateAuditPanelResizerAccessibility(clampAuditPanelWidth(renderedWidth))
    }

    function resizeAuditPanelBy (delta) {
      const currentWidth = Math.round(auditPanel.getBoundingClientRect().width)
      return applyAuditPanelWidth(currentWidth + delta)
    }

    function handleAuditPanelResizeKeydown (event) {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        resizeAuditPanelBy(-AUDIT_PANEL_KEYBOARD_STEP)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        resizeAuditPanelBy(AUDIT_PANEL_KEYBOARD_STEP)
      }
    }

    function handleAuditPanelResizerPointerDown (event) {
      if (event.button !== 0 || !auditPanelResizer) {
        return
      }

      event.preventDefault()
      auditPanelResizer.setPointerCapture(event.pointerId)
      document.body.classList.add('audit-panel-resizing')

      const handlePointerMove = (moveEvent) => {
        applyAuditPanelWidth(window.innerWidth - moveEvent.clientX)
      }

      const handlePointerUp = () => {
        auditPanelResizer.releasePointerCapture(event.pointerId)
        document.body.classList.remove('audit-panel-resizing')
        window.removeEventListener('pointermove', handlePointerMove)
        window.removeEventListener('pointerup', handlePointerUp)
      }

      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerup', handlePointerUp)
    }

    function syncAuditPanelWidth () {
      const storage = getAuditPanelStorage()
      if (typeof storage.width === 'number') {
        applyAuditPanelWidth(storage.width)
      } else {
        applyDefaultAuditPanelWidth()
      }
    }

    auditPanelResizer?.addEventListener('pointerdown', handleAuditPanelResizerPointerDown)
    auditPanelResizer?.addEventListener('keydown', handleAuditPanelResizeKeydown)
    window.addEventListener('resize', syncAuditPanelWidth)

    auditPanel.dataset.widthControlsInitialized = 'true'
    auditPanel.syncAuditPanelWidth = syncAuditPanelWidth

    return syncAuditPanelWidth
  }

  // Initialize the adjustable width controls and sync the width to storage or the default value
  const syncAuditPanelWidth = initializeAdjustableWidth()
  syncAuditPanelWidth()

  // Set up function to open the audit panel
  function openAuditPanel () {
    document.body.classList.add('audit-panel-open')
    setAuditPanelStorage('isOpen', true)
    closeAuditPanelButton.focus()
  }

  // Set up function to close the audit panel
  function closeAuditPanel () {
    document.body.classList.remove('audit-panel-open')
    setAuditPanelStorage('isOpen', false)
    openAuditPanelButton.focus()
  }

  // Set up function to close the audit panel with the escape key
  function handleAuditPanelKeydown (event) {
    if (event.key === 'Escape' && document.body.classList.contains('audit-panel-open')) {
      event.preventDefault()
      closeAuditPanel()
    }
  }

  // Add event listeners for opening and closing the audit panel, and for handling escape key presses to close the panel
  if (auditPanel?.dataset.visibilityControlsInitialized !== 'true') {
    openAuditPanelButton.addEventListener('click', openAuditPanel)
    closeAuditPanelButton.addEventListener('click', closeAuditPanel)
    document.addEventListener('keydown', handleAuditPanelKeydown)
    auditPanel.dataset.visibilityControlsInitialized = 'true'
  }

  // If the audit panel was previously open, make sure to open it again when navigating forward or backwards
  if (getAuditPanelStorage().isOpen) {
    document.body.classList.add('audit-panel-open')
  }

  // If there are any facts stored in session storage, make sure to add them back
  const storage = getAuditPanelStorage()
  if (storage.trackedFacts) {
    for (const fact of storage.trackedFacts) {
      trackFact(fact.path, fact.collectionId, false)
    }
  }

  // Add links to all the <fg-show>s
  const fgShows = document.querySelectorAll('fg-show')
  for (const fgShow of fgShows) {
    const factLink = document.createElement('fact-link')
    factLink.setAttribute('path', fgShow.path)
    factLink.append(fgShow.cloneNode())
    fgShow.parentElement.replaceChild(factLink, fgShow)
  }

  // Load fact paths once the fact graph is available (if it isn't already)
  if (!window.factGraph) {
    document.addEventListener('fg-load', setFactOptions)
  } else {
    setFactOptions()
  }

  // Set up the show conditions toggle
  const conditionsCheckbox = document.querySelector('#show-conditions')
  conditionsCheckbox.addEventListener('change', () => {
    setAuditPanelStorage('showConditions', conditionsCheckbox.checked)
    if (conditionsCheckbox.checked) {
      displayConditions()
    } else {
      hideConditions()
    }
  })

  // If the user had show conditions toggled on, make sure to show them and set up the listener for new collections added after page load
  if (getAuditPanelStorage().showConditions) {
    conditionsCheckbox.checked = true
    displayConditions()
    document.querySelectorAll('.fg-collection__add-item').forEach((element) => {
      element.addEventListener('click', () => {
        hideConditions()
        displayConditions()
      })
    })
  }
}

// Disable audit mode and clear all tracked facts and stored state
export function disable () {
  document.querySelector('#audit-panel-styles').disabled = true
  document.querySelector('#audit-panel').classList.add('hidden')
  openAuditPanelButton.classList.add('hidden')
  document.body.classList.remove('audit-panel-open')
  document.body.removeAttribute('style')
  sessionStorage.removeItem(AUDIT_PANEL_STORAGE_KEY)
  hideConditions()

  // Remove links from all the <fg-show>s
  const fgShows = document.querySelectorAll('fg-show')
  for (const fgShow of fgShows) {
    const link = fgShow.parentElement
    link.parentElement.replaceChild(fgShow, link)
  }
}

/* Attempt to load the Fact Graph and set a validation error if it fails
 *
 * It's important that this function either succeeds and triggers a new page load, or fails and sets
 * a validation message. Otherwise the form will attempt to "submit," accomplishing nothing. It
 * works this way because the custom validation message has to be set before the 'submit' event
 * fires (as far as I can tell).
 */
function loadFactGraphFromAuditPanel () {
  const textarea = document.querySelector('#load-fact-graph')
  const formGroup = textarea.closest('.usa-form-group')
  const label = formGroup.querySelector('.usa-label')
  let errorMessage = formGroup.querySelector('#load-fact-graph-error')

  try {
    window.loadFactGraph(textarea.value)
    if (errorMessage) {
      errorMessage.remove()
      textarea.classList.remove('usa-input--error')
      textarea.removeAttribute('aria-describedby')
      label.classList.remove('usa-label--error')
      formGroup.classList.remove('usa-form-group--error')
    }
  } catch (error) {
    const errorMessageId = 'load-fact-graph-error'
    if (!errorMessage) {
      errorMessage = document.createElement('span')
      errorMessage.id = errorMessageId
      errorMessage.className = 'usa-error-message'
      label.after(errorMessage)
      errorMessage.innerText = 'Enter a valid JSON'
      label.classList.add('usa-label--error')
      textarea.classList.add('usa-input--error')
      textarea.setAttribute('aria-describedby', errorMessageId)
      formGroup.classList.add('usa-form-group--error')
      textarea.focus()
    }
  }
}
window.loadFactGraphFromAuditPanel = loadFactGraphFromAuditPanel
