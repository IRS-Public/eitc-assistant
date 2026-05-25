export function focusKnockoutAlert (knockoutAlert) {
  const heading = knockoutAlert.querySelector('.usa-alert__heading')
  const target = heading ?? knockoutAlert
  target.scrollIntoView({ behavior: 'instant', block: 'center' })
  target.setAttribute('tabindex', '-1')
  target.focus()
  target.addEventListener('blur', () => {
    target.removeAttribute('tabindex')
  }, { once: true })
}

export function showValidationError () {
  // Target custom class validate-alert
  const existingAlert = document.querySelector('.validate-alert')
  if (existingAlert) {
    existingAlert.remove()
  }
  // Clone the alert
  const template = document.getElementById('validate-alert-template')
  const alertElement = template.content.cloneNode(true)
  const mainContent = document.getElementById('main-content')
  // Place the alert at the top of the main content
  mainContent.insertBefore(alertElement, mainContent.firstChild)

  // Focus the first invalid field
  const firstErrorFocusTarget = document.querySelector(
    'fg-alert[blocking]:not(.hidden) :is(.usa-alert__heading, .usa-alert__text),' +
    'fg-set:not(.hidden) .usa-form-group--error .usa-fieldset,' +
    'fg-set:not(.hidden) [aria-invalid="true"]'
  )

  firstErrorFocusTarget.scrollIntoView({ behavior: 'instant', block: 'center' })
  if (firstErrorFocusTarget instanceof HTMLFieldSetElement || firstErrorFocusTarget.closest('fg-alert')) {
    firstErrorFocusTarget.setAttribute('tabindex', '-1')
    firstErrorFocusTarget.focus()

    // Remove tabindex after focus to prevent outline from appearing on subsequent clicks
    firstErrorFocusTarget.addEventListener('blur', () => {
      firstErrorFocusTarget.removeAttribute('tabindex')
    }, { once: true })
  } else { firstErrorFocusTarget.focus() }
}

export function validateSectionForNavigation () {
  const fgSets = document.querySelectorAll('fg-set:not(.hidden)')
  const missingFields = []
  let hasValidationErrors = false

  // Loop through fields and mark incomplete if empty and required
  for (const fgSet of fgSets) {
    // It's only blocking if it's not optional, not complete, and not the child of a hidden element
    if (!fgSet.optional && !fgSet.isComplete() && !fgSet.closest('.hidden')) {
      const fieldName = fgSet.path
      missingFields.push(fieldName)
      if (!fgSet.validateRequiredFields()) {
        hasValidationErrors = false
      }
    }
  }
  // Display validation error if there are missing fields/incomplete
  if (missingFields.length > 0 || hasValidationErrors) {
    showValidationError()
    return false
  }

  const knockoutAlert = document.querySelector('fg-alert[knockout="true"]:not(.hidden)')
  if (knockoutAlert) {
    focusKnockoutAlert(knockoutAlert)
    return false
  }

  return true
}
