import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import BankAccountList from '../ui/BankAccountList'

configure({ adapter: new Adapter() })

describe('<BankAccountList />', () => {
  it('renders correctly for 0 bank accounts', () => {
    const wrapper = mount(<BankAccountList bankAccounts={[]} />)

    expect(wrapper.find('div.bank-account-list')).toHaveLength(1)
    expect(wrapper.find('div.bank-account-list div.bank-account-item')).toHaveLength(0)
  })

  it('renders correctly for 1+ bank accounts', () => {
    const wrapper = mount(<BankAccountList bankAccounts={['bank_account_1', 'bank_account_2']} />)

    expect(wrapper.find('div.bank-account-list')).toHaveLength(1)
    expect(wrapper.find('div.bank-account-list button')).toHaveLength(2)
  })
})
