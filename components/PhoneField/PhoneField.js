import PropTypes from 'prop-types'
import { Field, ErrorMessage } from 'formik'
import clsx from 'clsx'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'
import TextError from '../TextError'
import HelpTipButton from '../HelpTip/HelpTipButton'
import HelpTipBody from '../HelpTip/HelpTipBody'

const PhoneField = (props) => {
  const {
    label,
    name,
    required = false,
    helpTip,
    dataTestId,
    hintText,
    show = true,
    className,
    fullWidth = true,
  } = props

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
        <span data-testid={`${dataTestId}-hintText`} className="block text-gray-600 mt-1 text-sm">{hintText}</span>
      )}

      <Field name={name}>
        {
          ({ form, field }) => (
            <PhoneInput
              country="us"
              // id={name}
              placeholder=""
              name={name}
              value={field.value}
              aria-required={required}
              aria-describedby={form.errors[name] && form.touched[name] ? `${name}-error-message` : ''}
              onChange={(e) => form.setFieldValue(name, e)}
              preferredCountries={['us']}
              inputProps={
                {
                  'data-testid': `${dataTestId}-input`,
                  className: clsx(
                    fullWidth ? 'w-full' : 'w-full fw-18',
                    'block my-3',
                    form.errors[name] && form.touched[name]
                      ? 'border-red-500 border px-4 py-3'
                      : 'border-gray-700 border px-4 py-3',
                  )
                }
              }

            />
          )
        }
      </Field>
      <ErrorMessage id={`${name}-error-message`} component={TextError} name={name} />
    </div>
  )
}

PhoneField.propTypes = {
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
  dataTestId: PropTypes.string,
  fullWidth: PropTypes.bool,
}

export default PhoneField
