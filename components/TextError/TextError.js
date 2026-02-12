import PropTypes from 'prop-types'
import clsx from 'clsx'

const TextError = ({ children, className, id, dataTestId }) => (
  <span
    role="alert"
    id={id}
    data-testid={id}
    className={clsx('block text-red-500 text-sm mt-1 break-words', className)}
  >
    {children}
  </span>
)

TextError.propTypes = {
  id: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
}

export default TextError
