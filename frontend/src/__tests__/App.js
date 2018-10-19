import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { AppContainer } from '../App'

configure({ adapter: new Adapter() })

describe('AppContainer', () => {
  it('renders correctly when no wallet is present', () => {
    const wrapper = shallow(<AppContainer web3={null} />)

    // @TODO: test the rest of the scenarios
    expect(wrapper.find('.App')).toHaveLength(1)
    expect(wrapper.find('Header')).toHaveLength(1)
    expect(wrapper.find('Footer')).toHaveLength(1)
  })

  it('renders correctly when a wallet and account is unlocked', () => {
    const web3State = {
      isConnected: false
    }
    const web3 = {
      eth: {
        getAccounts: () => Promise.resolve(['account'])
      }
    }
    const wrapper = shallow(<AppContainer web3={web3} web3State={web3State} />)
    expect(wrapper.find('.App')).toHaveLength(1)
    expect(wrapper.find('BrowserRouter')).toHaveLength(0)
    wrapper.setProps({
      web3State: { isConnected: true },
      web3
    })
    // Still renders ok
    expect(wrapper.find('.App')).toHaveLength(1)
  })
})
