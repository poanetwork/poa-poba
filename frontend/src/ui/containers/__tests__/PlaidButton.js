import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PlaidButton from '../PlaidButton'

configure({ adapter: new Adapter() })

describe('PlaidButton', () => {
  it('renders correctly', () => {
    const wrapper = mount(<PlaidButton />)
    expect(wrapper.find('.plaid-link-wrapper')).toHaveLength(1)
    expect(wrapper.find('PlaidLink')).toHaveLength(1)
  })
})
