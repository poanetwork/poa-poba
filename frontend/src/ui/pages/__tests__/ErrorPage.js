import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ErrorPage from '../ErrorPage'

configure({ adapter: new Adapter() })

describe('ErrorPage', () => {
  it('renders correctly when wallet is not found', () => {
    const wrapper = mount(<ErrorPage error="noWeb3Render" />)
    expect(wrapper.find('.error-page')).toHaveLength(1)
  })
  it('renders correctly when wallet is not found', () => {
    const wrapper = mount(<ErrorPage error="noUnlockedAccountRender" />)
    expect(wrapper.find('.error-page')).toHaveLength(1)
  })
})
