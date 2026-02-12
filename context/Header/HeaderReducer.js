import {
  TOGGLE_SEARCH,
  TOGGLE_MENU,
  TOGGLE_LANG,
  TOGGLE_NAV,
  UPDATE_PARAMS,
} from '../types'

const toggleSearch = (payload, state) => ({
  ...state,
  header: {
    ...state.header,
    search: payload,
  },
})

const toggleMenu = (payload, state) => ({
  ...state,
  header: {
    ...state.header,
    menuState: payload,
  },
})

const toggleLang = (payload, state) => ({
  ...state,
  header: {
    ...state.header,
    langState: payload,
  },
})
const toggleNav = (payload, state) => {
  const newNavBar = state.header.navBar.map((item) => {
    if (payload === item.key) {
      item.isOpen = !item.isOpen
    } else {
      item.isOpen = false
    }
    return item
  })

  return {
    ...state,
    header: {
      ...state.header,
      navBar: newNavBar,
    },
  }
}

const updateParams = (payload, state) => ({
  ...state,
  header: {
    ...state.header,
    params: payload,
  },
})

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_SEARCH:
      return toggleSearch(action.payload, state)
    case TOGGLE_MENU:
      return toggleMenu(action.payload, state)
    case TOGGLE_LANG:
      return toggleLang(action.payload, state)
    case TOGGLE_NAV:
      return toggleNav(action.payload, state)
    case UPDATE_PARAMS:
      return updateParams(action.payload, state)
    default:
      return state
  }
}

export default reducer
