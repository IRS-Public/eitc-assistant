import React from 'react'
import { mount } from '@cypress/react'
import Breadcrumbs from './Breadcrumbs'
import BreadcrumbItem from './BreadcrumbItem'

describe('<Breadcrumbs />', () => {
  it('can display breadcrumbs links', () => {
    mount(
      <Breadcrumbs className="p-4">
        <BreadcrumbItem key="testOne" href="https://www.google.com/" dataTestId="testOne" className="my-3">
          Test One
        </BreadcrumbItem>
        <BreadcrumbItem key="testTwo" href="https://www.google.com/" dataTestId="testTwo" className="my-3">
          Test Two
        </BreadcrumbItem>
        <BreadcrumbItem key="testThree" dataTestId="testTwo" className="my-3">
          Test Three
        </BreadcrumbItem>
      </Breadcrumbs>, {
      cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=breadcrumbs]')
      .should('exist')
      .and('have.class', 'p-4')
      .find('ul')
      .children()
      .should('have.length', 3)

    cy.get('[data-testid=breadcrumbTestOne]')
      .should('exist')
      .and('have.text', 'Test One')
      .and('have.class', 'text-blue-500 hover:text-blue-600 active:text-blue-800 underline px-2')

    cy.get('[data-testid=breadcrumbTestTwo]')
      .should('exist')
      .and('have.text', 'Test Two')
      .and('have.class', 'text-blue-500 hover:text-blue-600 active:text-blue-800 underline px-2')

    cy.get('[data-testid=currentPage]')
      .should('exist')
      .and('have.text', 'Test Three')
      .and('have.class', 'px-2')
  })
})
