import React from 'react'
import { mount } from '@cypress/react'
import Heading from './Heading'

describe('Heading', () => {
  it('can have diff levels', () => {
    mount(
      <>
        <Heading level="1">Test H1</Heading>
        <Heading level="2">Test H2</Heading>
        <Heading level="3">Test H3</Heading>
        <Heading level="4">Test H4</Heading>
        <Heading level="5">Test H5</Heading>
        <Heading level="6">Test H6</Heading>
        <Heading>Test Div</Heading>
      </>, {
        cssFiles: 'styles/index.css',
    }
    )

    cy.get('h1').should('have.text', 'Test H1')
    cy.get('h2').should('have.text', 'Test H2')
    cy.get('h3').should('have.text', 'Test H3')
    cy.get('h4').should('have.text', 'Test H4')
    cy.get('h5').should('have.text', 'Test H5')
    cy.get('h6').should('have.text', 'Test H6')
    cy.get('#__cy_root div').should('have.text', 'Test Div')
  })

  it('can display an H1', () => {
    mount(
      <Heading className="text-6xl" level="1">Test H1</Heading>,
      {
        cssFiles: 'styles/index.css',
      }
    )

    cy.get('h1')
      .should('have.text', 'Test H1')
      .and('have.css', 'font-size', '64px')
      .and('have.css', 'color', 'rgb(27, 27, 27)')
      .and('have.css', 'line-height', '80px')
  })

  it('can display an H2', () => {
    mount(
      <Heading className="text-5xl" level="2">Test H2</Heading>,
      {
        cssFiles: 'styles/index.css',
      }
    )

    cy.get('h2')
      .should('have.text', 'Test H2')
      .and('have.css', 'font-size', '48px')
      .and('have.css', 'color', 'rgb(27, 27, 27)')
      .and('have.css', 'line-height', '60px')
  })

  it('can display an H3', () => {
    mount(
      <Heading className="text-4xl" level="3">Test H3</Heading>,
      {
        cssFiles: 'styles/index.css',
      }
    )

    cy.get('h3')
      .should('have.text', 'Test H3')
      .and('have.css', 'font-size', '40px')
      .and('have.css', 'color', 'rgb(27, 27, 27)')
      .and('have.css', 'line-height', '50px')
  })

  it('can display an H4', () => {
    mount(
      <Heading className="text-3xl" level="4">Test H4</Heading>,
      {
        cssFiles: 'styles/index.css',
      }
    )

    cy.get('h4')
      .should('have.text', 'Test H4')
      .and('have.css', 'font-size', '30px')
      .and('have.css', 'color', 'rgb(27, 27, 27)')
      .and('have.css', 'line-height', '37.5px')
  })

  it('can display an H5', () => {
    mount(
      <Heading className="text-2xl" level="5">Test H5</Heading>,
      {
        cssFiles: 'styles/index.css',
      }
    )

    cy.get('h5')
      .should('have.text', 'Test H5')
      .and('have.css', 'font-size', '28px')
      .and('have.css', 'color', 'rgb(27, 27, 27)')
      .and('have.css', 'line-height', '35px')
  })

  it('can display an H6', () => {
    mount(
      <Heading className="text-xl" level="6">Test H6</Heading>,
      {
        cssFiles: 'styles/index.css',
      }
    )

    cy.get('h6')
      .should('have.text', 'Test H6')
      .and('have.css', 'font-size', '20px')
      .and('have.css', 'color', 'rgb(27, 27, 27)')
      .and('have.css', 'line-height', '25px')
  })

  it('can hide display', () => {
    mount(
      <Heading show={false} level="6">Test H6</Heading>,
      {
        cssFiles: 'styles/index.css',
      }
    )

    cy.get('h6')
      .should('not.exist')
  })
});
