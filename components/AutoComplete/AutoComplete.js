import PropTypes from 'prop-types';
import React, { useState } from 'react'
import { Field, ErrorMessage } from 'formik'
import Downshift from 'downshift'
import { matchSorter } from 'match-sorter'
import clsx from 'clsx'
import TextError from '../TextError'
import HelpTipButton from '../HelpTip/HelpTipButton'
import HelpTipBody from '../HelpTip/HelpTipBody'
import { ENTER_KEYCODE, BACKSPACE_KEYCODE } from '../../helpers/constants'

const itemToString = (item) => item || ''

const Autocomplete = (props) => {
  const { label, name, required = false, helpTip, hintText, items, placeholder = '', show = true, ...rest } = props

  const [downShiftIsOpen, setDownShiftIsOpen] = useState(false)
  const handleOnFocus = () => {
    setDownShiftIsOpen(true)
  }

  const handleOnBlur = () => {
    setDownShiftIsOpen(false)
  }

  const handleMouseUp = () => {
    setDownShiftIsOpen(false)
  }

  const handleKeyUp = (e) => {
    if (e.keyCode === ENTER_KEYCODE) {
      setDownShiftIsOpen(false)
    }
    if (e.keyCode === BACKSPACE_KEYCODE) {
      setDownShiftIsOpen(true)
    }
  }

  return (
    <div
      className={clsx(
        'mt-6 fade-in',
        show ? 'block' : 'hidden'
      )}
    >
      <label htmlFor={name} className="block">
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
            <Downshift
              onInputValueChange={(inputValue) => form.setFieldValue(name, inputValue)}
              itemToString={itemToString}
              selectedItem={field.value}
              isOpen={downShiftIsOpen}
            >
              {({
                getInputProps,
                getItemProps,
                isOpen,
                inputValue,
                highlightedIndex,
              }) => {
                const filteredItems = matchSorter(items, inputValue, {
                  keys: ['text', 'key'],
                  maxRanking: matchSorter.rankings.STARTS_WITH,
                })
                return (
                  <div className={clsx('downshift inline-block my-3')} style={{ position: 'relative' }}>
                    <input
                      onFocus={() => handleOnFocus()}
                      onKeyUp={(e) => handleKeyUp(e)}
                      data-lpignore="true"
                      placeholder={placeholder}
                      name={field.name}
                      {...field}
                      {...rest}
                      className={clsx(
                        'bg-white h-10 py-3 px-4',
                        form.errors[name] && form.touched[name]
                          ? 'border-red-500 border h-10 px-4'
                          : 'border-gray-700 border h-10 px-4 py-3',
                      )}
                      {...getInputProps({
                        name: field.name,
                        placeholder: 'Start typing...',
                        onBlur: handleOnBlur,
                      })}
                    />
                    <div
                      style={{ maxHeight: '14rem' }}
                      data-testid={`${field.name}-autoComplete`}
                      className={clsx(
                        'downshift-options bg-white absolute top-100 left-0 right-0',
                        'z-10 border border-gray-700 overflow-auto',
                        isOpen && !!filteredItems.length ? 'block' : 'hidden'
                      )}
                    >
                      {filteredItems.map(({ key, text }, index) => (
                        <div
                          tabIndex="0"
                          role="option"
                          aria-selected="false"
                          onMouseUp={(e) => handleMouseUp(e)}
                          className={clsx(
                            'px-4 py-3',
                            highlightedIndex === index ? 'bg-blue-300' : 'bg-white',
                          )}
                          {...getItemProps({
                            key,
                            index,
                            item: text,
                          })}
                        >
                          {text}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }}
            </Downshift>
          )
        }
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

Autocomplete.propTypes = {
  className: PropTypes.any,
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
  placeholder: PropTypes.any,
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  helpTip: PropTypes.any,
  hintText: PropTypes.string,
  show: PropTypes.bool,
}

export default Autocomplete
