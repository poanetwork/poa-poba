import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BankAccountsContainer } from '../BankAccountsPage'

configure({ adapter: new Adapter() })

describe('BankAccountsContainer', () => {
  it('shallow renders correctly (renders the wrapped BankAccounts)', () => {
    const mockedProps = {
      props: {
        match: {
          params: {
            token: 'FAKEPLAIDTOKEN'
          }
        }
      }
    }
    const wrapper = shallow(<BankAccountsContainer { ...mockedProps } />)
    expect(wrapper.find('BankAccounts')).toHaveLength(1)
  })
})
