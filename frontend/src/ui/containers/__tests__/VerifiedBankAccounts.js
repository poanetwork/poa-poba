import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import VerifiedBankAccounts from '../VerifiedBankAccounts'

configure({ adapter: new Adapter() })

describe('VerifiedBankAccounts', () => {
  describe('render when there are no verified bank accounts', () => {
    const mockedPoBAContract = {
      getVerifiedBankAccounts: async () => {
        return Promise.resolve([])
      }
    }
    const mockedProperties = {
      account: 'ACCOUNT',
      getPoBAContract: () => Promise.resolve(mockedPoBAContract)
    }
    const wrapper = shallow(<VerifiedBankAccounts {...mockedProperties} />)
    wrapper.instance().componentDidMount()

    it('renders correctly when there are no verified bank accounts', done => {
      expect(wrapper.find('VerifiedBankAccountsList')).toHaveLength(0)
      expect(wrapper.find('.no-results')).toHaveLength(1)
      done()
    })
  })

  describe('render when there are verified bank accounts', () => {
    const mockedPoBAContract = {
      getVerifiedBankAccounts: async () => {
        const mockedBankAccountTuple = ['', '', '', '']
        return Promise.resolve([mockedBankAccountTuple])
      },
      unregisterBankAccount: async () => {}
    }
    const mockedProperties = {
      account: 'ACCOUNT',
      getPoBAContract: () => Promise.resolve(mockedPoBAContract)
    }
    const wrapper = mount(<VerifiedBankAccounts {...mockedProperties} />)

    it('renders correctly when there are verified bank accounts', done => {
      wrapper.update()
      expect(wrapper.find('.no-results')).toHaveLength(0)
      done()
    })

    it('invokes PoBAContract unregisterBankAccount accordingly', done => {
      const removeButtonWrapper = wrapper.find('.verified-bank-account-list-item__remove-button')
      const spy = jest.spyOn(mockedPoBAContract, 'unregisterBankAccount')
      removeButtonWrapper.simulate('click')
      expect(spy).toHaveBeenCalled()
      done()
    })
  })
})
