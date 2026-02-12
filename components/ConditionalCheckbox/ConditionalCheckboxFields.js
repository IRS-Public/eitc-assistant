import React, { useContext } from 'react'
import clsx from 'clsx'
import { FieldArray } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import SiteContext from '../../context/Site/SiteContext'
import Callout from '../Alert/Callout'
import ConditionalCheckbox from './ConditionalCheckbox'
import FormBuilder from '../FormBuilder'

const ConditionalCheckboxFields = ({ addBtnText, name, options, pushObject }) => {
  const { lang } = useContext(SiteContext)
  const checkboxes = options.map((option) => (
    <div className={clsx('mt-3', option.className, option.show || option.show === undefined ? 'block' : 'hidden')} key={option.name}>
      <ConditionalCheckbox
        name={`${option.name}`}
        disabled={option.disabled}
        checkedValue={option.checkedValue}
        options={[
          {
            label: option.label,
            ariaLabel: option.ariaLabel,
            value: option.value,
            handleChange: option.handleChange,
            disabled: option.disabled,
            helpTip: option.helpTip,
            required: option.required,
            replacements: option.replacements,
            dataTestID: option.dataTestID,
          }
        ]}
      />

      {
        option.showFields && (
          <div className="ml-8">
            {option.callout && (
              <Callout
                id={`${option.groupName}-callout`}
                dataTestId={`${option.groupName}-callout`}
                title={option.callout.title}
                className="mt-3"
              />
            )}

            <FieldArray name={`${name}.${option.groupName}.info`}>
              {
                (fieldArrayProps) => {
                  const { push, remove } = fieldArrayProps

                  const infoArray = option.fieldArray.map((item, index) => (
                    <div key={index} className="mt-2">
                      <FormBuilder
                        options={option.formElements(index, remove)}
                      />
                    </div>
                  ))

                  const infoFields = (
                    <>
                      {infoArray}

                      {!option.noAdd && (
                        <button
                          type="button"
                          data-testid={`addAnother-${option.groupName}`}
                          aria-label={`Add another ${option.ariaLabel}`}
                          onClick={() => {
                            push({ ...pushObject })
                            const newIndex = option.fieldArray.length

                            setTimeout(() => {
                              const elem = document.getElementById(option.formElements(newIndex, remove)[0].name)
                              elem && elem.focus()
                            }, 100)
                          }}
                          disabled={infoArray.length > 3}
                          className={clsx(
                            'block uppercase font-bold underline my-2 mr-2',
                            infoArray.length > 3
                              ? 'text-gray-500 hover:text-gray-500 active:text-gray-500 cursor-not-allowed'
                              : 'text-blue-500 hover:text-blue-600 active:text-blue-800',
                          )}
                        >
                          <FontAwesomeIcon
                            className={clsx(
                              'fill-current mr-1',
                            )}
                            icon={faPlus}
                            style={{
                              width: '1em',
                              height: '1em'
                            }}
                          />
                          {lang(addBtnText)}
                        </button>
                      )}
                    </>
                  )

                  return infoFields
                }
              }
            </FieldArray>

            {option.formElementsBelowAdd && (
              <div className="mt-2">
                <FormBuilder
                  options={option.formElementsBelowAdd()}
                />
              </div>
            )}
          </div>
        )
      }
    </div>
  )
  )

  return checkboxes
}

export default ConditionalCheckboxFields
