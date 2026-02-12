import PropTypes from 'prop-types'
import React, { useContext, useEffect } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import Link from '../Link'
import HeaderContext from '../../context/Header/HeaderContext'

const LangSwitcher = ({ list, switchLanguage, langSwitcherTestId }) => {
  const { header, headerDispatch, toggleMenu } = useContext(HeaderContext)
  const { push } = useRouter()

  const toggle = (value) => {
    headerDispatch({
      type: 'TOGGLE_LANG',
      payload: value,
    })
  }

  const changeLang = (e) => {
    e.preventDefault()
    if (e.target.pathname && e.target.lang) {
      push(e.target.pathname)
      toggle(false)
      switchLanguage(e.target.lang)

      const newParams = {
        ...header.params,
        location: {
          ...header.params.location,
          langCode: e.target.lang
        }
      }
      headerDispatch({
        type: 'UPDATE_PARAMS',
        payload: newParams,
      })
    }
  }

  const getList = () =>
    list.map((item) => (
      <li key={item.key} className={item.langCode}>
        <Link
          langCode={item.langCode}
          href={item.href}
          onClick={(e) => {
            changeLang(e)
            if (header.menuState) {
              toggleMenu(e)
            }
          }}
          className={clsx(
            'languageLink text-blue-500 p-4 block text-left font-bold leading-none',
            'hover:text-blue-600 focus:text-blue-600 active:text-blue-800',
          )}
          data-testid={`${item.dataTestId}${langSwitcherTestId}`}
        >
          {item.text}
        </Link>
      </li>
    ))

  useEffect(() => {
    const handleClick = (e) => {
      const closestEl = e.target.closest('#dropdownMenu')
      const langButton = document.getElementById('languageButton')
      const navLangButton = document.getElementById('navLangButton')

      if (e.target === langButton || e.target === navLangButton) {
        return
      }

      if (!closestEl) {
        toggle(false)
      }
    }

    document.body.addEventListener('click', handleClick)

    return () => {
      document.body.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <>
      <ul
        id="dropdownMenu"
        className={clsx(
          'dropdownMenu bg-gray-400 ',
          'lg:absolute lg:z-50 lg:w-48 lg:mt-2 lg:border-gray-400 lg:shadow',
          header.langState ? 'visible' : 'hidden',
        )}
      >
        {list && getList(list)}
      </ul>
    </>
  )
}

LangSwitcher.propTypes = {
  list: PropTypes.array,
  switchLanguage: PropTypes.func,
}

export default LangSwitcher