import PropTypes from 'prop-types';
import React from 'react'
import { Field } from 'formik'
import CurrencyFormat from 'react-currency-input-field'
import clsx from 'clsx'
import HelpTipBody from '../HelpTip/HelpTipBody'
import HelpTipButton from '../HelpTip/HelpTipButton'
import TextError from '../TextError'

const NumericSearchField = (props) => {
  const {
    btnAriaLabel,
    helpTip,
    hintText,
    label,
    name,
    placeholder,
    required = false,
    show = true,
    maxLength = 4,
    onClick,
    onKeyDown,
    disabled,
    secondary = false,
    touched,
    buttonText,
    onChange,
    ...rest
  } = props

  let classes

  if (disabled && !secondary) {
    classes = clsx(
      'bg-gray-600 border-2 border-gray-600 cursor-not-allowed text-white leading-relaxed',
      'px-4 h-10 rounded-r-sm text-black uppercase w-auto'
    )
  } else if (disabled && secondary) {
    classes = clsx(
      'border-2 bg-white border-gray-600 text-gray-600 leading-relaxed',
      'uppercase h-10 px-4 w-auto rounded-r-sm',
    )
  } else {
    classes = secondary
      ? clsx(
        'border-2 bg-white border-blue-500 text-blue-500 leading-relaxed',
        'uppercase h-10 px-4 w-auto rounded-r-sm',
        'hover:border-blue-600 hover:text-blue-600',
        'focus:border-blue-700 focus:text-blue-700',
        'active:border-blue-800 active:text-blue-800',

      )
      : clsx(
        'border-2 bg-blue-500 border-blue-500 text-white leading-relaxed',
        'uppercase h-10 px-4 w-auto rounded-r-sm',
        'hover:border-blue-600 hover:bg-blue-600',
        'focus:border-blue-700 focus:bg-blue-700',
        'active:border-blue-800 active:bg-blue-800',

      )
  }

  return (
    <div
      className={clsx(
        'mt-5 fade-in',
        show ? 'block' : 'hidden'
      )}
    >
      <label htmlFor={name}>
        {label}{required && <span className="text-red-500">*</span>}

        {helpTip && (
          <HelpTipButton
            id={name}
            page={helpTip.page}
            expanded={helpTip.expanded}
            dataTestID={`${name}HelpTip`}
            name={name}
            aria-label={helpTip.ariaLabel}
            gaLabel={helpTip.gaLabel}
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

      <Field name={name}>
        {
          ({ form, field }) => (
            <div className="block">
              <CurrencyFormat
                placeholder={placeholder}
                id={field.name}
                {...field}
                onKeyDown={(e) => {
                  onKeyDown && onKeyDown(e)
                }
                }
                onChange={(e) => {
                  field.onChange(e)

                  onChange && onChange(e)
                }}
                {...rest}
                inputMode="numeric"
                pattern="[0-9]*"
                decimalScale={0}
                aria-label={label}
                aria-describedby={`${name}-error-message`}
                aria-required={required}
                isAllowed={(field_) =>
                  field_.value.length < maxLength + 1
                }
                allowNegative={false}
                className={clsx(
                  'mt-3 sm:w-auto, rounded-none',
                  form.errors[name] && (touched || form.touched[name])
                    ? 'border-red-500 border border-r-0 h-10 px-4'
                    : 'border-gray-700 border border-r-0 h-10 px-4 py-3',
                )}
              />
              <button
                type="button"
                className={classes}
                onClick={onClick}
                aria-label={btnAriaLabel}
                data-testid={`${name}-goBtn`}
                disabled={disabled}
              >
                {buttonText}
              </button>

              {form.errors[name] && (touched || form.touched[name]) && (
                <TextError
                  id={`${name}-error-message`}
                  data-testid={`${name}-error`}
                >
                  {form.errors[name]}
                </TextError>
              )}
            </div>
          )
        }
      </Field>
    </div>
  )
}

NumericSearchField.propTypes = {
  helpTip: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      ariaLabel: PropTypes.string,
      elements: PropTypes.func,
      expanded: PropTypes.bool,
      page: PropTypes.string
    })
  ]),
  hintText: PropTypes.string,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  name: PropTypes.string,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  show: PropTypes.bool,
  btnAriaLabel: PropTypes.string,
  required: PropTypes.bool,
  onKeyDown: PropTypes.func,
  disabled: PropTypes.bool,
  secondary: PropTypes.bool,
  touched: PropTypes.any,
  buttonText: PropTypes.string,
  onChange: PropTypes.func,
}

export default NumericSearchField
