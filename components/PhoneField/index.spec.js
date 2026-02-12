import { mount } from '@cypress/react'
import { Formik } from 'formik'
import PhoneField from './PhoneField'

describe('<PhoneField />', () => {
  it('can display a phone field', () => {
    mount(
      <Formik initialValues={{ testInput: '' }}>
        <PhoneField
          name="testInput"
          label="Test Phone Field"
          dataTestId="phone-field-test"
          className="mt-3"
        />
      </Formik>, {
      cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=phone-field-test]')
      .should('exist')
      .should('have.class', 'fade-in mt-3 block')

    cy.get('[data-testid=phone-field-test-label]')
      .should('exist')
      .and('have.text', 'Test Phone Field ')
      .should('have.class', 'block')

    cy.get('[data-testid=phone-field-test-input]')
      .should('exist')
      .should('have.class', 'w-full block my-3 border-gray-700 border px-4 py-3')
  })

  it('can be required', () => {
    mount(
      <Formik initialValues={{ testInput: '' }}>
        <PhoneField
          name="testInput"
          required
          label="Test Phone Field"
          dataTestId="phone-field-test"
          className="mt-3"
        />
      </Formik>, {
      cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=phone-field-test-label]')
      .should('have.text', 'Test Phone Field *')
  })

  it('can accepect international number', () => {
    mount(
      <Formik initialValues={{ testInput: '' }}>
        <PhoneField
          name="testInput"
          label="Test Phone Field"
          dataTestId="phone-field-test"
          className="mt-3"
        />
      </Formik>, {
      cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=phone-field-test-input]')
      .type('{backspace}52 2222 222 222')

    cy.get('[data-testid=phone-field-test]')
      .find('.selected-flag')
      .should('have.attr', 'title', 'Mexico: + 52')

    cy.get('[data-testid=phone-field-test-input]')
      .type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}')
      .type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}')
      .type('34 2222 222 222')

    cy.get('[data-testid=phone-field-test]')
      .find('.selected-flag')
      .should('have.attr', 'title', 'Spain: + 34')
  })

  it('can be hidden', () => {
    mount(
      <Formik initialValues={{ testInput: '' }}>
        <PhoneField
          name="testInput"
          show={false}
          label="Test Phone Field"
          dataTestId="phone-field-test"
          className="mt-3"
        />
      </Formik>, {
      cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=phone-field-test]')
      .should('have.class', 'hidden')
  })

  it('can be fixed width', () => {
    mount(
      <Formik initialValues={{ testInput: '' }}>
        <PhoneField
          name="testInput"
          fullWidth={false}
          label="Test Phone Field"
          dataTestId="phone-field-test"
          className="mt-3"
        />
      </Formik>, {
      cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=phone-field-test-input]')
      .should('have.class', 'w-full fw-18 block my-3 border-gray-700 border px-4 py-3')
  })

  it('can be dispaly hint text', () => {
    mount(
      <Formik initialValues={{ testInput: '' }}>
        <PhoneField
          name="testInput"
          fullWidth={false}
          hintText="test hint text"
          label="Test Phone Field"
          dataTestId="phone-field-test"
          className="mt-3"
        />
      </Formik>, {
      cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=phone-field-test-hintText]')
      .should('have.text', 'test hint text')
  })
})
