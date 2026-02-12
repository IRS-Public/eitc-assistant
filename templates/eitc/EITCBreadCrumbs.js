import React, { useContext } from 'react'
import { Breadcrumbs, BreadcrumbItem } from '../../components/Breadcrumbs'
import SiteContext from '../../context/Site/SiteContext'
import { routes as pathNames } from '../helpers'

const EITCBreadCrumbs = ({ pathName }) => {
  const { lang, langCode } = useContext(SiteContext)
  const routes = pathNames(langCode, 'eitc')

  const base = () => [
    {
      key: 'breadcrumb-1',
      text: 'global.breadcrumb.home',
      href: 'https://www.irs.gov/',
      testID: 'Home',
    },
    {
      key: 'breadcrumb-2',
      text: 'global.breadcrumb.credits',
      href: 'https://www.irs.gov/credits-and-deductions',
      testID: 'CreditsAndDeductions',
    },
    {
      key: 'breadcrumb-3',
      text: 'global.breadcrumb.individuals',
      href: 'https://www.irs.gov/credits-deductions-for-individuals',
      testID: 'Individuals',
    },
    {
      key: 'breadcrumb-4',
      text: 'global.breadcrumb.landingPage',
      href: 'https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit/use-the-eitc-assistant',
      testID: 'EITC',
    },
  ]

  const generalInfo = () => [
    {
      key: 'breadcrumb-5-1',
      text: 'global.breadcrumb.generalInfo',
      type: 'text',
      testID: 'Landing',
    },
  ]

  const filingStatus = () => [
    {
      key: 'breadcrumb-5-1',
      text: 'global.breadcrumb.filingStatus',
      type: 'text',
      testID: 'Landing',
    },
  ]

  const agi = () => [
    {
      key: 'breadcrumb-5-2',
      text: 'global.a.agi',
      type: 'text',
      testID: 'Landing',
    },
  ]

  const qualifyingChildren = () => [
    {
      key: 'breadcrumb-5-3',
      text: 'global.a.qualifyingChildren',
      type: 'text',
      testID: 'Landing',
    },
  ]

  const results = () => [
    {
      key: 'breadcrumb-5-4',
      text: 'global.a.results',
      type: 'text',
      testID: 'Landing',
    },
  ]

  const breadcrumbsLocation = () => {
    switch (pathName.replace("[langCode]",langCode)) {
      case routes.generalInfo:
        return base().concat(generalInfo())
      case routes.filingStatus:
        return base().concat(filingStatus())
      case routes.agi:
        return base().concat(agi())
      case routes.qualifyingChildren:
        return base().concat(qualifyingChildren())
      case routes.results:
        return base().concat(results())
      default:
        return base().concat(generalInfo())
      }
    }

  const breadcrumbs = breadcrumbsLocation(pathName),
    breadcrumbsLinks = breadcrumbs.map(
      ({ text, href, testID, key, route }) => (
        <BreadcrumbItem
          key={key}
          href={href}
          testID={testID}
          route={route}
        >
          {lang(text)}
        </BreadcrumbItem>
      )
    )

  return (
    <Breadcrumbs name={pathName} className="hidden lg:block">
      {breadcrumbsLinks}
    </Breadcrumbs>
  )
}

export default EITCBreadCrumbs
