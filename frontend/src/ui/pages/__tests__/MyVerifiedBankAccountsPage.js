import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { MyVerifiedBankAccounts } from '../MyVerifiedBankAccountsPage'

configure({ adapter: new Adapter() })

describe('MyVerifiedBankAccounts', () => {
  it('shallow renders correctly (renders the wrapped VerifiedBankAccounts)', () => {
    const wrapper = shallow(<MyVerifiedBankAccounts />)
    expect(wrapper.find('VerifiedBankAccounts')).toHaveLength(1)
  })
})
