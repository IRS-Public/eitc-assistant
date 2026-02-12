import React from 'react'
import { mount } from '@cypress/react'
import HelpTipBody from './HelpTipBody'
import HelpTipButton from './HelpTipButton'

describe('Dropdown', () => {
  const yearHelpTip = () => (
    [
      {
        key: 'tt-1-1',
        type: 'Heading',
        level: '2',
        className: 'text-xl mb-2 font-bold',
        text: 'general.h2.yearTT',
        dataTestID: 'yearToolTipHeader'
      },
      {
        key: 'tt-1-2',
        type: 'Paragraph',
        className: 'my-3',
        text: 'general.p.yearTT',
        dataTestID: 'yearToolTipParagraph1'
      },
      {
        key: 'tt-1-3',
        type: 'List',
        className: 'my-3 ml-10 list list-disc',
        dataTestID: 'yearToolTipList',
        list: [
          'general.li.yearTT1',
          'general.li.yearTT2',
          'general.li.yearTT3'
        ]
      }
    ]
  )

  it('can create a help tip button and body', () => {
    mount(
      <>
        <HelpTipButton
          page="test"
          expanded
          testID="test-id"
          name="test-help-tip"
          className="ml-10 mt-10"
        />
        <HelpTipBody
          id="year-helpTip"
          expanded
          elements={yearHelpTip()}
        />
      </>, {
        cssFiles: 'styles/index.css',
    }
    )
    cy.get('h2').should('exist').and('have.text', 'general.h2.yearTT').and('have.class', 'text-xl mb-2 font-bold')
    cy.get('p').should('exist').and('have.text', 'general.p.yearTT').and('have.class', 'my-3')
    cy.get('ul').should('exist').and('have.class', 'my-3 ml-10 list list-disc fade-in block')
    cy.get('ul').children().should('have.length', 3)
  })
})
