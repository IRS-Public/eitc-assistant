import PropTypes from 'prop-types'
import React from 'react'

const HeaderNav = ({ children }) => (
  <div className="header-nav">
    <ul className="flex text-white justify-end h-5 mt-2 whitespace-nowrap">{children}</ul>
  </div>
)

HeaderNav.propTypes = {
  children: PropTypes.any,
}

export default HeaderNav
