const routes = (langCode, site = 'all') => {
  const lang = langCode || 'en'

  const allRoutes = {
    'eitc': {
      localhost: '/app/eitc',
      generalInfo: '/app/eitc/general-info',
      filingStatus: '/app/eitc/filing-status',
      agi: '/app/eitc/agi',
      qualifyingChildren: '/app/eitc/qualifying-children',
      results: '/app/eitc/results',
    },
  }

  const allLangRoutes = {
    'eitc': {
      localhost: `/app/eitc/${lang}`,
      generalInfo: `/app/eitc/general-info/${lang}`,
      filingStatus: `/app/eitc/filing-status/${lang}`,
      agi: `/app/eitc/agi/${lang}`,
      qualifyingChildren: `/app/eitc/qualifying-children/${lang}`,
      results: `/app/eitc/results/${lang}`,
    },
  }

  if (site === 'all') {
    return allRoutes
  }

  if (lang === 'en') {
    return allRoutes[site]
  }

  return allLangRoutes[site]
}

export default routes
