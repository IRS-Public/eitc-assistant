import * as fg from '../vendor/fact-graph/factgraph-3.1.0.js'
import { factGraph, saveFactGraph } from './fg-fact-graph.js'
import { showOrHideAllElements } from './fg-conditions.js'

class FgSet extends HTMLElement {
  constructor () {
    super()

    this.DEFAULT_ERROR_ELEMENT_ID = 'errors.Default'

    this.tabListener = (event) => {
      // Conditions must be re-evaluated before the keydown event resolves, so that focusable
      // elements are updated before the focus moves. The `blur` and `change` events don't fire
      // until *after* the focus has already moved.
      if (event.key === 'Tab') {
        // TODO: Prevent these from being called twice (once here, once through onChange)
        this.setFact()
        showOrHideAllElements()
      }
    }
  }

  connectedCallback () {
    this.condition = this.getAttribute('condition')
    this.operator = this.getAttribute('operator')
    this.inputType = this.getAttribute('inputtype')
    this.inputs = this.querySelectorAll('input, select')
    this.optional = this.getAttribute('optional') === 'true'

    switch (this.inputType) {
      // This switch statement is intentionally not exhaustive
      case 'date': {
        this.addEventListener('change', () => {
          const allFilled = Array.from(this.inputs).every(input => {
            return input.value.trim() !== '' && input.value !== '- Select -'
          })

          if (allFilled) {
            this.onChange()
          }
        })

        break
      }
      case 'dollar':
        this.addEventListener('input', () => {
          this.onChange()
        })
        break
      case 'select':
      case 'boolean':
      case 'enum':
      case 'multi-enum':
        for (const input of this.inputs) {
          input.addEventListener('change', () => {
            this.onChange()
            // Clear validation error once user makes a selection
            this.clearValidationError()
          })
        }
        break
      default:
        for (const input of this.inputs) {
          input.addEventListener('blur', () => this.onChange())
          input.addEventListener('keydown', this.tabListener)
        }
    }

    this.path = this.getAttribute('path')
    this.error = null

    console.debug(`Adding fg-set with path ${this.path} of inputType ${this.inputType}`)

    // This is done with bind, rather than an arrow function, so that it can be removed later
    this.clear = this.clear.bind(this)
    document.addEventListener('fg-clear', this.clear)

    this.render()
  }

  disconnectedCallback () {
    console.debug(`Removing fg-set with path ${this.path}`)
    document.removeEventListener('fg-clear', this.clear)
  }

  clearAlerts () {
    this.querySelector('div.alert--warning')?.remove()
  }

  clearValidationError () {
    const errorElement = this.querySelector('.usa-error-message')
    const errorId = errorElement?.id

    // Remove errorId from aria-describedby
    const elementWithDescription = this.querySelector('[aria-describedby]')
    const ariaDescription = elementWithDescription?.getAttribute('aria-describedby')

    if (elementWithDescription) {
      const updatedIds = ariaDescription
        .split(' ')
        .filter(id => id.trim() && id !== errorId)
        .join(' ')

      updatedIds
        ? elementWithDescription.setAttribute('aria-describedby', updatedIds)
        : elementWithDescription.removeAttribute('aria-describedby')
    }

    // Remove the error treatment
    errorElement?.remove()
    this.querySelector('.validate-alert')?.remove()
    this.querySelector('.usa-form-group')?.classList.remove('usa-form-group--error')
    this.querySelector('.usa-label--error')?.classList.remove('usa-label--error')
    this.querySelectorAll('.usa-input-group, .usa-select, .usa-input').forEach(item => {
      item.classList.remove('usa-input--error')
      item.removeAttribute('aria-describedby')
    })
    this.querySelectorAll('.usa-input[aria-invalid="true"], .usa-select[aria-invalid="true"]').forEach(item => item?.setAttribute('aria-invalid', 'false'))
  }

  setValidationError (errorText) {
    this.clearValidationError()
    const errorId = `${this.path}-error` // Keep the slash for primary filer

    // Set up the error div
    const errorDiv = document.createElement('div')
    errorDiv.classList.add('usa-error-message')
    errorDiv.setAttribute('id', errorId)
    errorDiv.textContent = errorText

    const elementWithDescription = this.querySelector('.usa-fieldset, .usa-select, .usa-input')
    const errorLocation = this.querySelector('.usa-radio, .usa-memorable-date, .usa-checkbox, .usa-select, .usa-input-group, .usa-input')

    // Place the error div just before the invalid field location
    errorLocation.insertAdjacentElement('beforebegin', errorDiv)

    // If the element is inside of a closed accordion, open it
    const detailsContent = this.closest('details')
    if (detailsContent && detailsContent.open === false) {
      detailsContent.open = true
    }

    // Set aria-description
    const existingAriaDescribedby = elementWithDescription.getAttribute('aria-describedby')
    elementWithDescription.setAttribute('aria-describedby', `${existingAriaDescribedby || ''} ${errorId}`.trim())

    // Set the modifier classes for errors
    this.querySelector('.usa-form-group')?.classList.add('usa-form-group--error')
    this.querySelector('.usa-legend, .usa-label')?.classList.add('usa-label--error')
    this.querySelectorAll('.usa-input-group, .usa-select, .usa-input').forEach(item => {
      item.classList.add('usa-input--error')
      item.setAttribute('aria-describedby', `${errorId}`)
    })
    this.querySelectorAll('.usa-input[aria-invalid="false"], .usa-select[aria-invalid="false"]').forEach(item => {
      item.setAttribute('aria-invalid', 'true')
    })
  }

  validateRequiredFields () {
    const isMissing = !this.isComplete()
    if (isMissing) {
      this.setValidationError('This question is required')
    } else {
      this.clearValidationError()
    }
    return isMissing
  }

  render () {
    this.setInputValueFromFactValue()
  }

  onChange () {
    const proposedValue = this.getFactValueFromInputValue()
    const beforeCommit = new CustomEvent('fg-set-before-commit', {
      bubbles: true,
      cancelable: true,
      detail: { path: this.path, proposedValue }
    })
    this.dispatchEvent(beforeCommit)
    if (beforeCommit.defaultPrevented) {
      this.setInputValueFromFactValue()
      return
    }
    try {
      const res = this.setFact()
      if (res.errorType) {
        const errorTextKey = `errors.${res.errorName}`
        const errorElement = document.getElementById(errorTextKey) || document.getElementById(this.DEFAULT_ERROR_ELEMENT_ID)
        const errorText = errorElement.innerText + ' ' + (res.expectedValue || '')
        this.setValidationError(errorText)
      } else {
        this.clearValidationError()
      }
    } catch (error) {
      this.setValidationError(error.message)
    }
  }

  isComplete () {
    return factGraph.get(this.path).complete
  }

  clear () {
    switch (this.inputType) {
      case 'boolean':
      case 'enum': {
        const checkedRadio = this.querySelector('input:checked')
        if (checkedRadio) {
          checkedRadio.checked = false
        };
        break
      }
      case 'multi-enum': {
        const checkedBoxes = this.querySelectorAll('input:checked')
        for (const checkbox of checkedBoxes) {
          checkbox.checked = false
        }
        break
      }
      case 'select': {
        this.querySelector('select').value = ''
        break
      }
      case 'text':
      case 'date': {
        this.querySelector('select[name*="-month"]').value = ''
        this.querySelector('input[name*="-day"]').value = ''
        this.querySelector('input[name*="-year"]').value = ''
        break
      }
      case 'int':
      case 'dollar': {
        this.querySelector('input').value = ''
        break
      }
      default: {
        console.warn(`Unknown input type "${this.inputType}" for input with path "${this.path}"`)
      }
    }

    // Clear error and alerts
    this.error = null
    this.clearAlerts()
    this.clearValidationError()
  }

  setInputValueFromFactValue () {
    console.debug(`Setting input value for ${this.path} of type ${this.inputType}`)
    const fact = factGraph.get(this.path)

    let value
    if (fact.complete === false) {
      value = ''
    } else {
      value = fact.get?.toString()
    }

    switch (this.inputType) {
      case 'boolean':
      case 'enum': {
        if (value !== '') {
          // Quoted value + CSS.escape so numeric values (e.g. 2024) are valid selectors
          const input = this.querySelector(`input[value="${CSS.escape(value)}"]`)
          if (input) input.checked = true
        }
        break
      }
      case 'multi-enum': {
        // MultiEnum stores Set of values - convert from Scala Set to JS Set
        const selectedValues = fact.hasValue ? fg.scalaSetToJsSet(fact.get.getValue()) : new Set()
        const checkboxes = this.querySelectorAll('input[type="checkbox"]')
        for (const checkbox of checkboxes) {
          checkbox.checked = selectedValues.has(checkbox.value)
        }
        break
      }
      case 'select': {
        this.querySelector('select').value = value
        break
      }
      case 'text':
      case 'int': {
        this.querySelector('input').value = value
        break
      }
      case 'date': {
        const monthSelect = this.querySelector('select[name*="-month"]')
        const dayInput = this.querySelector('input[name*="-day"]')
        const yearInput = this.querySelector('input[name*="-year"]')

        if (value) {
          // When the fact has all three fields filled out, set it up
          const [year, month, day] = value.split('-')
          monthSelect.value = month
          dayInput.value = day
          yearInput.value = year
        } else if (!monthSelect.value && !dayInput.value && !yearInput.value) {
          // Only clear if the inputs are truly empty (not just fact incomplete)
          // This preserves partial user input during fg-update events
          monthSelect.value = ''
          dayInput.value = ''
          yearInput.value = ''
        }
        break
      }
      case 'dollar': {
        this.querySelector('input').value = value
        break
      }
      default: {
        console.warn(`Unknown input type "${this.inputType}" for input with path "${this.path}"`)
      }
    }
  }

  getFactValueFromInputValue () {
    console.debug(`Getting input value for ${this.path} of type ${this.inputType}`)
    switch (this.inputType) {
      case 'boolean':
      case 'enum': {
        return this.querySelector('input:checked')?.value
      }
      case 'multi-enum': {
        // Collect all checked checkbox values into Set, convert to Scala Set, wrap in MultiEnum
        const checkboxes = this.querySelectorAll('input[type="checkbox"]:checked')
        const values = new Set(Array.from(checkboxes).map(cb => cb.value))
        // Return null if empty (not empty Set) to match optional field semantics
        return values.size > 0 ? fg.MultiEnum(fg.jsSetToScalaSet(values), '') : null
      }
      case 'select': {
        return this.querySelector('select')?.value
      }
      case 'date': {
        const month = this.querySelector('select[name*="-month"]')?.value
        const day = this.querySelector('input[name*="-day"]')?.value
        const year = this.querySelector('input[name*="-year"]')?.value
        // Adding padStart to day changes user's input from 1 to 01
        return `${year}-${month}-${day.padStart(2, '0')}`
      }
      case 'text':
      case 'int':
      case 'dollar': {
        return this.querySelector('input')?.value
      }
      default: {
        console.warn(`Unknown input type "${this.inputType}" for input with path "${this.path}"`)
        return undefined
      }
    }
  }

  setFact () {
    console.debug(`Setting fact ${this.path}`)
    const value = this.getFactValueFromInputValue()

    let res = {}
    if (value === '' || value === null) {
      console.debug('Value was blank, deleting fact')
      factGraph.delete(this.path)
    } else {
      res = factGraph.set(this.path, value)
    }

    saveFactGraph()
    document.dispatchEvent(new CustomEvent('fg-update'))
    return res
  }

  /**
   * Deletes the current fact without sending fg-update.
   *
   * Used when processing the fg-update event to delete facts that are no longer visible. It will
   * be called multiple times per fg-update because deleting some facts may trigger others to be
   * deleted. It does not dispatch fg-update itself because that would throw off unnecessary events.
   */
  deleteFactNoUpdate () {
    console.debug(`Deleting fact ${this.path}`)

    switch (this.inputType) {
      case 'boolean':
      case 'enum': {
        const input = this.querySelector('input:checked')
        if (input) input.checked = false
        break
      }
      case 'multi-enum': {
        const checkboxes = this.querySelectorAll('input[type="checkbox"]:checked')
        for (const checkbox of checkboxes) {
          checkbox.checked = false
        }
        break
      }
      case 'select': {
        this.querySelector('select').value = ''
        break
      }
      case 'text':
      case 'date':
      case 'int':
      case 'dollar': {
        this.querySelector('input').value = ''
        break
      }
      default: {
        console.warn(`Unknown input type "${this.inputType}" for input with path "${this.path}"`)
      }
    }
    factGraph.delete(this.path)
    saveFactGraph()
  }
}
customElements.define('fg-set', FgSet)
