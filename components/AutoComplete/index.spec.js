/* eslint-disable no-console */
import { mount } from '@cypress/react'
import { Formik } from 'formik'
import AutoComplete from './AutoComplete'
import { stateSelectItems } from '../../helpers'

describe('AutoComplete', () => {
  it('can auto complete an input', () => {
    const statesList = stateSelectItems()
    const input = {
      name: 'state',
      value: '',
      onChange: () => console.log('onChange'),
    }

    mount(
      <Formik initialValues={{ testInput: '' }}>
        <AutoComplete
          name="testInput"
          items={statesList}
          input={input}
          className="w-auto border-gray-700 border h-10 px-4 py-3"
        />
      </Formik>, {
      cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=testInput-autoComplete]')
      .should('be.hidden')

    cy.get('#downshift-0-input')
      .should('exist')
      .focus()

    cy.get('[data-testid=testInput-autoComplete]')
      .should('be.visible')

    cy.get('#downshift-0-input')
      .blur()

    cy.get('[data-testid=testInput-autoComplete]')
      .should('be.hidden')

    cy.get('#downshift-0-input')
      .click()

    cy.get('[data-testid=testInput-autoComplete]')
      .should('be.visible')

    cy.get('#downshift-0-item-0')
      .and('have.text', 'Alabama')

    cy.get('#downshift-0-input')
      .type('tex')

    cy.get('#downshift-0-item-0')
      .should('be.visible')
      .and('have.text', 'Texas')
      .type('{enter}')

    cy.get('#downshift-0-input')
      .should('have.attr', 'value', 'Texas')
      .type('{backspace}')
      .type('{backspace}')
      .should('have.attr', 'value', 'Tex')
      .type('{backspace}')
      .type('{backspace}')
      .type('{backspace}')
      .should('have.attr', 'value', '')
  })
})
