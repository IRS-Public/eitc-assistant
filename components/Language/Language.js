import langEN from '../../context/langs/lang-en.json'
import langES from '../../context/langs/lang-es.json'
import langZHHANS from '../../context/langs/lang-zh-hans.json'
import langZHHANT from '../../context/langs/lang-zh-hant.json'
import langKO from '../../context/langs/lang-ko.json'
import langRU from '../../context/langs/lang-ru.json'
import langVI from '../../context/langs/lang-vi.json'
import langHT from '../../context/langs/lang-ht.json'

const language = (key, replacements = {}, langCode = 'en') => {
  const list = {
    en: langEN,
    es: langES,
    'zh-hant': langZHHANT,
    'zh-hans': langZHHANS,
    ko: langKO,
    ru: langRU,
    vi: langVI,
    ht: langHT,
  }
  let text = ''
  const validLangList = Object.keys(list)
  const languages = langCode === '' || !validLangList.includes(langCode) ? langEN : list[langCode]

  if (typeof languages[key] === 'undefined' && typeof list.en[key] === 'undefined') {
    return key
  }

  if (typeof languages[key] === 'undefined' && typeof list.en[key] !== 'undefined') {
    text = list.en[key]
  } else {
    text = languages[key]
  }

  if (Object.keys(replacements).length !== 0) {
    const keys = Object.keys(replacements)
    keys.forEach((childrenKeys) => {
      text = text.replace(childrenKeys, replacements[childrenKeys])
    })
  }

  return text
}

export default language
