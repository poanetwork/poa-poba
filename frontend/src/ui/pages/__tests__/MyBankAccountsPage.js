import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MyBankAccountsPage from '../MyBankAccountsPage'

configure({ adapter: new Adapter() })

describe('MyBankAccountsPage', () => {
  it('shallow renders correctly', () => {
    const wrapper = shallow(<MyBankAccountsPage />)
    const wrappedContent = wrapper.childAt(0).dive()
    expect(wrappedContent.find('MyBankAccountsPage')).toHaveLength(1)
  })
})
