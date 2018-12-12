import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import VerifiedBankAccountsList from '../VerifiedBankAccountsList'

configure({ adapter: new Adapter() })

// Mock react-router-dom Link to prevent error of WithBackButton wrapped page
jest.mock('react-router-dom', () => ({
  Link: () => null
}))

describe('<VerifiedBankAccountsList />', () => {
  it('renders correctly for 0 accounts', () => {
    const wrapper = mount(<VerifiedBankAccountsList bankAccounts={[]} />)

    expect(wrapper.find('div.verified-bank-account-list-item')).toHaveLength(0)
  })

  it('renders correctly for 1+ accounts', () => {
    const bankAccounts = [
      {
        account: '11111111',
        bankName: 'institutionName1'
      },
      {
        account: '22222222',
        bankName: 'institutionName2'
      }
    ]
    const wrapper = mount(<VerifiedBankAccountsList bankAccounts={bankAccounts} />)

    expect(wrapper.find('div.verified-bank-account-list')).toHaveLength(1)
    expect(wrapper.find('div.verified-bank-account-list-item')).toHaveLength(2)
  })
})
