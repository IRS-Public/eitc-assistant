import { useContext } from 'react'
import HtmlBuilder from '../../../components/HtmlBuilder'
import params from '../../../calculations/eitc/EITCParams.json'
import SiteContext from '../../../context/Site/SiteContext'

const PaperHTML = ({ num, year }) => {
  const { lang } = useContext(SiteContext)
  const { EITCPaperFormLinks } = params[year]

  const replacements = []
  let text = num === 0 ? 'results.p.paperTwoLinkNoQC' : 'results.p.paperThreeLinks'

  const numOfLinks = EITCPaperFormLinks.length

  if (numOfLinks === 2) {
    text = num === 0 ? 'results.p.paperOneLinkNoQC' : 'results.p.paperTwoLinks'
  }

  EITCPaperFormLinks.forEach((link, index) => {
    replacements.push(
      {
        type: 'link',
        key: `:link${index}`,
        href: link.href,
        text: lang(link.text, { ':year': year }),
        external: true,
        dataTestID: `paperFormsLink-${index + 1}`
      }
    )
  })

  return (
    <HtmlBuilder elements={[
      {
        key: 'results.p.paper',
        type: 'Paragraph',
        className: 'mb-8',
        text,
        replacements,
        dataTestID: 'paperFormsContent'
      }
    ]}
    />
  )
}

const AmendedHTML = () => (
  <HtmlBuilder elements={[
    {
      key: 'results.p.amended',
      type: 'Paragraph',
      className: 'mb-8',
      text: 'results.p.amended',
      dataTestID: 'amendedReturnContent'
    }
  ]}
  />
)

export { PaperHTML, AmendedHTML }
