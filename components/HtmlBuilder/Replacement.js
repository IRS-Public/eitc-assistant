import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import ReactHtmlParser from 'react-html-parser'
import { gaEvent } from '../../helpers'
import SiteContext from '../../context/Site/SiteContext'
import getPDF from './getPDF'

const Replacement = ({ text, replace }) => {
  const { site, lang, pdfParams } = useContext(SiteContext)
  const router = useRouter()
  const handleClick = (event, type, suggestedAllowances, addtlWHDueFH, filingStatus, finalAnnualAmtFH) => {
    event.preventDefault()
    getPDF(type, suggestedAllowances, addtlWHDueFH, filingStatus, finalAnnualAmtFH, env, pdfParams)
  }

  const handleRouteClick = (event, href) => {
    event.preventDefault()

    router.push(href, undefined, { shallow: true })
  }

  const htmlParserTransform = (node, index,) => {
    if (node.type === 'tag' && node.name === 'a') {
      const {
        href,
        datatype,
        external,
        gaitems,
        type,
        suggestedallowances,
        addtlwhduefh,
        finalannualamtfh,
        filingstatus,
      } = node.attribs

      const gaArray = gaitems && gaitems.split(',')

      if (datatype === 'link') {
        return (
          <a
            key={index}
            href={href}
            data-testid={node.attribs['data-testid']}
            className="text-blue-500 hover:text-blue-600 active:text-blue-800 underline active:text-blue-700"
            target={external === 'true' ? '_blank' : '_self'}
            rel={external === 'true' && 'noopener'}
            aria-label={external === 'true' ? `${node.children[0].data} This link will open in a new window` : node.children[0].data}
            onClick={() => gaitems ? gaEvent(...gaArray) : false}
          >
            {node.children[0].data}
          </a>
        )
      }

      if (datatype === 'route') {
        return (
          <a
            key={index}
            href={href}
            className="link"
            onClick={(event) => handleRouteClick(event, href)}
          >
            {node.children[0].data}
          </a>
        )
      }

      if (datatype === 'downloadPDF') {
        return (
          <a
            key={index}
            href={href}
            className="link"
            data-testid={node.attribs['data-testid']}
            onClick={(event) => {
              handleClick(event, type, suggestedallowances, addtlwhduefh, filingstatus, finalannualamtfh)
            }}
          >
            {node.children[0].data}
          </a>
        )
      }
    }
    return node.data
  }

  let setText = text,
    link = ''

  if (replace.length > 0) {
    replace.map((item) => {
      if (item.type === 'link') {
        link = `<a datatype="link" external="${item.external ? item.external : 'false'}" ${(item.category && item.action && item.label) ? `gaitems="${item.category},${item.action},${item.label}"` : false} href="${item.href}" data-testid="${item.dataTestID}">${lang(item.text, item.repObject)}</a>`
        setText = setText.replace(item.key, link)
      }
      if (item.type === 'doubleQuotes') {
        link = `"${lang(item.text, item.repObject)}"`
        setText = setText.replace(item.key, link)
      }
      if (item.type === 'simpleText') {
        link = lang(item.text, item.repObject)
        setText = setText.replace(item.key, link)
      }
      if (item.type === 'route') {
        link = `<a datatype="route" href="${item.href}" class="link">${lang(item.text, item.repObject)}</a>`
        setText = setText.replace(item.key, link)
      }
      if (item.type === 'bold') {
        link = `<span class="font-bold" data-testid="${item.dataTestID}">${lang(item.text, item.repObject)}</span>`
        setText = setText.replace(item.key, link)
      }
      if (item.type === 'italic') {
        link = `<span class="italic">${lang(item.text, item.repObject)}</span>`
        setText = setText.replace(item.key, link)
      }
      if (item.type === 'underline') {
        link = `<span class="underline">${lang(item.text, item.repObject)}</span>`
        setText = setText.replace(item.key, link)
      }
      if (item.type === 'boldUnderline') {
        link = `<span class="underline font-bold">${lang(item.text, item.repObject)}</span>`
        setText = setText.replace(item.key, link)
      }
      if (item.type === 'redText') {
        link = `<span class="text-red-500">${item.text}</span>`
        setText = setText.replace(item.key, link)
      }
      if (item.type === 'component') {
        link = item.component
        setText = setText.replace(item.key, link)
      }
      if (item.type === 'downloadPDF') {
        link = `<a 
          datatype="downloadPDF" 
          href="#" 
          class="link" 
          data-testid="${item.dataTestID}"
          type="${item.params.type}"
          suggestedAllowances="${item.params.suggestedAllowances}"
          addtlWHDueFH="${item.params.addtlWHDueFH}"
          filingStatus="${item.params.filingStatus}"
          finalAnnualAmtFH="${item.params.finalAnnualAmtFH}"
        >${lang(item.text, item.repObject)}</a>`
        setText = setText.replace(item.key, link)
      }
      return null
    })
  }
  const returnedJSX = ReactHtmlParser(setText, {
    decodeEntities: true,
    transform: htmlParserTransform,
  })

  return returnedJSX
}

Replacement.propTypes = {
  text: PropTypes.any,
  replace: PropTypes.any,
}

export default Replacement
