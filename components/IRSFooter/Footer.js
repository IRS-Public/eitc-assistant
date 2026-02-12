import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import IRSLogo from '../Icons/IRSLogo'
import FooterContext from '../../context/Footer/FooterContext'
import Link from '../Link'
import { createIRSLinkPath } from '../../helpers'

const Footer = ({ children, footerLinks, dataTestId, ...props }) => {
  const { lang, langCode } = useContext(FooterContext)
  const logoLink = langCode === undefined || langCode === 'en'
    ? 'https://www.irs.gov/'
    : `https://www.irs.gov/${langCode}`

  const footerLinksGroup = footerLinks.map((item) => (
    <li key={item.key} className="footerLink md:ml-2 mt-0 mb-4 md:my-3 md:my-0 h-5">
      <Link
        className="inline-block md:border-r md:pr-2 hover:underline"
        external={item.external}
        href={item.irsSite ? createIRSLinkPath(item.href, langCode) : item.href}
        dataTestId={item.dataTestId}
        ariaLabel={lang(item.text)}
      >
        {lang(item.text)}
      </Link>
    </li>
  ))

  return (
    <footer className="footer mt-auto" {...props}>
      {children}
      <div className="text-white bg-black">
        <div className="container">
          <div className="flex flex-col md:flex-row text-center">
            <div>
              <a
                href={logoLink}
                data-testid="footerLogo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IRS Home"
              >
                <IRSLogo className="h-7 block mx-auto my-5 md:my-3 text-white md:-ml-3" focusable={false} />
              </a>
            </div>
            <ul className="md:flex flex-grow md:justify-end mt-0 mb-2 md:mb-0 md:mt-1 text-center">
              {footerLinksGroup}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  children: PropTypes.any,
  dataTestId: PropTypes.any,
  footerLinks: PropTypes.any,
}

export default Footer
