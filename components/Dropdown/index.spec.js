import React from 'react'
import { mount } from '@cypress/react'
import { Formik } from 'formik'
import Dropdown from './Dropdown'

describe('Dropdown', () => {
  const list = [
    { value: 'test-one', label: 'Test One' },
    { value: 'test-two', label: 'Test Two' },
    { value: 'test-three', label: 'Test Three' },
  ]

  it('can create a select drop down', () => {
    mount(
      <Formik initialValues={{ test: '' }}>
        <Dropdown
          name="test"
          id="test-id"
          dataTestId="test-id"
          options={list}
          className="ml-10 mt-10"
        />
      </Formik>, {
      cssFiles: 'styles/index.css',
    }
    )
    cy.get('select').should('exist').children().should('have.length', 4)
    cy.get('#test-id').select('test-two').should('have.value', 'test-two')
  })
})
