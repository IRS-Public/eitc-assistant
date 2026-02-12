import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faHandsHelping } from '@fortawesome/free-solid-svg-icons'

const iconList = {
  Book: (
    <FontAwesomeIcon
      className="header-icon icon-book hidden lg:inline-block"
      icon={faBook}
      height="1em"
      width="1em"
    />
  ),
  HandsHelping: (
    <FontAwesomeIcon
      className="header-icon icon-hands-helping hidden lg:inline-block"
      icon={faHandsHelping}
      height="1em"
      width="1em"
    />
  ),
}

const Links = ({
  href,
  className,
  children,
  langCode,
  external = false,
  icon,
  router = false,
  ariaLabel,
  dataTestId,
  ...rest
}) => {
  if (router) {
    return (
      <Link legacyBehavior href={href}>
        <a aria-label={ariaLabel} className={clsx(className)} data-testid={dataTestId}>{children}</a>
      </Link>
    )
  }
  return (
    <a
      href={href}
      className={clsx(className)}
      target={external ? '_blank' : '_self'}
      lang={langCode}
      xmlLang={langCode}
      rel={external ? 'noopener noreferrer' : ''}
      aria-label={external ? `${ariaLabel} This link will open in a new window.` : ariaLabel}
      data-testid={dataTestId}
      {...rest}
    >
      {icon && iconList[icon]}
      {children}
      {/* {external && ( */}
      {/*  <span className="sr-only">This link will open in a new window.</span> */}
      {/* )} */}
    </a>
  )
}

export default Links
