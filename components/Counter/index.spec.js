import { mount } from '@cypress/react'
import { Formik } from 'formik'
import Counter from './Counter'

describe('<Counter />', () => {
  it('can auto complete an input', () => {
    let num = 0
    mount(
      <Formik initialValues={{ testInput: '' }}>
        <Counter
          name="testInput"
          label="Test Counter"
          testID="counter-test"
          num={num}
          addNum={() => (num + 1)}
          removeNum={() => (num - 1)}
          className=""
        />
      </Formik>, {
      cssFiles: 'styles/index.css',
    }
    )

    cy.get('[data-testid=counter-testMin]')
      .should('exist')

    cy.get('[data-testid=counter-testPlus]')
      .should('exist')
  })
})
