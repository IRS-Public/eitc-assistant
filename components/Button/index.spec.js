import React from 'react'
import { mount } from '@cypress/react'
import Button from './index'

describe('Accordion', () => {
  it('has a primary color', () => {
    mount(<Button>Primary</Button>, {
      cssFiles: 'styles/index.css',
    })

    cy.get('button')
      .should('have.text', 'Primary')
      .and('have.css', 'background-color', 'rgb(0, 89, 156)')
      .and('have.css', 'border-color', 'rgb(0, 89, 156)')
      .and('have.css', 'color', 'rgb(255, 255, 255)')
      .and('have.css', 'border-radius', '3px')
      .and('have.css', 'border-width', '2px')
      .and('have.css', 'display', 'inline-block')
      .and('have.css', 'font-size', '16px')
      .and('have.css', 'line-height', '24px')
      .and('have.css', 'font-weight', '400')
      .and('have.css', 'cursor', 'pointer')
      .and('have.css', 'padding-top', '8px')
      .and('have.css', 'padding-bottom', '8px')
      .and('have.css', 'padding-left', '16px')
      .and('have.css', 'padding-right', '16px')
  })

  it('has a secondary color', () => {
    mount(<Button secondary>Secondary</Button>, {
      cssFiles: 'styles/index.css',
    })

    cy.get('button')
      .should('have.text', 'Secondary')
      .and('have.css', 'background-color', 'rgb(255, 255, 255)')
      .and('have.css', 'border-color', 'rgb(0, 89, 156)')
      .and('have.css', 'color', 'rgb(0, 89, 156)')
  })

  it('can be disabled', () => {
    mount(<Button disabled>Disabled</Button>, {
      cssFiles: 'styles/index.css',
    })

    cy.get('button')
      .should('have.text', 'Disabled')
      .and('have.css', 'background-color', 'rgb(91, 97, 107)')
      .and('have.css', 'border-color', 'rgb(91, 97, 107)')
      .and('have.css', 'color', 'rgb(255, 255, 255)')
  })

  it('can be disabled and secondary', () => {
    mount(<Button disabled secondary>Disabled Secondary</Button>, {
      cssFiles: 'styles/index.css',
    })

    cy.get('button')
      .should('have.text', 'Disabled Secondary')
      .and('have.css', 'background-color', 'rgb(255, 255, 255)')
      .and('have.css', 'border-color', 'rgb(91, 97, 107)')
      .and('have.css', 'color', 'rgb(91, 97, 107)')
  })

  it('can have an aria label', () => {
    mount(<Button ariaLabel="This is the aria label">Aria Label</Button>, {
      cssFiles: 'styles/index.css',
    })

    cy.get('button')
      .should('have.text', 'Aria Label')
      .and('have.attr', 'aria-label', 'This is the aria label')
  })

  it('can have an icon', () => {
    mount(<Button showIcon>Icon</Button>, {
      cssFiles: 'styles/index.css',
    })

    cy.get('button')
      .should('have.text', 'Icon')
      .find('svg')
      .should('have.class', 'fa-chevron-right')
      .and('have.attr', 'data-icon', 'chevron-right')
      .and('be.visible')
  })

  it('can accept css classes', () => {
    mount(<Button className="mt-10">CSS Classes</Button>, {
      cssFiles: 'styles/index.css',
    })

    cy.get('button')
      .should('have.text', 'CSS Classes')
      .and('have.css', 'margin-top', '40px')
      .find('svg')
      .should('have.class', 'fa-chevron-right')
      .and('have.attr', 'data-icon', 'chevron-right')
      .and('be.hidden')
  })

  it('can accept other props', () => {
    mount(<Button data-test="test" id="chang-id" data-lang="en">Other Props</Button>, {
      cssFiles: 'styles/index.css',
    })

    cy.get('button')
      .should('have.text', 'Other Props')
      .and('have.attr', 'id', 'chang-id')
      .and('have.attr', 'data-lang', 'en')
  })
})
