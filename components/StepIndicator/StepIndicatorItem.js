import PropTypes from 'prop-types'
import React from 'react'
import Link from '../Link'
import Check from '../Icons/Check'
import { buildClassList } from '../../helpers'

const StepIndicatorItem = ({ title, completed, path, asPath, stepNumber, active, disabled }) => {
  const interactive = (
    <div
      className={buildClassList([
        !active ? 'hover:text-blue-600 active:text-blue-800' : '',
        'step-indicator-item relative'
      ])}
      data-testid={`stepIndicatorStep${stepNumber}`}
    >
      <Link
        router
        asHref={asPath}
        href={path}
        className={buildClassList([
          'step-indicator-item-link step-indicator-item-link-interactive',
          active ? 'text-black' : 'text-blue-500 hover:text-blue-600 active:text-blue-800',
        ])}
        style={{ minWidth: '75px' }}
        ariaLabel={`Step ${stepNumber} ${title}`}
      >
        <div
          className={buildClassList([
            'step-indicator-item-step',
            'flex justify-center items-center w-8 h-8 text-sm',
            'sm:w-12 sm:h-12 rounded-full text-white md:mb-2',
            'hover:bg-blue-600 active:bg-blue-800',
            completed ? 'text-1.5xl' : 'sm:text-lg',
            active ? 'bg-blue-600' : 'bg-blue-500',
          ])}
        >
          {completed ? <Check className="text-sm sm:text-1.5xl" /> : stepNumber}
        </div>
        <span
          className={buildClassList([
            'step-indicator-item-span text-sm',
            active && 'font-bold text-gray-600',
            !active && 'underline',
            'hidden md:block',
          ])}
        >
          {title}
        </span>
      </Link>
      <div className="step-indicator-item-line"></div>
    </div>
  )

  const nonInteractive = (
    <div
      className={buildClassList([
        'step-indicator-item relative'
      ])}
      data-testid={`stepIndicatorStep${stepNumber}`}
    >
      <div
        className={buildClassList([
          'step-indicator-item-link cursor-default',
          active ? 'text-black' : 'text-gray-600',
        ])}
        style={{ minWidth: '50px' }}
        aria-label={`Step ${stepNumber} ${title}`}
      >
        <div
          className={buildClassList([
            'step-indicator-item-step',
            'flex justify-center items-center w-8 h-8 text-sm',
            'sm:w-12 sm:h-12 rounded-full text-white md:mb-2',
            completed ? 'text-1.5xl' : 'sm:text-lg',
            active ? 'bg-gray-600' : 'bg-white text-gray-600 border-gray-600 border-3',
          ])}
        >
          {completed ? <Check className="text-sm sm:text-1.5xl" /> : stepNumber}
        </div>
        <span
          className={buildClassList([
            'step-indicator-item-span text-sm',
            active && 'font-bold text-gray-600',
            'hidden md:block',
          ])}
        >
          {title}
        </span>
      </div>
      <div className="step-indicator-item-line"></div>
    </div>
  )

  return disabled ? nonInteractive : interactive
}

StepIndicatorItem.propTypes = {
  title: PropTypes.string,
  completed: PropTypes.bool,
  path: PropTypes.string,
  stepNumber: PropTypes.number,
  active: PropTypes.bool,
  disabled: PropTypes.bool
}

export default StepIndicatorItem
