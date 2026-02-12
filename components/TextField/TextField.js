import PropTypes from 'prop-types'
import { Field, ErrorMessage } from 'formik'
import clsx from 'clsx'
import TextError from '../TextError'
import HelpTipButton from '../HelpTip/HelpTipButton'
import HelpTipBody from '../HelpTip/HelpTipBody'

const TextField = (props) => {
  const { label, name, onFocus, required = false, helpTip, dataTestId, hintText, show = true, className, fullWidth = true, ...rest } = props


  return (
    <div
      className={clsx(
        'fade-in',
        className,
        show ? 'block' : 'hidden'
      )}
    >
      <label htmlFor={name} className="block" data-testid={dataTestId}>
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
            <input
              id={name}
              name={name}
              onFocus={onFocus}
              type="text"
              {...field}
              {...rest}
              className={clsx(
                fullWidth ? 'w-full' : 'w-60',
                'block my-3',
                form.errors[name] && form.touched[name]
                  ? 'border-red-500 border px-4 py-3'
                  : 'border-gray-700 border px-4 py-3',
              )}
              aria-required={required}
              aria-describedby={form.errors[name] && form.touched[name] ? `${name}-error-message` : ''}
            />
          )
        }
      </Field>
      <ErrorMessage id={`${name}-error-message`} component={TextError} name={name} />
    </div>
  )
}

TextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  helpTip: PropTypes.string,
  dataTestId: PropTypes.string,
  hintText: PropTypes.string,
  show: PropTypes.bool,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
}

export default TextField
