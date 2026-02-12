import React from 'react'
import clsx from 'clsx'
import { ErrorMessage } from 'formik'
import HelpTipBody from '../HelpTip/HelpTipBody'
import HelpTipButton from '../HelpTip/HelpTipButton'
import TextError from '../TextError'
import ConditionalCheckboxFields from './ConditionalCheckboxFields'

const CheckboxGroup = (props) => {
  const {
    label,
    name,
    required = false,
    helpTip,
    hintText,
    options,
    show = true,
    className,
    pushObject,
    placeholder,
    boldLabel = false,
    addBtnText = 'global.button.addAnother',
    ...rest } = props

  return (
    <div
      className={clsx(
        'mt-6 fade-in',
        show ? 'block' : 'hidden'
      )}
    >
      <label htmlFor={name}>
        {boldLabel ? <span className="font-bold">{label}</span> : label} {required
          && <span className="text-red-500 ml-1">*</span>}

        {helpTip && (
          <HelpTipButton
            page={helpTip.page}
            expanded={helpTip.expanded}
            dataTestID={`${name}HelpTip`}
            name={name}
            aria-label={helpTip.ariaLabel}
            gaLabel={helpTip.gaLabel ? helpTip.gaLabel : helpTip.ariaLabel}
          />
        )}
      </label>

      {helpTip && (
        <HelpTipBody
          id={`${name}-helpTip`}
          tabIndex="0"
          expanded={helpTip.expanded}
          elements={helpTip.elements()}
        />
      )}

      {hintText && (
        <span className="block text-gray-600 mt-1 text-sm">{hintText}</span>
      )}

      <fieldset>
        <ConditionalCheckboxFields
          addBtnText={addBtnText}
          name={name}
          options={options}
          pushObject={pushObject}
          className={className}
          {...rest}
        />
      </fieldset>

      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default CheckboxGroup
