import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faExclamationCircle,
  faInfoCircle,
  faCheckCircle,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'
import Heading from '../Heading'

const Alert = ({ children, id, type = 'warning', title, level = '2', className, dataTestId = type, show }) => {
  let config = {}
  switch (type) {
    case 'error':
      config = {
        icon: faExclamationCircle,
        className: 'bg-red-400 border-red-500',
      }
      break
    case 'info':
      config = {
        icon: faInfoCircle,
        className: 'bg-blue-300 border-blue-500',
      }
      break
    case 'success':
      config = {
        icon: faCheckCircle,
        className: 'bg-green-400 border-green-500',
      }
      break
    default:
      // Type of warning is default
      config = {
        icon: faExclamationTriangle,
        className: 'bg-yellow-400 border-yellow-500',
      }
  }

  return (
    <div
      tabIndex="0"
      data-testid={dataTestId}
      id={id}
      className={clsx(
        'w-auto fade-in border-l-3 my-6 p-4',
        config.className,
        className,
        show ? 'block' : 'hidden'
      )}
    >
      <div className="flex">
        <FontAwesomeIcon
          className="text-1.5xl text-black mx-1 mr-3"
          icon={config.icon}
          style={{
            width: '1em',
            height: '1em'
          }}
        />
        <div>
          <Heading
            level={level}
            className="font-bold text-xl mb-3"
            data-testid={`${dataTestId}Heading`}
          >
            {title}
          </Heading>
          <div className="alert-body" data-testid={`${dataTestId}Body`}>{children}</div>
        </div>
      </div>
    </div>
  )
}

Alert.propTypes = {
  children: PropTypes.any,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['warning', 'error', 'info', 'success']),
  title: PropTypes.string.isRequired,
  level: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']),
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  show: PropTypes.bool,
}

export default Alert
