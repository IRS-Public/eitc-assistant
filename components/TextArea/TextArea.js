import PropTypes from 'prop-types'
import { Field, ErrorMessage } from 'formik'
import clsx from 'clsx'
import TextError from '../TextError'
import HelpTipButton from '../HelpTip/HelpTipButton'
import HelpTipBody from '../HelpTip/HelpTipBody'

const TextArea = (props) => {
  const {
    className,
    fullWidth = true,
    label, name,
    required = false,
    helpTip,
    dataTestId,
    hintText,
    show = true,
    height,
    labelClass,
  } = props

  return (
    <div
      className={clsx(
        className,
        show ? 'block fade-in' : 'hidden'
      )}
    >
      <label className={labelClass} htmlFor={name} data-testid={dataTestId}>
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
        <span className="block text-gray-600 mt-1 mb-3 text-sm">{hintText}</span>
      )}

      <Field name={name}>
        {
          ({ form, field }) => (
            <textarea
              style={{ height: height }}
              id={name}
              name={name}
              {...field}
              className={clsx(
                fullWidth ? 'w-full' : 'fw-18',
                'block px-4 py-3 border',
                form.errors[name] && form.touched[name]
                  ? 'border-red-500'
                  : 'border-gray-700',
              )}
              aria-describedby={`${name}-error-message`}
            ></textarea>
          )
        }
      </Field>
      <ErrorMessage component={TextError} name={name} id={`${name}-error-message`} />
    </div>
  )
}

TextArea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  helpTip: PropTypes.string,
  dataTestId: PropTypes.string,
  hintText: PropTypes.string,
  show: PropTypes.bool,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  height: PropTypes.string,
  labelClass: PropTypes.string,
}

export default TextArea
