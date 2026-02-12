import PropTypes from 'prop-types'
import React, { useState, useEffect, createRef, useContext } from 'react'
import clsx from 'clsx'
import { CONTAINER_LG, TOP_OFFSET } from '../../helpers/constants'
import IRSLogo from '../Icons/IRSLogo'
import { HeaderNavItem } from '../IRSHeader'
import NavBarItem from './NavBarItem'
import HeaderContext from '../../context/Header/HeaderContext'
import Link from '../Link'

const NavBar = ({ items, className, headerNavItems, ...rest }) => {
  const { header, width, toggleNav, langCode } = useContext(HeaderContext)
  const [navTop, setNavTop] = useState(1)
  const [navItemTop, setNavItemTop] = useState(0)
  const logoLink
    = langCode === undefined || langCode === 'en' ? 'https://www.irs.gov/' : `https://www.irs.gov/${langCode}`

  useEffect(() => {
    window.addEventListener(
      'scroll',
      () => {
        const navDiv = document.getElementById('nav-container')
        if (navDiv) {
          setNavTop(navDiv.getBoundingClientRect().top)
          setNavItemTop(Math.round(navDiv.getBoundingClientRect().bottom) - TOP_OFFSET)
        }
      },
      {
        capture: true,
        passive: true,
      }
    )
  }, [])

  const mainNavBarItems
    = items
    // && Object.values(items).map(({ key, href, text, active, type, columns, isOpen, external, dataTestId }) => {
    && Object.values(items).map((item) => (
      <NavBarItem
        key={item.key}
        columnKey={item.key}
        dataTestId={item.dataTestId}
        href={item.href}
        active={item.active}
        type={item.type}
        columns={item.columns}
        top={navItemTop}
        isOpen={item.isOpen}
        navTop={navTop}
        external={item.external}
      >
        {item.text}
      </NavBarItem>
    ))

  const secondMenu = headerNavItems && headerNavItems.map(
    ({ text, key, ...otherProps }, i) =>
      i !== 0 && (
        <HeaderNavItem inIRSMenu key={key} languageButton="navLangButton" langSwitcherTestId="Mobile" {...otherProps}>
          {text}
        </HeaderNavItem>
      )
  )

  const ref = createRef()

  useEffect(() => {
    const handleClick = (e) => {
      const closestEl = e.target.closest('.subMenu')
      const someOpen = items.some((item) => item.isOpen)
      const elemId = e.target.id

      if (!closestEl && someOpen && !elemId.includes('navBar')) {
        toggleNav(null)
      }
    }

    document.body.addEventListener('click', handleClick)

    return () => {
      document.body.removeEventListener('click', handleClick)
    }
  }, [items])

  return (
    <nav
      id="nav-container"
      ref={ref}
      role="application"
      aria-label="Main Navigation"
      className={clsx(
        'navBar overflow-y-auto overflow-x-hidden bg-blue-500 lg:overflow-visible lg:bg-blue-700 z-30',
        width >= CONTAINER_LG ? 'isStickyNav' : 'absolute slideOut h-full',
        'lg:w-auto lg:block ',
        header.menuState ? 'block slideIn ' : 'hidden',
        parseInt(navTop) <= 0 && width > CONTAINER_LG ? 'isStickyLogo' : ''
      )}
      {...rest}
    >
      <ul
        className={clsx(
          'navList flex flex-col h-auto lg:flex-row lg:mx-auto',
          width >= CONTAINER_LG && 'container'
        )}
      >
        <li className="navItem logo-nav hidden">
          <Link href={logoLink} external>
            <IRSLogo className="h-6 w-16 mt-2-5 mr-5 text-white" focusable="false" />
          </Link>
        </li>
        {mainNavBarItems}
      </ul>

      <ul className="secondMenu h-auto lg:hidden bg-blue-500 text-white pb-32 lg:pb-0 mt-2">{secondMenu}</ul>
    </nav>
  )
}

NavBar.propTypes = {
  className: PropTypes.any,
  headerNavItems: PropTypes.array,
  items: PropTypes.array,
}

export default NavBar
