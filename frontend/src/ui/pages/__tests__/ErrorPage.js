import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ErrorPage from '../ErrorPage'

configure({ adapter: new Adapter() })

describe('ErrorPage', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ErrorPage />)
    expect(wrapper.find('.error-page')).toHaveLength(1)
  })
})
