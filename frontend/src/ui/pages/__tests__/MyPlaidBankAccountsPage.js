import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { MyPlaidAccountsContainer } from '../MyPlaidBankAccountsPage'

configure({ adapter: new Adapter() })

describe('MyPlaidAccountsContainer', () => {
  it('shallow renders correctly (renders the wrapped PlaidBankAccounts)', () => {
    const mockedProps = {
      props: {
        match: {
          params: {
            token: 'FAKEPLAIDTOKEN'
          }
        }
      }
    }
    const wrapper = shallow(<MyPlaidAccountsContainer {...mockedProps} />)
    expect(wrapper.find('PlaidBankAccounts')).toHaveLength(1)
  })
})
