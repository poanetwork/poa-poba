import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import BankAccountsList from '../BankAccountsList'

configure({ adapter: new Adapter() })

describe('<BankAccountList />', () => {
  it('renders correctly for 0 bank accounts', () => {
    const wrapper = mount(<BankAccountsList bankAccounts={[]} />)

    expect(wrapper.find('div.bank-account-list')).toHaveLength(1)
    expect(wrapper.find('div.bank-account-list div.bank-account-item')).toHaveLength(0)
  })

  it('renders correctly for 1+ bank accounts', () => {
    const bankAccounts = [
      {
        account: '11111111',
        institution: 'institutionName1'
      },
      {
        account: '22222222',
        institution: 'institutionName2'
      }
    ]
    const wrapper = mount(<BankAccountsList bankAccounts={bankAccounts} />)

    expect(wrapper.find('div.bank-account-list')).toHaveLength(1)
    expect(wrapper.find('div.bank-account-list button')).toHaveLength(2)
  })
})
