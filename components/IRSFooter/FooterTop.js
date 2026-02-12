import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookSquare,
  faInstagram,
  faLinkedinIn,
  faTwitterSquare,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'
import ExternalLink from '../Icons/ExternalLink'
import { createIRSLinkPath, gaEvent } from '../../helpers'
import FooterContext from '../../context/Footer/FooterContext'
import FooterTopGroup from './FooterTopGroup'
import Link from '../Link'
import IRSEagle from '../Icons/IRSEagle'

const icons = {
  facebookIcon: faFacebookSquare,
  twitterIcon: faTwitterSquare,
  youtubeIcon: faYoutube,
  linkin: faLinkedinIn,
  instagram: faInstagram,
}

const FooterTop = ({ sitemap, socialLinks = [], ...props }) => {
  const { lang, langCode } = useContext(FooterContext)

  const isOutbound = (link) => {
    if (link.outBound) {
      gaEvent('Outbound Links', 'Outbound Links', 'Click', link.href)
    }
  }

  const sitemapGroup = sitemap.map(({ text, list, key }) => (
    <FooterTopGroup key={key} text={text}>
      {list.map(({ text, href, key, linkLangCode, external, irsSite, dataTestId, outBound, externalIcon }) => (
        <li className="column mb-5 text-black" key={key}>
          <Link
            href={irsSite ? createIRSLinkPath(href, langCode) : href}
            data-testid={dataTestId}
            external={external}
            langCode={linkLangCode}
            className="hover:underline leading-none"
            ariaLabel={lang(text)}
            onClick={() =>
              isOutbound({
                outBound,
                href,
              })
            }
          >
            {lang(text)}
            {
              externalIcon
              && (
                <ExternalLink
                  className="ml-1 relative inline"
                  style={{ top: '3px' }}
                  focusable={false}
                  height="1rem"
                  width="1rem"
                  data-testid="externalLink"
                />
              )
            }
          </Link>
        </li>
      ))}
    </FooterTopGroup>
  ))

  const socialLinksGroup = socialLinks.map((link) => (
    <li key={link.key} className="mr-2">
      <Link
        tabIndex="0"
        aria-label={`${link.title} This link will open in a new window.`}
        href={link.irsSite ? createIRSLinkPath(link.href, langCode) : link.href}
        external
        className="block"
        data-testid={link.dataTestId}
        onClick={() => isOutbound(link)}
      >
        {link.src === 'IRSFooterTopIcon' && (
          <IRSEagle aria-hidden="true" width="31px" height="27px" focusable={false} className="irs-2go" />
        )}
        {link.src !== 'IRSFooterTopIcon' && (
          <FontAwesomeIcon
            icon={icons[link.src]}
            className="social-icons"
            focusable={false}
            height="2em"
            width="2em"
            data-testid={link.dataTestId}
          />
        )}
      </Link>
    </li>
  ))

  return (
    <div className="footerTop text-black bg-gray-400 flex-shrink border-t-5 border-black" {...props} role="navigation">
      <div className="menuGroup container pt-5 md:pt-11 pb-2">
        <div className="flex flex-col md:flex-row">{sitemapGroup}</div>
        <ul className="flex md:justify-end mt-5 md:mt-15 md:-mr-2">{socialLinksGroup}</ul>
      </div>
    </div>
  )
}

FooterTop.propTypes = {
  sitemap: PropTypes.any,
  dataTestId: PropTypes.any,
  socialLinks: PropTypes.array,
}

export default FooterTop
