export const showComments = (values) => (values.name !== '')

export const showDropdownOptions = (values) => (showComments(values) && values.comments !== '')

export const showAmount = (values) => (showDropdownOptions(values) && values.dropdownOptions !== '')

export const showRadioOptions = (values) => (showAmount(values) && values.amount !== '')

export const showCheckboxOptions = (values) => (showRadioOptions(values) && values.radioOptions !== '')

export const showDateField = (values) => (showCheckboxOptions(values) && values.checkboxOptions.length > 0)
