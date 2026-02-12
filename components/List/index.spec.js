import React from 'react'
import { mount } from '@cypress/react'
import List, { ListItem } from './List'

describe('<List />', () => {
  it('can create a List', () => {
    mount(
      <List
        className="ul"
      >
        <ListItem>Test</ListItem>
      </List>,
      {
        cssFiles: 'styles/index.css',
      }
    )
    cy.get('ul')
      .should('exist')
      .and('have.class', 'ul')
      .find('li')
      .and('have.text', 'Test')
  })

  it('can create a multi list', () => {
    mount(
      <List className="ul">
        <ListItem>Test1</ListItem>
        <ListItem>Test2</ListItem>
        <ListItem>Test3</ListItem>
      </List>,
      {
        cssFiles: 'styles/index.css',
      }
    )
    cy.get('ul')
      .should('exist')
      .children()
      .should('have.length', 3)
  })

  it('can create an order list', () => {
    mount(
      <List type="ol" className="ol">
        <ListItem>Test1</ListItem>
        <ListItem>Test2</ListItem>
        <ListItem>Test3</ListItem>
      </List>,
      {
        cssFiles: 'styles/index.css',
      }
    )
    cy.get('ol')
      .should('exist')
      .children()
      .should('have.length', 3)
  })
})
