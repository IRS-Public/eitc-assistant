import React from 'react'
import { mount } from '@cypress/react'
import Link from './Link'

describe('<Link />', () => {
  it('can create a link', () => {
    mount(
      <Link
        className="link"
        href="http://google.com"
        ariaLabel="test link"
      >
        Test
      </Link>,
      {
        cssFiles: 'styles/index.css',
      }
    )
    cy.get('a')
      .should('exist')
      .and('have.class', 'link')
      .and('have.text', 'Test')
      .and('have.attr', 'href', 'http://google.com')
      .and('have.attr', 'aria-label', 'test link')
  })

  it('can open in a new tab', () => {
    mount(
      <Link
        external
        className="link"
        href="http://google.com"
        ariaLabel="test link"
      >
        Test
      </Link>,
      {
        cssFiles: 'styles/index.css',
      }
    )
    cy.get('a')
      .should('exist')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')
      .and('have.attr', 'aria-label', 'test link This link will open in a new window.')
  })

  it('can create a route link', () => {
    mount(
      <Link
        router
        className="link"
        href="route-page"
        ariaLabel="test link"
      >
        Test
      </Link>,
      {
        cssFiles: 'styles/index.css',
      }
    )
    cy.get('a')
      .should('exist')
      .and('have.class', 'link')
      .and('have.text', 'Test')
      .and('have.attr', 'href', '/route-page')
      .and('have.attr', 'aria-label', 'test link')
  })
})
