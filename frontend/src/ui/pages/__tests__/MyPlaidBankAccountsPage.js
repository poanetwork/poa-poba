import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { MyPlaidAccountsContainer } from '../MyPlaidBankAccountsPage'
import { setPlaidToken } from '../../context/PlaidAuthData'

configure({ adapter: new Adapter() })

// Fake localStorage
const localStorage = {
  setItem(key, value) {
    this.keyValues = {}
    this.keyValues[key] = value
  },
  getItem(key) {
    return this.keyValues[key]
  }
}
window.localStorage = localStorage

describe('MyPlaidAccountsContainer', () => {
  it('shallow renders correctly (renders the wrapped PlaidBankAccounts)', () => {
    setPlaidToken('FAKEPLAIDTOKEN')
    const wrapper = shallow(<MyPlaidAccountsContainer />)
    expect(wrapper.find('PlaidBankAccounts')).toHaveLength(1)
  })
})
