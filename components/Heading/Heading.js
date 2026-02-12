import React from 'react'
import PropTypes from 'prop-types'

/**
 * Returns a specific heading based on the value of the level prop
 * @param {object} props - the props
 * @returns {node} - DOM node
 */
const Heading = ({ level, dataTestId, children, show = true, ...otherProps }) => {
  if (!show) {
    return null
  }

  switch (level) {
    case '1':
      return <h1 data-testid={dataTestId} {...otherProps}>{children}</h1>
    case '2':
      return <h2 data-testid={dataTestId} {...otherProps}>{children}</h2>
    case '3':
      return <h3 data-testid={dataTestId} {...otherProps}>{children}</h3>
    case '4':
      return <h4 data-testid={dataTestId} {...otherProps}>{children}</h4>
    case '5':
      return <h5 data-testid={dataTestId} {...otherProps}>{children}</h5>
    case '6':
      return <h6 data-testid={dataTestId} {...otherProps}>{children}</h6>
    default:
      return <div data-testid={dataTestId}>{children}</div>
  }
}

Heading.propTypes = {
  level: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']).isRequired,
  children: PropTypes.node.isRequired,
  dataTestId: PropTypes.string,
  show: PropTypes.bool
}

export default Heading
