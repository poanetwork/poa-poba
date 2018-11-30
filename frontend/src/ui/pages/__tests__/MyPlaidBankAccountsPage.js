import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { MyPlaidAccountsContainer } from '../MyPlaidBankAccountsPage'

configure({ adapter: new Adapter() })

jest.mock('../../context/PlaidContext', () => {
  return {
    PlaidContextConsumer: args => console.error(args)
  }
})
describe('MyPlaidAccountsContainer', () => {
  it('shallow renders correctly (renders the wrapped PlaidBankAccounts)', () => {
    const wrapper = shallow(<MyPlaidAccountsContainer />)
    expect(wrapper.find('PlaidBankAccounts')).toHaveLength(1)
  })
})
