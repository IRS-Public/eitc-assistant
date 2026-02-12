import { mount } from '@cypress/react'
import { Formik } from 'formik'
import RadioGroup from './RadioGroup'

describe('<RadioGroup />', () => {
  const options = [
    {
      id: 'testYes',
      value: 'yes',
      label: 'Yes',
      ariaLabel: 'Yes, I am an aria-label',
    },
    {
      id: 'testNo',
      value: 'no',
      label: 'No',
      ariaLabel: 'No, I am an aria-label',
      required: true,
    }
  ]

  it('can hide its display', () => {
    mount(
      <Formik initialValues={{ testInput: '' }}>
        <RadioGroup
          name="testInput"
          show={false}
          label="Test Radio Group"
          dataTestId="radio-test"
          options={options}
        />
      </Formik>, {
      cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=radio-test]')
      .should('have.class', 'hidden')
  })

  it('can display a radio group field', () => {
    mount(
      <Formik initialValues={{ testInput: '' }}>
        <RadioGroup
          name="testInput"
          label="Test Radio Group"
          dataTestId="radio-test"
          options={options}
          className="mt-3"
          required
        />
      </Formik>, {
      cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=radio-test]')
      .should('exist')

    cy.get('[data-testid=radio-test-input-yes]')
      .should('exist')

    cy.get('[data-testid=radio-test-input-yes]')
      .should('exist')

    cy.get('[data-testid=radio-test-label-yes]')
      .should('exist')
      .find('span')
      .should('have.text', 'Yes')

    cy.get('[data-testid=radio-test-input-no]')
      .should('exist')

    cy.get('[data-testid=radio-test-label-no]')
      .should('exist')
      .find('span')
      .should('have.text', 'No')
  })

  it('can display horizontal', () => {
    mount(
      <Formik initialValues={{ testInput: '' }}>
        <RadioGroup
          name="testInput"
          label="Test Radio Group"
          dataTestId="radio-test"
          options={options}
          className="mt-3"
          horizontal
        />
      </Formik>, {
      cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=radio-test-wrapper-yes]')
      .should('have.class', 'inline-block')

    cy.get('[data-testid=radio-test-wrapper-no]')
      .should('have.class', 'inline-block')
  })

  it('can display hint text', () => {
    mount(
      <Formik initialValues={{ testInput: '' }}>
        <RadioGroup
          name="testInput"
          label="Test Radio Group"
          dataTestId="radio-test"
          options={options}
          className="mt-3"
          hintText="hint text"
        />
      </Formik>, {
      cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=radio-test-hintText]')
      .should('exist')
      .should('have.text', 'hint text')
  })
})
