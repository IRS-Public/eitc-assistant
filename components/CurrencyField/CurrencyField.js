import PropTypes from 'prop-types';
import React from 'react'
import { Field, useFormikContext, getIn } from 'formik'
import CurrencyInput from 'react-currency-input-field'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import HelpTipBody from '../HelpTip/HelpTipBody'
import HelpTipButton from '../HelpTip/HelpTipButton'
import TextError from '../TextError'
import Callout from '../Alert/Callout'

const CurrencyField = ({
  helpTip,
  hintText,
  dataTestId,
  label,
  name,
  placeholder,
  required = false,
  show = true,
  className,
  touchedfield,
  allowNegativeValue = false,
  prefix = '$',
  groupSeparator = ',',
  maxLength = 8,
  allowDecimals = true,
  disabled = false,
  disableFadeIn,
  callout,
  onBlur,
  children,
  removeBtnObj,
  ariaLabel,
  ...rest
}) => {
  const { errors, touched } = useFormikContext()

  return (
    <div
      data-testid={dataTestId}
      className={clsx(
        'w-auto',
        disableFadeIn ? '' : 'fade-in',
        show ? 'block' : 'hidden',
        className
      )}
    >
      <label data-testid={`${dataTestId}-label`} htmlFor={name} className="block">
        {label}{required && <span className="text-red-500 ml-1">*</span>}

        {helpTip && (
          <HelpTipButton
            page={helpTip.page}
            expanded={helpTip.expanded}
            dataTestID={`${dataTestId}-helpTip-button`}
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
          testID={`${dataTestId}-helpTip-body`}
        />
      )}

      {hintText && (
        <span data-testid={`${dataTestId}-hintText`} className="block text-gray-600 mt-1 text-sm">{hintText}</span>
      )}

      {callout && (
        <Callout
          id={`${name}-callout`}
          dataTestId={`${name}-callout`}
          title={callout.title}
          className="mt-3"
        />
      )}

      <div className="inline-block">
        <Field name={name}>
          {
            ({ field, form }) => (
              <>
                <CurrencyInput
                  id={field.name}
                  name={field.name}
                  value={field.value}
                  {...rest}
                  disabled={disabled}
                  placeholder={placeholder}
                  groupSeparator={groupSeparator}
                  prefix={prefix}
                  allowDecimals={allowDecimals}
                  allowNegativeValue={allowNegativeValue}
                  maxLength={maxLength}
                  disableAbbreviations
                  aria-label={ariaLabel}
                  aria-describedby={`${name}-error-message`}
                  aria-required={required}
                  data-testid={`${dataTestId}-input`}
                  onValueChange={(value, name_) => {
                    if (value === '.') {
                      form.setFieldValue(name_, '0.')
                    } else {
                      form.setFieldValue(name_, value === undefined ? '' : value)
                    }
                  }}
                  onBlur={(e) => {
                    field.onBlur(e)
                    onBlur && onBlur(e)
                  }}
                  className={
                    clsx(
                      'w-auto inline-block mt-2',
                      ((getIn(errors, name) || errors[name]) && (touchedfield || touched[name] || getIn(touched, name)))
                        ? 'border-red-500 border h-10 px-4'
                        : 'border-gray-700 border h-10 px-4 py-3',
                    )}
                />

                {removeBtnObj?.fieldArrIndex > 0 && (
                  <button
                    type="button"
                    data-testid={removeBtnObj?.dataTestID}
                    aria-label={removeBtnObj?.ariaLabel}
                    className="ml-2"
                    onClick={() => removeBtnObj?.remove(removeBtnObj?.fieldArrIndex)}
                  >
                    <FontAwesomeIcon
                      className={clsx(
                        'text-blue-500 hover:text-blue-600 active:text-blue-800 mx-1',
                      )}
                      icon={faTimesCircle}
                      size="lg"
                      style={{
                        width: '1em',
                        height: '1em'
                      }}
                    />
                  </button>
                )}
              </>
            )
          }
        </Field>

        {((getIn(errors, name) || errors[name]) && (touchedfield || touched[name] || getIn(touched, name))) && (
          <TextError
            id={`${name}-error-message`}
            data-testid={`${name}-error`}
          >
            {getIn(errors, name) ? getIn(errors, name) : errors[name]}
          </TextError>
        )}
      </div>
      {children}
    </div>
  )
}

CurrencyField.propTypes = {
  helpTip: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      ariaLabel: PropTypes.string,
      elements: PropTypes.func,
      expanded: PropTypes.bool,
      page: PropTypes.string
    })
  ]),
  touchedfield: PropTypes.bool,
  className: PropTypes.string,
  hintText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  show: PropTypes.bool,
  allowNegativeValue: PropTypes.bool,
  prefix: PropTypes.string,
  groupSeparator: PropTypes.string,
  maxLength: PropTypes.number,
  allowDecimals: PropTypes.bool,
  dataTestId: PropTypes.string,
}

export default CurrencyField
