import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PlaidBankAccounts from '../PlaidBankAccounts'

configure({ adapter: new Adapter() })

const mockedPoBAServer = {
  getSignedBankAccount: () => null,
  getBankAccounts: () => {
    const mockedAccount = {
      account: 'ACCOUNT',
      institution: 'BANK'
    }
    return Promise.resolve([mockedAccount])
  }
}
const mockedPoBAContract = {
  getVerifiedBankAccounts: () => {
    return Promise.resolve([])
  },
  registerBankAccount: () => {
    return Promise.resolve(true)
  }
}

describe('PlaidBankAccounts', () => {
  const mockedProperties = {
    account: 'ACCOUNT',
    plaidToken: 'PLAIDTOKEN',
    PoBAServer: mockedPoBAServer,
    getPoBAContract: () => Promise.resolve(mockedPoBAContract)
  }
  const wrapper = mount(<PlaidBankAccounts {...mockedProperties} />)
  wrapper.instance().componentDidMount()

  it('should render the bank accounts list when the PoPA backend responds with back accounts', done => {
    wrapper.update()
    expect(wrapper.find('.bank-account-list')).toHaveLength(1)
    done()
  })

  it("should invoke backend's getSignedBankAccount & contract's registerBankAccount on Verify", done => {
    const spy = jest.spyOn(mockedPoBAServer, 'getSignedBankAccount')
    const verifyButtonWrapper = wrapper.find('.bank-account-list-item__verify')
    verifyButtonWrapper.simulate('click')
    expect(spy).toHaveBeenCalled()
    done()
  })
})
