import TagManager from 'react-gtm-module'

const gaPageView = (location, pageTitle) => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'pageview',
      location,
      pageTitle
    }
  })
}

export default gaPageView
