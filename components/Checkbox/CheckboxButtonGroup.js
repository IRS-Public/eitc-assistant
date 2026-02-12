import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import { Field } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSquare as solidSquare } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { detect } from 'detect-browser'

const CheckboxButtonGroup = ({ name, className, disabled, id, onChange }) => {
  const browser = detect()

  return (
    <>
      <Field name={name}>
        {
          ({ field }) => (
            <>
              {disabled
                ? (
                  <FontAwesomeIcon
                    className="text-gray-500 text-lg relative -mb-1"
                    style={{ top: '0', fontSize: '1.5rem', height: '1.45rem' }}
                    icon={solidSquare}
                    size="1x"
                  />
                )

                : !field.value
                  ? (
                    <FontAwesomeIcon
                      className="text-blue-500 text-lg relative -mb-1"
                      style={{ top: '0', fontSize: '1.5rem', height: '1.45rem' }}
                      icon={faSquare}
                      size="1x"
                    />
                  )
                  : (
                    <span className="bg-white border-blue-600 rounded-sm">
                      <FontAwesomeIcon
                        style={{
                          position: 'relative',
                          top: browser.os === 'Mac OS' || browser.os === 'iOS' ? '-5px' : '-3px',
                          fontSize: '0.81rem'
                        }}
                        className="-mb-1 text-blue-600 mx-1 text-lg"
                        icon={faCheck}
                        size="1x"
                      />
                    </span>
                  )
              }

              <input
                id={id}
                className={clsx(className, 'w-0 h-0 opacity-0')}
                name={name}
                type="checkbox"
                disabled={disabled}
                {...field}
                onChange={(e) => {
                  field.onChange(e)
                  onChange && onChange(e)
                }}
              />
            </>
          )
        }
      </Field>
    </>
  )
}

CheckboxButtonGroup.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
}

export default CheckboxButtonGroup
