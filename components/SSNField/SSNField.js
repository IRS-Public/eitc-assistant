import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Field, ErrorMessage } from 'formik'
import clsx from 'clsx'
import CurrencyFormat from 'react-currency-input-field'
import HelpTipBody from '../HelpTip/HelpTipBody'
import HelpTipButton from '../HelpTip/HelpTipButton'
import TextError from '../TextError'

const SSNField = ({
  name,
  label,
  className,
  show = true,
  format = '### - ## - ####',
  required = false,
  dataTestId,
  helpTip,
  hintText,
  fullWidth = true,
  ...rest
}) => {
  const [showPass, setShowPass] = useState(true)

  return (
    <div className={clsx(className, show ? 'block fade-in relative' : 'hidden')}>
      <Field name={name}>
        {
          ({ form, field }) => (
            <div>
              <label className="block" htmlFor={name} data-testid={dataTestId}>
                {label}
                {required && <span className="text-red-500"> *</span>}
                {helpTip && (
                  <HelpTipButton
                    page={helpTip.page}
                    expanded={helpTip.expanded}
                    dataTestID={`${name}HelpTip`}
                    name={name}
                    aria-label={helpTip.ariaLabel}
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
              <div
                className={clsx(
                  fullWidth ? 'w-full' : 'fw-18',
                  'relative block'
                )}
              >
                <CurrencyFormat
                  name={name}
                  id={name}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  data-lpignore="true"
                  type="text"
                  className={clsx([
                    fullWidth ? 'w-full' : 'w-full fw-18',
                    'border px-4 py-3 my-3',
                    showPass ? 'ssnFieldDots' : '',
                    form.errors[name] && form.touched[name]
                      ? 'border-red-500'
                      : 'border-gray-600'
                  ])}
                  format={showPass ? '#########' : format}
                  mask={showPass ? '' : '_'}
                  {...field}
                  {...rest}
                  aria-required={required}
                  aria-describedby={form.errors[name] && form.touched[name] ? `${name}-error-message` : ''}
                />
                <button
                  type="button"
                  aria-label={showPass ? 'show text' : 'hide text'}
                  className="absolute link"
                  style={{ top: '24px', right: '8px' }}
                  onClick={(e) => {
                    e.preventDefault()
                    setShowPass(!showPass)
                  }}
                >
                  {showPass ? 'show' : 'hide'}
                </button>
              </div>
              <ErrorMessage component={TextError} name={name} id={`${name}-error-message`} />
            </div>
          )
        }
      </Field>
    </div>
  )
}

SSNField.propTypes = {
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
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  show: PropTypes.bool,
  format: PropTypes.string,
  dataTestId: PropTypes.string,
  fullWidth: PropTypes.bool,
}

export default SSNField
