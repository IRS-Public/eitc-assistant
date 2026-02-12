import React, { useContext, useEffect } from 'react'
import NavBar from './NavBar'
import HeaderContext from '../../context/Header/HeaderContext'
import { SPACE_BAR_KEYCODE, ARROW_DOWN_KEYCODE, TAB_KEYCODE } from '../../helpers/constants'

const IRSNavBar = () => {
  const { header, toggleNav, submitSearch } = useContext(HeaderContext)

  // @todo combine navItems, searchItems and navItemsIsOpen into one function
  /** grab only the link items */
  const navItems
    = header.navBar
    && Object.values(header.navBar).map((item) =>
      (item.type === 'link' ? item.key : '')
    )
  const cleanNav = navItems.filter((entry) => entry.trim() !== '')

  /** grab the search item */
  const searchItems
    = header.navBar
    && Object.values(header.navBar).map((item) =>
      (item.type === 'search' ? item.key : '')
    )
  const cleanSearchItems = searchItems.filter((entry) => entry.trim() !== '')

  /** grab the open nav item link */
  const navItemsIsOpen
    = header.navBar
    && Object.values(header.navBar).map((item) => (
      item.type === 'link' ? item.isOpen : ''
    ))
  const cleanNavIsOpen = navItemsIsOpen.filter((entry) => entry !== '')

  useEffect(() => {
    const handleKeyDown = (ev) => {
      const { activeElement } = document

      if (cleanNav.includes(activeElement.id)) {
        if (ev.keyCode === SPACE_BAR_KEYCODE || ev.keyCode === ARROW_DOWN_KEYCODE) {
          ev.preventDefault()
          ev.stopPropagation()
          toggleNav(activeElement.id)
        }
      }

      if (activeElement.id === 'navBarSearchButton' && ev.keyCode === SPACE_BAR_KEYCODE) {
        submitSearch('navBarSearchForm')
      }

      if (activeElement.id === 'headerSearchButton' && ev.keyCode === SPACE_BAR_KEYCODE) {
        submitSearch('headerSearchForm')
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [cleanNavIsOpen, cleanNav, toggleNav, submitSearch])

  useEffect(() => {
    const handleKeyUp = (ev) => {
      const { activeElement } = document

      if (cleanNav.includes(activeElement.id)) {
        if (ev.keyCode === TAB_KEYCODE) {
          cleanNavIsOpen.forEach((item) => {
            if (item) {
              toggleNav(activeElement.id)
            }
          })
        }
      }

      if (cleanSearchItems.includes(activeElement.id)) {
        toggleNav(null)
      }
    }

    window.addEventListener('keyup', handleKeyUp)

    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [cleanNavIsOpen, cleanNav, cleanSearchItems, toggleNav])

  return <NavBar items={header.navBar} headerNavItems={header.headerNavItems} />
}

export default IRSNavBar
