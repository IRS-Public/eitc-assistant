import { createContext } from 'react'

const HeaderContext = createContext({
  header: {},
  toggleMenu: () => { },
  toggleLang: () => { },
  toggleSearch: () => { },
  toggleNav: (key) => { },
  submitSearch: (formID) => { },
})

export default HeaderContext
