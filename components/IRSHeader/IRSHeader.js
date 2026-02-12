import React, { useContext } from 'react'
import Header from './Header'
import HeaderContext from '../../context/Header/HeaderContext'

const IRSHeader = () => {
  const { header } = useContext(HeaderContext)
  return (
    <Header
      headerNavItems={header.headerNavItems}
      mobileHeaderNavItems={header.mobileHeaderNavItems}
    />
  )
}

export default IRSHeader
