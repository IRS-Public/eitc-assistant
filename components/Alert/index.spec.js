import { mount } from '@cypress/react'
import Alert from './Alert'
import SectionAlert from './SectionAlert'
import SystemAlert from './SystemAlert'

describe('Alert', () => {
  it('can be a warning alert', () => {
    mount(
      <Alert dataTestId="alert" title="Test">
        Alert
      </Alert>, {
        cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=alert]')
      .should('exist')
      .and('have.text', 'TestAlert')
      .and('have.css', 'background-color', 'rgb(255, 244, 221)')
      .and('have.css', 'border-left-color', 'rgb(253, 184, 30)')
      .and('have.css', 'border-left-width', '3px')
      .and('have.css', 'color', 'rgb(27, 27, 27)')
      .and('have.css', 'animation-name', 'fadeIn')

    cy.get('h2').should('have.text', 'Test')
    cy.get('div.alert-body').should('have.text', 'Alert')
  })

  it('can be a error alert', () => {
    mount(
      <Alert dataTestId="alert" title="Test" type="error">
        Alert
      </Alert>, {
        cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=alert]')
      .should('exist')
      .and('have.text', 'TestAlert')
      .and('have.css', 'background-color', 'rgb(250, 240, 240)')
      .and('have.css', 'border-left-color', 'rgb(209, 18, 66)')

    cy.get('h2').should('have.text', 'Test')
    cy.get('div.alert-body').should('have.text', 'Alert')
  })

  it('can be a info alert', () => {
    mount(
      <Alert dataTestId="alert" title="Test" type="info">
        Alert
      </Alert>, {
        cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=alert]')
      .should('exist')
      .and('have.text', 'TestAlert')
      .and('have.css', 'background-color', 'rgb(231, 246, 248)')
      .and('have.css', 'border-left-color', 'rgb(0, 89, 156)')

    cy.get('h2').should('have.text', 'Test')
    cy.get('div.alert-body').should('have.text', 'Alert')
  })

  it('can be a success alert', () => {
    mount(
      <Alert dataTestId="alert" title="Test" type="success">
        Alert
      </Alert>, {
        cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=alert]')
      .should('exist')
      .and('have.text', 'TestAlert')
      .and('have.css', 'background-color', 'rgb(236, 248, 237)')
      .and('have.css', 'border-left-color', 'rgb(46, 133, 64)')

    cy.get('h2').should('have.text', 'Test')
    cy.get('div.alert-body').should('have.text', 'Alert')
  })

  it('can be a warning system alert', () => {
    mount(
      <Alert dataTestId="alert" title="Test" type="warning" category="system">
        Alert
      </Alert>, {
        cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=alert]')
      .should('exist')
      .and('have.text', 'Test')
      .and('have.css', 'background-color', 'rgb(253, 184, 30)')
  })

  it('can be a error system alert', () => {
    mount(
      <Alert dataTestId="alert" title="Test" type="error" category="system">
        Alert
      </Alert>, {
        cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=alert]')
      .should('exist')
      .and('have.text', 'Test')
      .and('have.css', 'background-color', 'rgb(250, 240, 240)')
  })

  it('can be a info system alert', () => {
    mount(
      <Alert dataTestId="alert" title="Test" type="info" category="system">
        Alert
      </Alert>, {
        cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=alert]')
      .should('exist')
      .and('have.text', 'Test')
      .and('have.css', 'background-color', 'rgb(231, 246, 248)')
  })

  it('can be a success system alert', () => {
    mount(
      <Alert dataTestId="alert" title="Test" type="success" category="system">
        Alert
      </Alert>, {
        cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=alert]')
      .should('exist')
      .and('have.text', 'Test')
      .and('have.css', 'background-color', 'rgb(236, 248, 237)')
  })

  it('can be have diff heading levels', () => {
    mount(
      <Alert dataTestId="alert" type="warning" title="Test" level="3">
        Alert
      </Alert>, {
        cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=alert]')
      .should('exist')
      .find('h3')
  })

  it('can be a warning section alert', () => {
    mount(
      <SectionAlert dataTestId="alert" title="Test">
        Alert
      </SectionAlert>, {
        cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=alert]')
      .should('exist')
      .and('have.text', 'TestAlert')
      .and('have.css', 'background-color', 'rgb(255, 244, 221)')
      .and('have.css', 'border-left-color', 'rgb(253, 184, 30)')
      .and('have.css', 'border-left-width', '3px')
      .and('have.css', 'color', 'rgb(27, 27, 27)')
      .and('have.css', 'animation-name', 'fadeIn')

    cy.get('h2').should('have.text', 'Test')
    cy.get('div.alert-body').should('have.text', 'Alert')
  })

  it('can be a warning system alert', () => {
    mount(
      <SystemAlert dataTestId="alert" title="Test">
        Alert
      </SystemAlert>, {
        cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=alert]')
      .should('exist')
      .and('have.text', 'Test')
      .and('have.css', 'background-color', 'rgb(253, 184, 30)')
  })
})
