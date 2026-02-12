import React from 'react'
import { shallow } from 'enzyme'
import HtmlBuilder from './HtmlBuilder'

const setUp = (props = {}) => {
  const component = shallow(<HtmlBuilder {...props} />)
  return component
}

const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-testid='${attr}']`)
  return wrapper
}

describe('html builder component', () => {
  describe('Have props', () => {
    let wrapper
    beforeEach(() => {
      const props = {
        header: 'Test Header'
        desc: 'Test Desc'
      }
      wrapper
    })
})
