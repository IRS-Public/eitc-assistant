import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import FooterContext from '../../context/Footer/FooterContext'
import Link from '../Link'

const FooterTopGroupItem = ({ children, href, dataTestId, to, ...props }) => {
  const { lang } = useContext(FooterContext)

  if (typeof href === 'string' && href.length) {
    return (
      <li {...props}>
        <Link href={href}>{lang(children)}</Link>
      </li>
    )
  }

  if (typeof to === 'string' && to.length) {
    return (
      <li {...props}>
        <Link to={to}>{lang(children)}</Link>
      </li>
    )
  }

  return <li {...props}>{lang(children)}</li>
}

FooterTopGroupItem.propTypes = {
  children: PropTypes.any,
  dataTestId: PropTypes.any,
  href: PropTypes.shape({
    length: PropTypes.any,
  }),
  to: PropTypes.shape({
    length: PropTypes.any,
  }),
}

export default FooterTopGroupItem
