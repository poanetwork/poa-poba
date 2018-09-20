import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { MyBankAccountsContainer } from '../MyBankAccountsPage'

configure({ adapter: new Adapter() })

describe('MyBankAccountsContainer', () => {
  it('shallow renders correctly (renders the wrapped MyBankAccounts)', () => {
    const wrapper = shallow(<MyBankAccountsContainer />)
    expect(wrapper.find('MyBankAccounts')).toHaveLength(1)
  })
})
