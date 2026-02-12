import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { buildClassList, createIRSLinkPath } from '../../helpers'
import { CONTAINER_LG, ARROW_DOWN_KEYCODE, ARROW_LEFT_KEYCODE, ARROW_RIGHT_KEYCODE } from '../../helpers/constants'
import SearchField from '../SearchField'
import Plus from '../Icons/Plus'
import Minus from '../Icons/Minus'
import Link from '../Link'
import HeaderContext from '../../context/Header/HeaderContext'
import MegaMenu from './MegaMenu'

const NavBarItem = ({
  type,
  href,
  children,
  external,
  active = false,
  className,
  columnKey,
  dataTestId,
  columns,
  action,
  placeholder,
  top,
  isOpen,
  navTop,
  ...otherProps
}) => {
  const { header, width, toggleNav, lang, langCode } = useContext(HeaderContext)

  const handelClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isOpen) {
      toggleNav(null)
    } else {
      if (width > CONTAINER_LG) {
        const win = external
          ? window.open(createIRSLinkPath(href, langCode), '_blank')
          : window.open(createIRSLinkPath(href, langCode), '_self')
        win.focus()
      } else {
        toggleNav(columnKey)
      }
    }
  }

  const handleNavTabKeyDown = (e) => {
    if (e.keyCode === ARROW_LEFT_KEYCODE || e.keyCode === ARROW_RIGHT_KEYCODE || e.keyCode === ARROW_DOWN_KEYCODE) {
      e.preventDefault()

      const tabNumber = parseInt(e.target.id.split('-')[1])
      let nextElement = null

      if (e.keyCode === ARROW_DOWN_KEYCODE) {
        document.getElementById(`list-${tabNumber}-1-1`).focus()
      } else if (e.keyCode === ARROW_LEFT_KEYCODE) {
        nextElement = document.getElementById(`navBar-${(tabNumber - 1).toString()}`)

        if (nextElement) {
          if (isOpen) {
            toggleNav(null)
            nextElement.focus()
            toggleNav(document.activeElement.id)
          } else {
            nextElement.focus()
          }
        }
      } else if (e.keyCode === ARROW_RIGHT_KEYCODE) {
        nextElement = document.getElementById(`navBar-${(tabNumber + 1).toString()}`)

        if (nextElement && tabNumber !== 28) {
          if (isOpen) {
            toggleNav(null)
            nextElement.focus()
            toggleNav(document.activeElement.id)
          } else {
            nextElement.focus()
          }
        }
      }
    }
  }

  let ariaLabel = null

  if (isOpen) {
    ariaLabel
      = width > CONTAINER_LG
        ? `${children} menu has additional options and use space bar to close the sub menu or enter to navigate to the page.`
        : `${children} menu has additional options and use space bar to close the sub menu.`
  } else {
    ariaLabel
      = width > CONTAINER_LG
        ? `${children} menu has additional options and use space bar to open the sub menu or enter to navigate to the page.`
        : `${children} menu has additional options and use space bar to open the sub menu.`
  }

  const formAction
    = langCode === 'en' || langCode === undefined
      ? `https://www.irs.gov${header.search.action}`
      : `https://www.irs.gov/${langCode}${header.search.action}`

  const formPlaceholder
    = langCode === 'en' || langCode === undefined ? header.search.placeholder.en : header.search.placeholder[langCode]

  return (
    <li
      onClick={() => { }}
      className={buildClassList([
        'navItem border-b border-blue-500 self-stretch',
        'lg:border-none',
        className,
        type === 'search' ? 'searchNav flex-grow ' : null,
      ])}
      {...otherProps}
    >
      {type === 'link' && (
        <>
          <Link
            id={columnKey}
            data-testid={dataTestId}
            href={createIRSLinkPath(href, langCode)}
            aria-controls={`${columnKey}-column`}
            aria-expanded={isOpen}
            ariaLabel={ariaLabel}
            onClick={handelClick}
            external={external}
            onKeyDown={(e) => handleNavTabKeyDown(e)}
            className={buildClassList([
              'block w-full px-5 py-3 flex bg-blue-700',
              'lg:focus:bg-gray-400 lg:focus:text-blue-500',
              'lg:hover:bg-gray-400 lg:hover:text-blue-500',
              isOpen && width > CONTAINER_LG
                ? 'lg:bg-gray-400 lg:text-blue-500'
                : active
                  ? 'active lg:bg-blue-700 text-white lg:font-bold'
                  : 'text-white lg:bg-blue-600',
            ])}
          >
            <span className="flex-grow text-left lg:whitespace-nowrap text-lg lg:text-base pointer-events-none" tabIndex="-1">{lang(children)}</span>
            {isOpen ? (
              <Minus className="lg:hidden mt-1minus" focusable={false} />
            ) : (
              <Plus className="lg:hidden mt-1minus" focusable={false} />
            )}
          </Link>
          {columns && (
            <MegaMenu
              columns={columns}
              columnKey={columnKey}
              isOpen={isOpen}
              top={top}
              href={href}
              data-testid={dataTestId}
            />
          )}
        </>
      )}

      {type === 'search' && (
        <SearchField
          id={columnKey}
          formID="navBarSearchForm"
          dataTestId="searchBoxDesktop"
          buttonId="navBarSearchButton"
          className={buildClassList(['hidden mt-2-5 h-6 mb-2-5 w-full ml-auto', header.search.show ? 'block' : ''])}
          style={{ maxWidth: '250px', maxHeight: '24px', lineHeight: '18px' }}
          placeholder={formPlaceholder}
          action={formAction}
          external={header.search.external}
          label={lang(header.search.label)}
          btnLabel={lang(header.search.btnLabel)}
        />
      )}
    </li>
  )
}

NavBarItem.propTypes = {
  action: PropTypes.any,
  active: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.any,
  columnKey: PropTypes.any,
  columns: PropTypes.array,
  dataTestId: PropTypes.any,
  external: PropTypes.any,
  href: PropTypes.any,
  isOpen: PropTypes.any,
  navTop: PropTypes.any,
  placeholder: PropTypes.any,
  top: PropTypes.any,
  type: PropTypes.string,
}

export default NavBarItem
