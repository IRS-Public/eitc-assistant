import React from 'react'
import { useFormikContext, getIn } from 'formik'
import clsx from 'clsx'
import HelpTipButton from '../HelpTip/HelpTipButton'
import HelpTipBody from '../HelpTip/HelpTipBody'
import HTMLBuilder from '../HtmlBuilder'
import Radio from './Radio'
import Replacement from '../HtmlBuilder/Replacement'
import TextError from '../TextError'

const RadioGroup = (props) => {
  const { label, name, id, onFocus, disabled = false, required = false, helpTip, hintText, dataTestId, options, replacements = [], labelHTMLElements = [], horizontal = false, show = true, onClick, onChange, touchedfield, className, ...rest } = props
  const { errors, touched } = useFormikContext()

  return (
    <div
      id={id}
      className={clsx(
        'fade-in',
        show ? 'block' : 'hidden'
      )}
      data-class="qualificationQuestions"
    >
      <fieldset className={className} id={name} >
        <label htmlFor={name} id={`${name}-label`} data-testid={`${dataTestId}-label`} aria-label={`${label}${required ? '*' : ''}`}
        >
          <Replacement text={label} replace={replacements} />{required && <span className="text-red-500 ml-1">*</span>}
          {labelHTMLElements.length > 0 && <HTMLBuilder elements={labelHTMLElements} />}
          {helpTip && (
            <HelpTipButton
              page={helpTip.page}
              expanded={helpTip.expanded}
              dataTestID={`${name}HelpTip`}
              name={name}
              aria-label={helpTip.ariaLabel}
              gaLabel={helpTip.gaLabel && helpTip.gaLabel}
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

        <Radio
          name={name}
          options={options}
          onChange={onChange}
          onClick={onClick}
          onFocus={onFocus}
          disabled={disabled}
          horizontal={horizontal}
          dataTestId={dataTestId}
          questionLabel={label}
          {...rest}
        />

        {getIn(errors, name) && getIn(touched, name) && (
          <TextError
            id={`${name}-error-message`}
            data-testid={`${name}-error`}
          >
            {getIn(errors, name)}
          </TextError>
        )}
      </fieldset>
    </div>
  )
}

export default RadioGroup
