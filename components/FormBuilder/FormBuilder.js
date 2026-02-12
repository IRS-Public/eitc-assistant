import React from 'react'
import AutoComplete from '../AutoComplete'
import CurrencyField from '../CurrencyField'
import Dropdown from '../Dropdown'
import TextField from '../TextField'
import TextArea from '../TextArea'
import Counter from '../Counter'
import DateField from '../DateField'
import DateFieldRange from '../DateFieldRange'
import RadioGroup from '../Radio/RadioGroup'
import CheckboxGroup from '../Checkbox/CheckboxGroup'
import ConditionalCheckboxGroup from '../ConditionalCheckbox/ConditionalCheckboxGroup'
import SSNField from '../SSNField/SSNField'
import Heading from '../Heading'
import PhoneField from '../PhoneField'
import HtmlBuilder from '../HtmlBuilder'
import CurrencyFieldArray from '../CurrencyFieldArray'
import Alert from '../Alert'

const FormBuilder = ({ options, onFocus, disabled}) => {

  const formItems = options.map((option, index) => {
    const fieldOptions = { ...option }
    delete fieldOptions.inputType

    switch (option.inputType) {
      case 'textField':
        return <TextField key={index}
        onFocus={onFocus} 
        {...fieldOptions} />
      case 'textArea':
        return <TextArea key={index} {...fieldOptions} />
      case 'dropdown':
        return <Dropdown key={index} {...fieldOptions} />
      case 'autoComplete':
        return <AutoComplete key={index} {...fieldOptions} />
      case 'currencyField':
        return <CurrencyField key={index} {...fieldOptions} />
      case 'currencyFieldArray':
        return <CurrencyFieldArray key={index} {...fieldOptions} />
      case 'radio':
        return <RadioGroup key={index} onFocus = {onFocus} disabled={disabled} {...fieldOptions} />
      case 'checkbox':
        return <CheckboxGroup key={index} {...fieldOptions} />
      case 'conditionalCheckbox':
        return <ConditionalCheckboxGroup key={index} {...fieldOptions} />
      case 'ssnField':
        return <SSNField key={index} {...fieldOptions} />
      case 'counter':
        return <Counter key={index} {...fieldOptions} />
      case 'dateField':
        return <DateField key={index} {...fieldOptions} />
      case 'dateRange':
        return <DateFieldRange key={index} {...fieldOptions} />
      case 'phoneField':
        return <PhoneField key={index} {...fieldOptions} />
      case 'htmlBuilder':
        return <HtmlBuilder key={index} {...fieldOptions} />
      case 'alert':
        return <Alert key={index} {...fieldOptions}><HtmlBuilder elements={fieldOptions.elements()} /></Alert>
      case 'breakFlex':
        return fieldOptions.show ? <div key={index} className="min-w-full"></div> : null
      case 'emptySpace':
        return <div key={index} className={option.className}></div>
      case 'heading':
        return (
          <Heading
            key={index}
            {...fieldOptions}
            level={fieldOptions.level}
            className={fieldOptions.className}
          >
            {fieldOptions.text}
          </Heading>
        )
      default:
        return null
    }
  })

  return (
    <>
      {formItems}
    </>
  )
}

export default FormBuilder
