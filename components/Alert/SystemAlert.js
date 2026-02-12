import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faExclamationCircle,
  faInfoCircle,
  faCheckCircle,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'
import { buildClassList } from '../../helpers'
import Heading from '../Heading'

const Alert = ({ id, type = 'warning', title, level = '2', className, dataTestId }) => {
  let config = {}
  switch (type) {
    case 'error':
      config = {
        icon: faExclamationCircle,
        className: 'bg-red-400',
      }
      break
    case 'info':
      config = {
        icon: faInfoCircle,
        className: 'bg-blue-300',
      }
      break
    case 'success':
      config = {
        icon: faCheckCircle,
        className: 'bg-green-400',
      }
      break
    default:
      // Type of warning is default
      config = {
        icon: faExclamationTriangle,
        className: 'bg-yellow-500',
      }
  }

  return (
    <div
      tabIndex="0"
      id={id}
      data-testid={dataTestId}
      className={buildClassList([
        'w-auto lg:w-10/12 fade-in p-4',
        config.className,
        className
      ])}
    >
      <div className="flex">
        <FontAwesomeIcon 
          className="text-xl mr-3" 
          icon={config.icon} 
          style={{
            width: '1em',
            height: '1em'
          }}
        />
        <Heading
          level={level}
          className="font-bold"
        >
          {title}
        </Heading>
      </div>
    </div>
  )
}

Alert.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['warning', 'error', 'info', 'success']),
  title: PropTypes.string.isRequired,
  level: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']),
  className: PropTypes.string,
  dataTestId: PropTypes.string,
}

export default Alert
