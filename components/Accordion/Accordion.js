import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

const Accordion = ({ level = '2', gaLabel, multiItem, children, borderColor = '500' }) => {
  const [activeIndex, setActiveIndex] = useState(null)

  const clonedChildren = React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      level,
      multiItem,
      gaLabel,
      activeIndex,
      setActiveIndex,
      index
    })
  )

  return (
    <div
      data-testid="accordion"
      className={clsx('border-l border-r border-b', `border-gray-${borderColor}`)}
    >
      {clonedChildren}
    </div>
  )
}

Accordion.propTypes = {
  level: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']),
  multiItem: PropTypes.bool,
  gaLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Accordion
