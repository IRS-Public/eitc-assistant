import TagManager from 'react-gtm-module'

const gaEvent = (event, category, action, label) => {
  TagManager.dataLayer({
    dataLayer: {
      event,
      category,
      action,
      label
    }
  })
}

export default gaEvent
