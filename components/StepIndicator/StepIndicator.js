import PropTypes from 'prop-types'
import React from 'react'
import { buildClassList } from '../../helpers'

const StepIndicator = ({ title, width, className, children }) => (
  <div className="text-center">
    {width < 769 && <p className="text-xl font-bold mb-4" data-testid="mobileStepIndicator">{title}</p>}
    <div
      id="stepIndicator"
      className={buildClassList([
        className,
        'flex justify-evenly w-full lg:w-3/4 my-5 sm:my-10 mx-auto relative',
      ])}
    >
      {children}
    </div>
  </div>
)

StepIndicator.propTypes = {
  title: PropTypes.string,
  width: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.any,
}

export default StepIndicator
