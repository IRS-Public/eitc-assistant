import React, { useContext } from 'react'
import Heading from './Heading'
import List, { ListItem } from './List'
import Paragraph from './Paragraph'
import SiteContext from '../../context/Site/SiteContext'
import Loading from './Loading'

const HtmlBuilder = ({ elements }) => {
  const { lang } = useContext(SiteContext)
  const renderComponent = (item) => {
    switch (item.type) {
      case 'Paragraph':
        let replace = []
        if (item.replacements) {
          replace = item.replacements
        }

        return (
          <Paragraph
            key={item.key}
            text={lang(item.text)}
            replace={replace}
            className={item.className}
            bold={false}
            dataTestID={item.dataTestID}
          />
        )

      case 'BoldParagraph':
        let replace2 = []
        if (item.replacements) {
          replace2 = item.replacements
        }

        return (
          <Paragraph
            key={item.key}
            text={lang(item.text)}
            replace={replace2}
            className={item.className}
            bold
            dataTestID={item.dataTestID}
          />
        )

      case 'Heading':
        let headingReplace = []
        if (item.replacements) {
          headingReplace = item.replacements
        }
        return (
          <Heading key={item.key} level={item.level} className={item.className} replace={headingReplace} data-testid={item.dataTestID}>
            {lang(item.text)}
          </Heading>
        )

      case 'List':
        return (
          <List key={item.key} type={item.listType ? item.listType : 'ul'} className={item.className} show={item.show}>
            {item.list.map((listItem, i) => (
              <ListItem
                key={i}
                replace={item.replacements ? item.replacements[i] : []}
                data-testid={item.dataTestID + i}
              >
                {lang(listItem)}
              </ListItem>
            ))}
          </List>
        )

      case 'link':
        const extDoc = [
          '.doc',
          '.docx',
          '.xls',
          '.xlsx',
          '.xlsm',
          '.ppt',
          '.pptx',
          '.exe',
          '.zip',
          '.pdf',
          '.txt',
          '.rss',
          '.mobi',
          '.epub',
          '.mp3',
          '.wmv',
          '.asx',
          '.smi',
          '.js',
        ]
        if (new RegExp(extDoc.join('|')).test(item.href)) {
          return (
            <a
              key={item.key}
              name="downloadables"
              href={item.href}
            // onClick={handleClick.bind(this,item.href)}
            >
              {lang(item.text)}
            </a>
          )
        }
        return (
          <a key={item.key} href={item.href}>
            {lang(item.text)}
          </a>
        )

      case '"Action': // NEED TO ASK CLAY ABOUT THIS - MP
        return (
          <a key={item.key} href="/test#" onClick={item.onClick}>
            {lang(item.text)}
          </a>
        )

      case 'Loading':
        return <Loading />

      default:
        return null
    }
  },
    values = typeof elements === 'undefined' ? [] : Object.values(elements)

  return <>{values.map((item) => renderComponent(item))}</>
}

export default HtmlBuilder
