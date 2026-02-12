import {
  UPDATE_FORMS,
} from '../types'

const updateForms = (payload, state) => ({
  ...state,
  site: {
    ...state.site,
    forms: payload,
  },
})

const updateAccordionOpen = (payload, state) => ({
  ...state,
  site: {
    ...state.site,
    forms: {
      ...state.site.forms,
      qualifyingChildren: {
        ...state.site.forms.qualifyingChildren,
        accordionOpenArr: payload,
      }
    }
  },
})

const updateNumOfChildren = (payload, state) => ({
  ...state,
  site: {
    ...state.site,
    forms: {
      ...state.site.forms,
      qualifyingChildren: {
        ...state.site.forms.qualifyingChildren,
        numOfChildren: payload
      }
    },
  },
})

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORMS:
      return updateForms(action.payload, state)
    case 'UPDATE_ACCORDION_OPEN':
      return updateAccordionOpen(action.payload, state)
    case 'UPDATE_NUM_OF_CHILDREN':
      return updateNumOfChildren(action.payload, state)
    default:
      return state
  }
}

export default reducer
