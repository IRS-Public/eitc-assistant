import PropTypes from 'prop-types'
import React, { useState, useContext, useEffect } from 'react'
import Alert from '../components/Alert'
import IRSHeader from '../components/IRSHeader'
import IRSNavBar from '../components/IRSNavBar'
import IRSFooter from '../components/IRSFooter'
import language from '../components/Language'
import HeaderContext from '../context/Header/HeaderContext'
import FooterContext from '../context/Footer/FooterContext'
import footer from '../context/Footer/footer.json'
import { routes } from './helpers'

const MainTemplate = ({ children }) => {
  const { header, toggleMenu, langCode } = useContext(HeaderContext)
  const [showUntranslated, setShowUntranslated] = useState(false)
  const root = typeof window !== 'undefined' ? document.getElementsByTagName('html')[0] : null

  const langCodeCheck = () => {
    const temp = Object.keys(header.langList)

    if (!temp.includes(langCode) && langCode !== undefined) {
      if (typeof window !== 'undefined') {
        window.location.replace(routes(langCode, 'twe').localhost)
      }
    }
  }

  const lang = (key, replacements) => (
    language(key, replacements, langCode)
  )

  const Footer = {
    footer,
    lang,
    langCode,
  }

  useEffect(() => {
    langCodeCheck()

    setShowUntranslated(!header.langList[langCode || 'en'])
    root.setAttribute('lang', langCode || 'en')
  }, [langCode])

  useEffect(() => {
    langCodeCheck()
  }, [])

  return (
    <>
      <IRSHeader />
      <IRSNavBar />
      <div role="main" id="main-content" className="container mb-20">
        <div
          // tabIndex="0"
          id="overlay"
          onClick={() => toggleMenu()}
          style={{ display: header.menuState ? 'block' : 'none' }}
          role="main"
        ></div>

        {showUntranslated && (
          <Alert
            title={lang('global.heading.nonTranslatedWarning')}
            id="untranslatedWarning"
            type="warning"
            gaLabel="TWE Untranslated Warning"
            data-testid="untranslated"
          >
            {lang('global.p.nonTranslatedWarning')}
          </Alert>
        )}

        {children}

      </div>
      <FooterContext.Provider value={Footer}>
        <IRSFooter />
      </FooterContext.Provider>
    </>
  )
}

MainTemplate.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainTemplate
