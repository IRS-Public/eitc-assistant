const linkPath = (href, langCode) => {
  const irs = 'https://www.irs.gov'
  return langCode && langCode !== 'en' ? `${irs}/${langCode}${href}` : `${irs}${href}`
}

export default linkPath
