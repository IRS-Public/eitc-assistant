import { useContext, useEffect } from 'react'
import clsx from 'clsx'
import { FieldArray, useFormikContext } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import SiteContext from '../../context/Site/SiteContext'
import CurrencyField from '../CurrencyField'

const CurrencyFieldArray = ({
  name,
  show,
  required,
  placeholder,
  dataTestId,
  noAdd,
  className,
  jobsIndex,
  toolTipElements,
  addBtnText = 'global.button.addAnother'
}) => {
  const { lang, site } = useContext(SiteContext)
  const { values, setFieldValue } = useFormikContext()

  useEffect(() => {
    if (values.jobs[jobsIndex].payStatementOptions === 'last2To3Statements' && values.jobs[jobsIndex].hourlyPayStatements.length === 1) {
      setFieldValue(`jobs.${jobsIndex}.hourlyPayStatements`, [...values.jobs[jobsIndex].hourlyPayStatements, ''])
    }

    if (values.jobs[jobsIndex].payStatementOptions === 'lastStatement' && values.jobs[jobsIndex].hourlyPayStatements.length > 1) {
      setFieldValue(`jobs.${jobsIndex}.hourlyPayStatements`, [values.jobs[jobsIndex].hourlyPayStatements[0]])
    }
  }, [values.jobs[jobsIndex].payStatementOptions])

  return (
    <FieldArray name={name}>
      {
        (fieldArrayProps) => {
          const { push, remove, form } = fieldArrayProps
          const { values } = form

          return (
            <div
              className={clsx(
                className,
                show ? 'block' : 'hidden'
              )}
            >
              {values.jobs[jobsIndex].payStatementOptions === 'last2To3Statements' && (
                <p className="mt-4">{lang('incomeWithholding.p.payStubs')}</p>
              )}
              {values.jobs[jobsIndex].hourlyPayStatements.map((item, index) => (
                <div key={index}>
                  <CurrencyField
                    label={values.jobs[jobsIndex].payStatementOptions === 'lastStatement' ? lang('incomeWithholding.label.hourlyStatementWages') : lang('incomeWithholding.label.hourlyStatementWagesAverage', { ':num': index + 1 })}
                    name={`${name}.${index}`}
                    show={show}
                    required={required}
                    placeholder={placeholder}
                    className="mt-4 inline-block w-full"
                    dataTestId={dataTestId}
                  >
                    {index > 1 && (
                      <button
                        type="button"
                        data-testid={`deleteButton${index}`}
                        aria-label={`Remove Pay Statement ${index + 1}`}
                        onClick={() => remove(index)}
                      >
                        <FontAwesomeIcon
                          className={clsx(
                            'text-blue-500 hover:text-blue-600 active:text-blue-800 mx-1',
                          )}
                          icon={faTimesCircle}
                          size="lg"
                        />
                      </button>
                    )}
                  </CurrencyField>
                </div>
              ))}

              {!noAdd && (
                <button
                  type="button"
                  data-testid="addAnotherPayStatement"
                  aria-label="Add another Pay Statement"
                  onClick={() => {
                    push('')

                    const newIndex = values.jobs[jobsIndex].hourlyPayStatements.length

                    setTimeout(() => {
                      const amountInput = document.getElementById(`jobs.${jobsIndex}.hourlyPayStatements[${newIndex}]`)
                      amountInput && amountInput.focus()
                    }, 100)
                  }}
                  disabled={values.jobs[jobsIndex].hourlyPayStatements.length > 2}
                  className={clsx(
                    'block uppercase font-bold text-sm underline mt-2 mr-2',
                    values.jobs[jobsIndex].hourlyPayStatements.length > 2
                      ? 'text-gray-500 hover:text-gray-500 active:text-gray-500 cursor-not-allowed'
                      : 'text-blue-500 hover:text-blue-600 active:text-blue-800',
                  )}
                >
                  <FontAwesomeIcon
                    className={clsx(
                      'fill-current mr-1',
                    )}
                    icon={faPlus}
                    size="sm"
                  />
                  {lang(addBtnText)}
                </button>
              )}
            </div>
          )
        }
      }
    </FieldArray>
  )
}

export default CurrencyFieldArray
