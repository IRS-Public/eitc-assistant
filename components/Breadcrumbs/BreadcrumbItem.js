import PropTypes from 'prop-types'
import React from 'react'
import Link from '../Link'
import { buildClassList } from '../../helpers'

const BreadcrumbItem = ({ children, route, href, className, testID, ...otherProps }) => {
  const renderChildren = () => {
    if (typeof route === 'string' && route.length > 0) {
      return (
        <span>
          <Link
            href={route}
            router
            className="text-blue-500 hover:text-blue-600 active:text-blue-800 underline"
            dataTestId={`breadcrumb${testID}`}
          >
            {children}
          </Link>
        </span>
      )
    }

    if (typeof href === 'string' && href.length) {
      return (
        <span>
          <Link
            href={href}
            dataTestId={`breadcrumb${testID}`}
            target="_blank"
            rel="noopener"
            className="text-blue-500 hover:text-blue-600 active:text-blue-800 underline px-2"
          >
            {children}
          </Link>
        </span>
      )
    }

    return <span aria-current="page" className="px-2" data-testid="breadcrumbCurrentPage">{children}</span>
  }

  return (
    <li className={buildClassList(['breadcrumb', className])} {...otherProps}>
      {renderChildren()}
    </li>
  )
}

BreadcrumbItem.propTypes = {
  children: PropTypes.node.isRequired,
  route: PropTypes.string,
  href: PropTypes.string,
  dataTestId: PropTypes.any,
  className: PropTypes.string,
}

export default BreadcrumbItem