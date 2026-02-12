import PropTypes from 'prop-types'
import React from 'react'

/**
 * List
 * @param {object} props - The props
 * @returns {node} - DOM node
 */
export default function List({ type = 'ul', children, ...otherProps }) {
  if (type === 'ol') {
    return (
      <ol {...otherProps}>
        {children}
      </ol>
    )
  }

  return (
    <ul {...otherProps}>
      {children}
    </ul>
  )
}

List.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['ul', 'ol']),
}

/**
 * ListItem
 * @param {object} props - The props
 * @returns {node} - DOM node
 */
export function ListItem(props) {
  const { children, ...otherProps } = props
  return (
    <li {...otherProps}>
      {children}
    </li>
  )
}

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
}
