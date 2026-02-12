import React from 'react'
import { mount } from '@cypress/react'
import Accordion from './Accordion'
import AccordionItem from './AccordionItem'
import AccordionItemTrigger from './AccordionItemTrigger'
import AccordionItemBody from './AccordionItemBody'

describe('Accordion', () => {
  it('can have a disable item', () => {
    mount(
      <Accordion>
        <AccordionItem id="amendment3" disabled>
          <AccordionItemTrigger disabled>
            Third Amendment
          </AccordionItemTrigger>
          <AccordionItemBody>
            Congress shall make no law respecting an establishment of religion...
          </AccordionItemBody>
        </AccordionItem>
      </Accordion>, {
      cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=accordion]').should('exist')
      .find('#amendment3-trigger')
      .should('have.text', 'Third Amendment')
      .should('have.attr', 'disabled')
  })

  it('can open when click', () => {
    mount(
      <Accordion>
        <AccordionItem id="amendment1">
          <AccordionItemTrigger>
            First Amendment
          </AccordionItemTrigger>
          <AccordionItemBody>
            Congress shall make no law respecting an establishment of religion...
          </AccordionItemBody>
        </AccordionItem>
      </Accordion>, {
      cssFiles: 'styles/index.css',
    }
    )

    cy.get('#amendment1').should('be.hidden')

    cy.get('#amendment1-trigger')
      .click()

    cy.get('#amendment1').should('be.visible')

    cy.get('#amendment1-trigger')
      .click()

    cy.get('#amendment1').should('be.hidden')

    cy.get('span.Accordion-icon').find('svg').should('have.class', 'text-blue-500')
  })

  it('can open multiple sections', () => {
    mount(
      <Accordion multiItem>
        <AccordionItem id="amendment1">
          <AccordionItemTrigger>
            First Amendment
          </AccordionItemTrigger>
          <AccordionItemBody>
            Congress shall make no law respecting an establishment of religion...
          </AccordionItemBody>
        </AccordionItem>
        <AccordionItem id="amendment2">
          <AccordionItemTrigger>
            Third Amendment
          </AccordionItemTrigger>
          <AccordionItemBody>
            Congress shall make no law respecting an establishment of religion...
          </AccordionItemBody>
        </AccordionItem>
      </Accordion>, {
      cssFiles: 'styles/index.css',
    }
    )

    cy.get('#amendment1').should('be.hidden')
    cy.get('#amendment2').should('be.hidden')

    cy.get('#amendment1-trigger')
      .click()

    cy.get('#amendment2-trigger')
      .click()

    cy.get('#amendment1').should('be.visible')
    cy.get('#amendment2').should('be.visible')
  })
})
