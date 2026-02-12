import React from 'react'
import PropTypes from 'prop-types'
import Replacement from './Replacement'

const propTypes = {
  level: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']).isRequired,
  children: PropTypes.node.isRequired,
}

export default function Heading({ level, children, replace, ...rest }) {
  switch (level) {
    case '1':
      return <h1 {...rest}><Replacement text={children} replace={replace} /></h1>
    case '2':
      return <h2 {...rest}><Replacement text={children} replace={replace} /></h2>
    case '3':
      return <h3 {...rest}><Replacement text={children} replace={replace} /></h3>
    case '4':
      return <h4 {...rest}><Replacement text={children} replace={replace} /></h4>
    case '5':
      return <h5 {...rest}><Replacement text={children} replace={replace} /></h5>
    case '6':
      return <h6 {...rest}><Replacement text={children} replace={replace} /></h6>
    default:
      return <div {...rest}><Replacement text={children} replace={replace} /></div>
  }
}

Heading.propTypes = propTypes
