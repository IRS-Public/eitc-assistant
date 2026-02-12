import PropTypes from 'prop-types'
import React from 'react'
import { Field, ErrorMessage } from 'formik'
import clsx from 'clsx'
import HelpTipBody from '../HelpTip/HelpTipBody'
import HelpTipButton from '../HelpTip/HelpTipButton'
import TextError from '../TextError'
import styles from './Dropdown.module.css'

const DropDown = (props) => {
  const {
    helpTip,
    hintText,
    label,
    name,
    options,
    required = false,
    show = true,
    className,
    dataTestId,
    ...rest
  } = props

  console.log(dataTestId);

  return (
    <div
      className={clsx(
        className,
        'fade-in',
        show ? 'block' : 'hidden'
      )}
    >
      <label htmlFor={name} data-testid={dataTestId}>
        {label} {required && <span className="text-red-500">*</span>}

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

      <Field name={name}>
        {
          ({ form, field }) => (
            <select
              id={field.name}
              name={field.name}
              onChange={field.onChange}
              onBlur={field.onBlur}
              {...field}
              {...rest}
              className={clsx(
                'w-full block my-3 px-4 py-3',
                styles.dropDown,
                form.errors[name] && form.touched[name]
                  ? 'border-red-500 border'
                  : 'border-gray-700 border',
              )}
              aria-required={required}
              aria-describedby={form.errors[name] && form.touched[name] ? `${name}-error-message` : ''}
            >
              <option disabled value="">
                Select an option
              </option>

              {
                options.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)
              }
            </select>
          )
        }
      </Field>
      <ErrorMessage component={TextError} name={name} id={`${name}-error-message`} />
    </div>
  )
}

DropDown.propTypes = {
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
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  required: PropTypes.bool,
  show: PropTypes.bool,
}

export default DropDown
