import PropTypes from 'prop-types'
import { useEffect, useReducer, useState } from 'react'
import Head from 'next/head'
import TagManager from 'react-gtm-module'
import language from '../components/Language'
import HeaderContext from '../context/Header/HeaderContext'
import HeaderReducer from '../context/Header/HeaderReducer'
import header from '../context/Header/header.json'
import SiteContext from '../context/Site/SiteContext'
import SiteReducer from '../context/Site/SiteReducer'
import site from '../context/Site/site.json'
import { TOGGLE_LANG, TOGGLE_SEARCH, TOGGLE_MENU, TOGGLE_NAV } from '../context/types'
import '../public/css/react-datepicker.min.css'
import '../styles/index.css'
import '../components/Spinner/Spinner.css'
import stage from '../templates/eitc/stage'

function MyApp({ Component, pageProps, router }) {
  const tagManagerArgs = {
    gtmId: 'GTM-KV978ZL',
  }

  const { query } = router
  const langCode = query.langCode || 'en'
  const initialHeaderState = {
    header,
  }

  const initialSiteState = {
    site,
  }

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  }

  const w = { width: 992 }
  const [windowDimensions, setWindowDimensions] = useState(w)
  const { width } = windowDimensions
  const [headerState, headerDispatch] = useReducer(HeaderReducer, initialHeaderState)
  const [siteState, siteDispatch] = useReducer(SiteReducer, initialSiteState)
  const rootEl = typeof window !== 'undefined' ? document.getElementsByTagName('html')[0] : null

  useEffect(() => {
    TagManager.initialize(tagManagerArgs)

    if (typeof window !== 'undefined') {
      if (!header.menuState) {
        document.body.classList.remove('openMenu')
        rootEl.removeAttribute('class', 'openMenu')
      }
    }

    const handleResize = () => {
      setWindowDimensions(getWindowDimensions())
    }

    setWindowDimensions(getWindowDimensions())

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleLang = () => {
    headerDispatch({
      type: TOGGLE_LANG,
      payload: !headerState.header.langState,
    })
  }

  const toggleSearch = (e) => {
    if (e) {
      e.preventDefault()
      window.setTimeout(() => {
        document.getElementById('header-search').focus()
      }, 0)
    }

    const newSearch = {
      ...headerState.header.search,
      show: !headerState.header.search.show,
    }

    headerDispatch({
      type: TOGGLE_SEARCH,
      payload: newSearch,
    })

    if (headerState.header.menuState) {
      headerDispatch({
        type: TOGGLE_MENU,
        payload: !headerState.header.menuState,
      })
    }
  }

  const toggleMenu = (e) => {
    if (e) {
      e.preventDefault()
    }

    headerDispatch({
      type: TOGGLE_MENU,
      payload: !headerState.header.menuState,
    })

    if (headerState.header.search.show) {
      toggleSearch()
    }

    const addBodyClass = () => document.body.classList.add('openMenu')
    const removeBodyClass = () => document.body.classList.remove('openMenu')

    const root = document.getElementsByTagName('html')[0]

    headerState.header.menuState ? removeBodyClass() : addBodyClass()
    headerState.header.menuState ? root.removeAttribute('class', 'openMenu') : root.setAttribute('class', 'openMenu')
  }

  const toggleNav = (key) => {
    headerDispatch({
      type: TOGGLE_NAV,
      payload: key,
    })
  }

  const submitSearch = (formID) => {
    document.getElementById(formID).submit()
  }

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.keyCode === 27) {
        toggleNav(null)
        if (headerState.header.search.show) {
          toggleSearch()
        }
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [headerState.header.search.show])

  const lang = (key, replacements) => (
    language(key, replacements, langCode)
  )

  const Header = {
    header: headerState.header,
    headerDispatch,
    toggleMenu,
    toggleLang,
    toggleSearch,
    toggleNav,
    submitSearch,
    width,
    lang,
    langCode,
  }

  const EITC = {
    site: siteState.site,
    siteDispatch,
    width,
    lang,
    langCode,
  }

  return (
    <>
      <Head> 
      </Head>

      <HeaderContext.Provider value={Header}>
        <SiteContext.Provider value={EITC}>
          <Component {...pageProps} key={router.asPath} />
        </SiteContext.Provider>
      </HeaderContext.Provider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.func,
  router: PropTypes.any,
}

export default MyApp
