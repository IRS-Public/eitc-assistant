import { mount } from '@cypress/react'
import { Formik } from 'formik'
import CheckboxGroup from './CheckboxGroup'

describe('<CheckboxGroup />', () => {
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
        <CheckboxGroup
          name="testInput"
          show={false}
          label="Test Checkbox"
          dataTestId="checkbox-test"
          options={options}
        />
      </Formik>, {
      cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=checkbox-test]')
      .should('have.class', 'hidden')
  })

  it('can display a radio group field', () => {
    mount(
      <Formik initialValues={{ testInput: '' }}>
        <CheckboxGroup
          name="testInput"
          label="Test Checkbox"
          dataTestId="checkbox-test"
          options={options}
          className="mt-3"
          required
        />
      </Formik>, {
      cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=checkbox-test]')
      .should('exist')
      .and('have.class', 'mt-3 fade-in block')

    cy.get('[data-testid=checkbox-test-legend]')
      .should('have.text', 'Test Checkbox *')

    cy.get('[data-testid=checkbox-test-yes]')
      .should('have.text', 'Yes')
      .find('input')
      .should('have.id', 'testYes')
      .should('have.value', 'yes')
      .should('have.attr', 'type', 'checkbox')
      .should('have.attr', 'name', 'testInput')

    cy.get('[data-testid=checkbox-test-no]')
      .should('have.text', 'No *')
      .find('input')
      .should('have.id', 'testNo')
      .should('have.value', 'no')
      .should('have.attr', 'type', 'checkbox')
      .should('have.attr', 'name', 'testInput')
  })

  it('can have a help tip', () => {
    mount(
      <Formik initialValues={{ testInput: '' }}>
        <CheckboxGroup
          name="testInput"
          label="Test Checkbox"
          dataTestId="checkbox-test"
          options={options}
          helpTip={
            {
              page: 'tas',
              expanded: false,
              ariaLabel: 'caf - Help Tip',
              elements: () => [],
            }
          }
        />
      </Formik>, {
      cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=checkbox-test]')
      .should('have.class', 'block')
  })

  it('can have a flex dispaly', () => {
    mount(
      <Formik initialValues={{ testInput: '' }}>
        <CheckboxGroup
          name="testInput"
          label="Test Checkbox"
          dataTestId="checkbox-test"
          options={options}
          flex
        />
      </Formik>, {
      cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=checkbox-test]')
      .find('fieldset')
      .should('have.class', 'flex flex-wrap')
  })

  it('can have a bold label', () => {
    mount(
      <Formik initialValues={{ testInput: '' }}>
        <CheckboxGroup
          name="testInput"
          label="Test Checkbox"
          dataTestId="checkbox-test"
          options={options}
          boldLabel
        />
      </Formik>, {
      cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=checkbox-test]')
      .find('legend')
      .find('span')
      .should('have.class', 'font-bold')
  })

  it('can display hitn text', () => {
    mount(
      <Formik initialValues={{ testInput: '' }}>
        <CheckboxGroup
          name="testInput"
          label="Test Checkbox"
          dataTestId="checkbox-test"
          options={options}
          hintText="hint text"
        />
      </Formik>, {
      cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=checkbox-test]')
      .find('#testInput-hintText')
      .should('have.text', 'hint text')
      .should('have.class', 'block text-gray-600 mt-1 text-sm')
  })
})
