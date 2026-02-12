import numeral from 'numeral'
import 'numeral/locales'

const formatOrdinal = (number = 1, langCode = 'en') => {
  const newNumeral = numeral

  let tempLangCode = langCode

  if (langCode === 'zh-hant' || langCode === 'zh-hans') {
    tempLangCode = 'chs'
  }

  if (langCode === 'ko' || langCode === 'ht') {
    tempLangCode = 'en'
  }

  newNumeral.locale(tempLangCode)

  return (newNumeral(number).format('0o'))
}

export default formatOrdinal
