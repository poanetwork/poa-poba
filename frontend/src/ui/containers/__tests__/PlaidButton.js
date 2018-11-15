import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PlaidButton from '../PlaidButton'

// Mock react-router's Redirect
jest.mock('react-router-dom', () => {
  return {
    Redirect: () => <a href="./redirect">A redirect</a>
  }
})

configure({ adapter: new Adapter() })

describe('PlaidButton', () => {
  it('renders correctly', () => {
    const wrapper = mount(<PlaidButton />)
    expect(wrapper.find('.plaid-link-wrapper')).toHaveLength(1)
    expect(wrapper.find('PlaidLink')).toHaveLength(1)
  })
  it('renders a Redirect (to bank accouts list) upon state.plaidToken set', done => {
    const wrapper = mount(<PlaidButton />)
    expect(wrapper.find('.plaid-link-wrapper')).toHaveLength(1)
    expect(wrapper.find('PlaidLink')).toHaveLength(1)
    wrapper.setState({
      plaidToken: 'something'
    })
    console.warn(wrapper.html().toString())
    expect(wrapper.find('Redirect')).toHaveLength(1)
    done()
  })
})
