import React from 'react'
import { mount } from '@cypress/react'
import ContentBox from './ContentBox'

describe('<ContentBox />', () => {
  it('can display a content box', () => {
    mount(
      <ContentBox
        dataTestId="test-id"
        className="p-4"
        heading="Test Heading"
        subheading="Test Sub Heading"
      >
        <p data-testid="test-id-p">Test ContentBox</p>
      </ContentBox>,
      {
        cssFiles: 'styles/index.css',
      }
    )

    cy.get('[data-testid=test-id]')
      .should('exist')
      .and('have.class', 'p-4')

    cy.get('[data-testid=test-id-inner-wrapper]')
      .and('have.class', 'border border-gray-500 px-4 py-6 border-t-3 border-t-gold-500')

    cy.get('[data-testid=test-id-heading]')
      .should('exist')
      .should('have.text', 'Test Heading')

    cy.get('[data-testid=test-id-sub-heading]')
      .should('exist')
      .should('have.text', 'Test Sub Heading')

    cy.get('[data-testid=test-id-p]')
      .should('exist')
      .should('have.text', 'Test ContentBox')
  })

  it('can display a secondary content box', () => {
    mount(
      <ContentBox
        dataTestId="test-id"
        className="p-4"
        heading="Test Heading"
        subheading="Test Sub Heading"
        secondary
      >
        <p data-testid="test-id-p">Test ContentBox</p>
      </ContentBox>,
      {
        cssFiles: 'styles/index.css',
      }
    )

    cy.get('[data-testid=test-id]')
      .should('exist')
      .and('have.class', 'p-4')

    cy.get('[data-testid=test-id-inner-wrapper]')
      .and('have.class', 'border border-gray-500 px-4 py-6')

    cy.get('[data-testid=test-id-heading]')
      .should('exist')
      .should('have.text', 'Test Heading')

    cy.get('[data-testid=test-id-sub-heading]')
      .should('exist')
      .should('have.text', 'Test Sub Heading')

    cy.get('[data-testid=test-id-p]')
      .should('exist')
      .should('have.text', 'Test ContentBox')
  })
});
