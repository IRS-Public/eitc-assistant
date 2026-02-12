import React, { useState } from 'react'
import PropTypes from 'prop-types'

const AccordionItem = ({
  id,
  level,
  multiItem,
  gaLabel,
  disabled,
  activeIndex,
  setActiveIndex,
  index,
  children,
  isOpen = false,
  dataTestId
}) => {
  const [isExpanded, setIsExpanded] = useState(isOpen)

  const clonedChildren = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      id,
      level,
      multiItem,
      gaLabel,
      isExpanded,
      setIsExpanded,
      disabled,
      activeIndex,
      setActiveIndex,
      index,
      isOpen,
      dataTestId
    })
  )

  return clonedChildren
}

AccordionItem.propTypes = {
  id: PropTypes.string,
  level: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default AccordionItem
