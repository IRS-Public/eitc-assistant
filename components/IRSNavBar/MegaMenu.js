/* eslint-disable jsx-a11y/role-supports-aria-props */
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { buildClassList, createIRSLinkPath } from '../../helpers'
import { CONTAINER_LG, TOP_OFFSET, ARROW_UP_KEYCODE, ARROW_DOWN_KEYCODE } from '../../helpers/constants'
import Link from '../Link'
import HeaderContext from '../../context/Header/HeaderContext'

const MegaMenu = ({ columns, columnKey, isOpen, top, href, dataTestId }) => {
  const { width, lang, langCode } = useContext(HeaderContext)

  const handleMegaMenuKeyDown = (e, key) => {
    if (e.keyCode === ARROW_UP_KEYCODE || e.keyCode === ARROW_DOWN_KEYCODE) {
      e.preventDefault()

      const keyStringArray = key.split('-')
      const tabNumber = parseInt(keyStringArray[1])
      const columnNumber = parseInt(keyStringArray[2])
      const listItem = parseInt(keyStringArray[3])
      let nextElementId = null
      let nextElement = null

      if (e.keyCode === ARROW_DOWN_KEYCODE) {
        nextElementId = `${keyStringArray[0]}-${tabNumber.toString()}-${columnNumber.toString()}-${(
          listItem + 1
        ).toString()}`

        nextElement = document.getElementById(nextElementId)

        if (nextElement) {
          nextElement.focus()
        } else {
          nextElementId = `${keyStringArray[0]}-${tabNumber.toString()}-${(columnNumber + 1).toString()}-${1}`

          nextElement = document.getElementById(nextElementId)

          if (nextElement) {
            nextElement.focus()
          } else {
            nextElementId = `navBar-${(tabNumber + 1).toString()}`
            nextElement = document.getElementById(nextElementId)

            if (nextElement) {
              nextElement.focus()
            }
          }
        }
      } else if (e.keyCode === ARROW_UP_KEYCODE) {
        if (listItem === 1 && columnNumber === 1) {
          nextElement = document.getElementById(`navBar-${tabNumber.toString()}`)

          if (nextElement) {
            nextElement.focus()

            return
          }
        }

        nextElementId = `${keyStringArray[0]}-${tabNumber.toString()}-${columnNumber.toString()}-${(
          listItem - 1
        ).toString()}`

        nextElement = document.getElementById(nextElementId)

        if (nextElement) {
          nextElement.focus()
        } else {
          nextElement = document
            .getElementById(`column-${tabNumber.toString()}-${(columnNumber - 1).toString()}`)
            .lastChild.getElementsByTagName('a')

          if (nextElement) {
            Array.from(nextElement)[0].focus()
          } else {
            nextElementId = `navBar-${(tabNumber - 1).toString()}`
            nextElement = document.getElementById(nextElementId)

            if (nextElement) {
              nextElement.focus()
            }
          }
        }
      }
    }
  }

  return (
    <div
      id={`${columnKey}-column`}
      aria-expanded={isOpen}
      aria-hidden={!isOpen}
      role="navigation"
      data-testid={dataTestId}
      style={width > CONTAINER_LG ? { top: top + TOP_OFFSET, zIndex: '-1' } : { top: 0 }}
      className={buildClassList([
        'subMenu w-full h-auto relative top-0 lg:fixed bg-gray-400 w-90 lg:w-screen z-50 lg:left-0 lg:shadow pb-4 lg:pb-0',
        isOpen ? 'visible' : 'invisible',
        width > CONTAINER_LG ? (isOpen ? 'visible opacity-100' : 'desktop') : isOpen ? 'block visible' : 'hidden',
      ])}
    >
      <div className="container lg:mx-auto mx-0">
        <div className="lg:flex">
          <Link
            href={createIRSLinkPath(href, langCode)}
            external
            data-testid={dataTestId}
            className="lg:hidden py-6 block"
            ariaLabel="Overview"
          >
            <span
              className="flex-grow text-left text-blue-500 font-bold hover:underline hover:text-blue-600 active:text-blue-800"
            >
              {lang('Overview')}
            </span>
          </Link>
          {columns.map((column) => (
            <div key={column.key} className="lg:flex flex-row lg:flex-col flex-1 lg:py-6 lg:pr-6" id={column.key}>
              {column.name === '&nbsp;' && width > CONTAINER_LG && <div style={{ marginBottom: '.5em' }}>&nbsp;</div>}
              {column.name !== '&nbsp;' && (
                <h2
                  className={buildClassList(['text-black uppercase font-bold', column.name && 'pb-2'])}
                  data-testid={column.dataTestId}
                >
                  {lang(column.name)}
                </h2>
              )}
              {column.list.map((item) => {
                const { key, text, subText, external, irsSite, ...i } = item
                return (
                  <div key={key} className="pb-1 lg:pb-3">
                    <Link
                      id={key}
                      data-testid={i.dataTestId}
                      onKeyDown={(e) => handleMegaMenuKeyDown(e, key)}
                      href={irsSite ? createIRSLinkPath(i.href, langCode) : i.href}
                      external={external}
                      ariaLabel={lang(text)}
                      className={buildClassList([
                        'mt-0 mb-4 block text-blue-500 font-bold',
                        'lg:mt-1 lg:mb-0',
                        'hover:underline hover:text-blue-600',
                        'active:text-blue-800',
                        'focus:text-blue-600',
                        subText ? 'lg:mt-1' : 'lg:mt-1',
                      ])}
                    >
                      {lang(text)}
                    </Link>
                    {subText && <p className="text-black hidden lg:block" data-testid={`${i.dataTestId}Text`}>{lang(subText)}</p>}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

MegaMenu.propTypes = {
  columns: PropTypes.any,
  isOpen: PropTypes.bool,
  columnKey: PropTypes.any,
  dataTestId: PropTypes.any,
  top: PropTypes.any,
  href: PropTypes.any,
}

export default MegaMenu
