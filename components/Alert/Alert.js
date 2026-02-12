import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { gaEvent } from '../../helpers'
import SectionAlert from './SectionAlert'
import SystemAlert from './SystemAlert'

const Alert = ({
  children,
  category = 'section',
  id,
  type = 'warning',
  title,
  level = '2',
  className,
  dataTestId,
  gaLabel,
  show = true,
  autoFocus = false
}) => {
  let alterBox = null

  if (category === 'section') {
    alterBox = (
      <SectionAlert
        id={id}
        type={type}
        title={title}
        level={level}
        className={className}
        dataTestId={dataTestId}
        show={show}
      >
        {children}
      </SectionAlert>
    )
  } else if (category === 'system') {
    alterBox = (
      <SystemAlert
        id={id}
        type={type}
        title={title}
        level={level}
        className={className}
        dataTestId={dataTestId}
      />
    )
  }

  useEffect(() => {
    gaLabel && gaEvent('pup_alert', 'pup_alert', type.charAt(0).toUpperCase() + type.slice(1), gaLabel)

    if (autoFocus) {
      setTimeout(() => {
        document.getElementById(id).focus()
      }, 300)
    }
  }, [])

  return alterBox
}

Alert.propTypes = {
  children: PropTypes.any,
  category: PropTypes.oneOf(['section', 'system']),
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['warning', 'error', 'info', 'success']),
  title: PropTypes.string.isRequired,
  level: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']),
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  gaLabel: PropTypes.string
}

export default Alert
