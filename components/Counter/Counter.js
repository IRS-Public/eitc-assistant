import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import { Field } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import HelpTipButton from '../HelpTip/HelpTipButton'
import HelpTipBody from '../HelpTip/HelpTipBody'
import Button from './Button'
import Callout from '../Alert/Callout'
import Replacement from '../HtmlBuilder/Replacement'

const Counter = ({
  required = false,
  show = true,
  name,
  label,
  min,
  max,
  helpTip,
  className,
  dataTestId,
  decreaseAriaLabel,
  increaseAriaLabel,
  callout,
  addOnClick,
  removeOnClick,
  replacements = [],
  boldLabel = false,
}) => {
  const handleRemoveNum = (form, value, fieldName) => {
    if (value > min) {
      form.setFieldValue(fieldName, value - 1)
    }
  }

  const handleAddNum = (form, value, fieldName) => {
    if (value < max) {
      form.setFieldValue(fieldName, value + 1)
    }
  }

  return (
    <div
      data-testid={dataTestId}
      className={clsx(
        'fade-in',
        className,
        show ? 'block' : 'hidden'
      )}
    >
      <label htmlFor={name} className="block" data-testid={`${dataTestId}-label`}>
        {boldLabel ? <span className="font-bold">{label}</span> : <Replacement text={label} replace={replacements} />}{required && <span className="text-red-500">*</span>}

        {helpTip && (
          <HelpTipButton
            page={helpTip.page}
            expanded={helpTip.expanded}
            testID={`${dataTestId}-helpTip`}
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

      {callout && (
        <Callout
          id={`${name}-callout`}
          dataTestId={`${name}-callout`}
          title={callout.title}
          className="mt-3"
        />
      )}

      <Field name={name}>
        {
          ({ form, field }) => (
            <div className="flex mt-3 w-auto">
              <Button
                secondary
                type="button"
                data-testid={`${dataTestId}-min`}
                ariaLabel={decreaseAriaLabel}
                className={clsx(
                  'rounded-l-md',
                  field.value === min && 'cursor-not-allowed'
                )}
                disabled={field.value === min}
                onClick={() => {
                  handleRemoveNum(form, field.value, name)

                  if (removeOnClick) {
                    removeOnClick()
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faMinus}
                  style={{
                    width: '1em',
                    height: '1em'
                  }}
                />
              </Button>
              <div className="px-8 flex justify-center items-center border-b border-t border-gray-600">
                <span data-testid={`${dataTestId}-value`}>{field.value}</span>
              </div>
              <Button
                secondary
                type="button"
                data-testid={`${dataTestId}-plus`}
                ariaLabel={increaseAriaLabel}
                disabled={field.value === max}
                onClick={() => {
                  handleAddNum(form, field.value, name)

                  if (addOnClick) {
                    addOnClick()
                  }
                }}
                className={clsx(
                  'rounded-r-md',
                  field.value === max && 'cursor-not-allowed'
                )}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{
                    width: '1em',
                    height: '1em'
                  }}
                />
              </Button>
            </div>
          )
        }
      </Field>
    </div>
  )
}

Counter.propTypes = {
  className: PropTypes.string,
  dataTestId: PropTypes.string.isRequired,
  required: PropTypes.bool,
  show: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  helpTip: PropTypes.any,
  decreaseAriaLabel: PropTypes.string,
  increaseAriaLabel: PropTypes.string
}

export default Counter
