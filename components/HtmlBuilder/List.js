import PropTypes from 'prop-types'
import React from 'react'
import Replacement from './Replacement'
import clsx from "clsx";

const List = ({ type, children, className, show = true, ...otherProps }) => {
  if (type === 'ol') {
    return (
      <ol className={className} {...otherProps}>
        {children}
      </ol>
    )
  }

  return <ul className={clsx(
    className,
    'fade-in',
    show ? 'block' : 'hidden'
  )}>{children}</ul>
}

export function ListItem({ children, replace, ...otherProps }) {
  return (
    <li className="my-1" {...otherProps}>
      <Replacement text={children} replace={replace} />
    </li>
  )
}

List.propTypes = {
  type: PropTypes.any,
  children: PropTypes.any,
  className: PropTypes.any,
}

ListItem.propTypes = {
  children: PropTypes.any,
  replace: PropTypes.any,
}

export default List
