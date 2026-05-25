import { factGraph, saveFactGraph } from './fg-fact-graph.js'
import { configureCollectionIds, makeCollectionIdPath, generateUUID } from './fg-collection-utils.js'
import { checkCondition } from './fg-conditions.js'

/*
 * <fg-collection> - Expandable collection list
 */
class FgCollection extends HTMLElement {
  constructor () {
    super()

    // Make listener a persistent function so we can remove it later
    this.addItemListener = () => this.addItem()

    this.boundUpdateAddItemButton = () => {
      if (this.getAddItemIfTruePath()) {
        this.updateAddItemButton()
      }
    }

    this.setCollectionItemNumbers = () => {
      const collectionItems = this.querySelectorAll('fg-collection-item')
      collectionItems.forEach((item, index) => {
        const itemNumberSlot = item.querySelectorAll('.collection-item-number')
        if (itemNumberSlot) {
          itemNumberSlot.forEach(slot => { slot.textContent = `#${index + 1}` })
        }
      })
    }
  }

  /** Flow `add-item-if-true` on `<fg-collection>`: fact path that must be true (or incomplete) to allow adding a row. */
  getAddItemIfTruePath () {
    const p = this.getAttribute('data-add-item-if-true')
    return p && p.length > 0 ? p : null
  }

  /**
   * Disable "Add …" when the configured fact is complete false. If incomplete, keep enabled (same
   * as isTrue UX without blocking mid-edit).
   */
  updateAddItemButton () {
    const factPath = this.getAddItemIfTruePath()
    if (!factPath) return
    const btn = this.querySelector('.fg-collection__add-item')
    if (!btn) return
    try {
      const r = factGraph.get(factPath)
      const allow = !r.hasValue || r.get === true
      btn.disabled = !allow
      btn.setAttribute('aria-disabled', String(!allow))
    } catch (e) {
      console.error(`Error updating collection add button (${factPath}):\n`, e)
      btn.disabled = false
      btn.setAttribute('aria-disabled', 'false')
    }
  }

  connectedCallback () {
    this.path = this.getAttribute('path')
    this.addItemButton = this.querySelector('.fg-collection__add-item')
    this.addItemButton.addEventListener('click', this.addItemListener)

    if (this.getAddItemIfTruePath()) {
      document.addEventListener('fg-update', this.boundUpdateAddItemButton)
    }

    // Add any items that currently exist in this collection
    const ids = factGraph.getCollectionIds(this.path)
    ids.map(id => this.addItem(id))

    // If disallowempty="true" and no items, add one
    if (this.getAttribute('disallowempty') === 'true' && this.querySelectorAll('fg-collection-item').length === 0) {
      this.addItem()
    }

    // Qualifying Children: cohort must enter at least one EITC QC (Single/QSS/MFJ age; MFS; HOH
    // married or unmarried outside 25–64; claiming QCs).
    // Seed one empty row on first paint when this collection uses add-item-if-true (QC household).
    if (this.getAddItemIfTruePath() && this.querySelectorAll('fg-collection-item').length === 0) {
      try {
        if (checkCondition('/flowCohortEitcRequiresQualifyingChildEntry', 'isTrue')) {
          this.addItem()
        }
      } catch (e) {
        console.error('Error seeding default household row for required-QC cohort:\n', e)
      }
    }

    if (this.getAddItemIfTruePath()) {
      this.updateAddItemButton()
    }
  }

  disconnectedCallback () {
    if (this.getAddItemIfTruePath()) {
      document.removeEventListener('fg-update', this.boundUpdateAddItemButton)
    }
    this.addItemButton.removeEventListener('click', this.addItemListener)
  }

  addItem (id) {
    const addIfPath = this.getAddItemIfTruePath()
    if (!id && addIfPath) {
      try {
        const r = factGraph.get(addIfPath)
        if (r.hasValue && r.get === false) return
      } catch (e) {
        console.error('Error checking collection add-item-if-true fact:\n', e)
      }
    }

    const collectionId = id ?? generateUUID()

    if (!id) {
      factGraph.addToCollection(this.path, collectionId)
      saveFactGraph()
    }

    const collectionItem = document.createElement('fg-collection-item')
    collectionItem.setAttribute('collectionPath', this.path)
    collectionItem.setAttribute('collectionId', collectionId)
    const collectionItemsContainer = this.querySelector('.fg-collection__item-container')
    collectionItemsContainer.appendChild(collectionItem)
    const collectionItemButton = collectionItem.querySelector('summary')

    const detailsElement = collectionItem.querySelector('details')
    if (detailsElement) {
      detailsElement.open = true
    }

    collectionItemButton?.focus()
    document.dispatchEvent(new CustomEvent('fg-update'))
  }
}
customElements.define('fg-collection', FgCollection)

class FgCollectionItem extends HTMLElement {
  constructor () {
    super()

    // Make listener a persistent function so we can remove it later
    this.clearListener = () => this.clear()
  }

  connectedCallback () {
    console.debug('Connecting', this)

    // Get our template from the parent fg-collection
    const fgCollection = this.closest('fg-collection')
    const templateContent = fgCollection.querySelector('.fg-collection__item-template').content.cloneNode(true)

    const collectionId = this.getAttribute('collectionId')
    configureCollectionIds(templateContent, collectionId)

    this.append(templateContent)

    // Set up collection item detail IDs to enable interactions
    const collectionItemButton = this.querySelector('.fg-collection__item-container summary')
    const collectionItemContent = this.querySelector('.fg-collection__item-container details')
    collectionItemButton.setAttribute('aria-controls', `collection-item-${collectionId}`)
    collectionItemContent.setAttribute('id', `collection-item-${collectionId}`)

    // Open the details element by default.
    if (collectionItemContent.open === false) {
      collectionItemContent.open = true
    }

    this.removeButton = this.querySelector('.fg-collection-item__remove-item')
    const modalId = this.removeButton.getAttribute('for')
    // Make listener a persistent function so that we can remove it later
    this.clickRemoveItemListener = () => this.handleClickRemoveItem(modalId)
    this.removeButton.addEventListener('click', this.clickRemoveItemListener)

    document.addEventListener('fg-clear', this.clearListener)

    // Set collection item numbers
    fgCollection.setCollectionItemNumbers()
  }

  disconnectedCallback () {
    console.debug('Disconnecting', this)

    this.removeButton.removeEventListener('click', this.clickRemoveItemListener)
    document.removeEventListener('fg-clear', this.clearListener)

    // Reset content
    this.innerHTML = ''
  }

  handleClickRemoveItem (modalId) {
    // Override the corresponding modal's onclick to remove this collection item
    const modal = document.querySelector(`#${modalId}`)
    const confirmButton = modal.querySelector('.fg-collection__remove-item-modal__button-confirm')
    confirmButton.onclick = () => {
      const fgCollection = this.closest('fg-collection')
      const addButton = fgCollection.querySelector('.fg-collection__add-item')

      this.clear()
      addButton.focus()
    }
  }

  clear () {
    for (const fgSet of this.querySelectorAll('fg-set')) {
      fgSet.remove()
    }

    const fgCollection = this.closest('fg-collection')
    const collectionPath = this.getAttribute('collectionPath')
    const collectionId = this.getAttribute('collectionId')
    factGraph.delete(makeCollectionIdPath(`${collectionPath}/*`, collectionId))
    factGraph.removeFromCollection(collectionPath, collectionId)
    saveFactGraph()

    // Remove this element and its parent fieldset from the DOM after removing the item from the fact graph
    this.remove()
    fgCollection.setCollectionItemNumbers()
    document.dispatchEvent(new CustomEvent('fg-update'))
  }
}
customElements.define('fg-collection-item', FgCollectionItem)

class FgWithholdingAdjustments extends HTMLElement {
  constructor () {
    super()
    this.updateListener = () => this.render()
  }

  connectedCallback () {
    this.path = this.getAttribute('path')
    this.render()
  }

  render () {
    const collectionIds = factGraph.getCollectionIds(this.path)
    collectionIds.forEach(collectionId => this.renderJob(collectionId))
  }

  renderJob (collectionId) {
    const fgWithholdingAdjustments = this.closest('fg-withholding-adjustments')
    const templateContent = fgWithholdingAdjustments.querySelector('.fg-withholding-adjustment__template').content.cloneNode(true)
    configureCollectionIds(templateContent, collectionId)
    this.append(templateContent)
  }
}
customElements.define('fg-withholding-adjustments', FgWithholdingAdjustments)
