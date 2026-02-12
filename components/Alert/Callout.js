import PropTypes from 'prop-types'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import Heading from '../Heading'

const Callout = ({ id, dataTestId, level = '2', title, className }) => (
  <div
    tabIndex="0"
    id={id}
    className={clsx([
      'w-auto lg:w-10/12 fade-in',
      className
    ])}
  >
    <div className="flex">
      <FontAwesomeIcon
        className={clsx(
        )}
        icon={faExclamationTriangle}
        style={{
          width: '1em',
          height: '1em'
        }}
      />
      <div
        className={clsx(
          'ml-1',
        )}
      >
        <Heading
          level={level}
          className={clsx(
            'font-bold',
          )}
          data-testid={dataTestId}
        >
          {title}
        </Heading>
      </div>
    </div>
  </div>
)

Callout.propTypes = {
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  level: PropTypes.string,
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
}

export default Callout
