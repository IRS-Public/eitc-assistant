import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Button = ({
  secondary,
  disabled,
  showIcon,
  children,
  className,
  ariaLabel,
  icon,
  buttonSmall,
  widthClasses = 'w-full sm:w-auto',
  ...otherProps
}) => {
  let classes

  if (disabled && !secondary) {
    classes = clsx(
      'bg-gray-600 border-2 border-gray-600 cursor-not-allowed text-white leading-relaxed',
      'px-4 py-2 rounded-sm text-black uppercase',
      widthClasses,
      className,
    )
  } else if (disabled && secondary) {
    classes = clsx(
      'border-2 bg-white border-gray-600 text-gray-600 leading-relaxed',
      'uppercase rounded-sm',
      buttonSmall ? 'px-4 py-1' : 'py-2 px-4',
      widthClasses,
      className,
    )
  } else {
    classes = secondary
      ? clsx(
        'border-2 bg-white border-blue-500 text-blue-500 leading-relaxed',
        'uppercase rounded-sm',
        'hover:border-blue-600 hover:text-blue-600',
        'focus:border-blue-700 focus:text-blue-700',
        'active:border-blue-800 active:text-blue-800',
        buttonSmall ? 'px-4 py-1' : 'py-2 px-4',
        widthClasses,
        className,
      )
      : clsx(
        'border-2 bg-blue-500 border-blue-500 text-white leading-relaxed',
        'uppercase rounded-sm',
        'hover:border-blue-600 hover:bg-blue-600',
        'focus:border-blue-700 focus:bg-blue-700',
        'active:border-blue-800 active:bg-blue-800',
        buttonSmall ? 'px-4 py-1' : 'py-2 px-4',
        widthClasses,
        className,
      )
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
        className={clsx(
          'ml-4',
          showIcon ? 'inline' : 'hidden'
        )}
        icon={icon ? icon : faChevronRight}
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
