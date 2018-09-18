import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import BankAccountsPage from '../BankAccountsPage'

configure({ adapter: new Adapter() })

describe('BankAccountsPage', () => {
  it('shallow renders correctly', () => {
    const wrapper = shallow(<BankAccountsPage />)
    const wrappedContent = wrapper.childAt(0).dive()
    expect(wrappedContent.find('BankAccountsPage')).toHaveLength(1)
  })
})
