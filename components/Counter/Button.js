import PropTypes from 'prop-types'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { buildClassList } from '../../helpers'

const Button = ({
  secondary,
  disabled,
  showIcon,
  children,
  className,
  ariaLabel,
  ...otherProps
}) => {
  let classes

  if (disabled && !secondary) {
    classes = buildClassList([
      'bg-gray-600 border border-gray-600 cursor-not-allowed text-white leading-relaxed',
      'text-black uppercase px-3 h-12',
      className,
    ])
  } else if (disabled && secondary) {
    classes = buildClassList([
      'border bg-white border-gray-600 text-gray-600 leading-relaxed',
      'uppercase px-3 h-12',
      className,
    ])
  } else {
    classes = secondary
      ? buildClassList([
        'border bg-white border-blue-500 text-blue-500 leading-relaxed',
        'uppercase px-3 h-12',
        'hover:border-blue-600 hover:text-blue-600',
        'focus:border-blue-700 focus:text-blue-700',
        'active:border-blue-800 active:text-blue-800',
        className,
      ])
      : buildClassList([
        'border bg-blue-500 border-blue-500 text-white leading-relaxed',
        'uppercase px-3 h-12',
        'hover:border-blue-600 hover:bg-blue-600',
        'focus:border-blue-700 focus:bg-blue-700',
        'active:border-blue-800 active:bg-blue-800',
        className,
      ])
  }

  return (
    <button
      className={classes}
      data-component="Button"
      disabled={disabled}
      aria-label={ariaLabel}
      {...otherProps}
    >
      {children}
      <FontAwesomeIcon
        className={buildClassList([
          'ml-4',
          showIcon ? 'inline' : 'hidden'
        ])}
        icon={faChevronRight}
        style={{
          width: '1em',
          height: '1em'
        }}
      />
    </button>
  )
}

Button.propTypes = {
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  showIcon: PropTypes.bool,
  children: PropTypes.any.isRequired,
  className: PropTypes.any,
  ariaLabel: PropTypes.string,
}

export default Button
