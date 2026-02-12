import React from 'react'
import PropTypes from 'prop-types'
import { buildClassList } from '../../helpers'

const AccordionItemBody = ({ isExpanded, children, id, padding = 'normal' }) => (
  // TODO: Create transition for when accordion is expanded

  <div
    id={id}
    className={buildClassList([
      isExpanded ? 'block' : 'hidden',
      padding === 'normal' && 'pl-11 pr-4 pb-4 pt-1',
      padding === 'small' && 'px-2',
      'accordionBody transition-all duration-500 ease-in-out',
    ])}
  >
    {children}
  </div>
)

AccordionItemBody.propTypes = {
  children: PropTypes.node.isRequired,
  isExpanded: PropTypes.bool,
  id: PropTypes.string,
  padding: PropTypes.string,
}

export default AccordionItemBody
