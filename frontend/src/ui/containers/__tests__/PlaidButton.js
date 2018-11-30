import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { PlaidButton } from '../PlaidButton'

configure({ adapter: new Adapter() })

// Mock react-router's Redirect
jest.mock('react-router-dom', () => {
  return {
    Redirect: () => (
      <a className="redirect" href="./redirect">
        A redirect
      </a>
    )
  }
})

describe('PlaidButton', () => {
  it('renders correctly', () => {
    const wrapper = mount(<PlaidButton />)
    expect(wrapper.find('.plaid-link-wrapper')).toHaveLength(1)
    expect(wrapper.find('PlaidLink')).toHaveLength(1)
  })
  it('renders a Redirect (to bank accouts list) upon state.plaidToken set', done => {
    const callback = jest.fn()
    const wrapper = mount(<PlaidButton onPlaidLinkSuccess={callback} />)
    expect(wrapper.find('.plaid-link-wrapper')).toHaveLength(1)
    expect(wrapper.find('PlaidLink')).toHaveLength(1)

    wrapper.instance().setPlaidToken('PLAIDTOKEN')
    wrapper.update()
    expect(wrapper.find('.redirect')).toHaveLength(1)
    done()
  })
})
