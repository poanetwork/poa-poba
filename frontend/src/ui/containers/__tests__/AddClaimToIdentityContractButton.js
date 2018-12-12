import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AddClaimToIdentityContractButton from '../AddClaimToIdentityContractButton'
import Loading from '../../presentational/Loading'

configure({ adapter: new Adapter() })

describe('AddClaimToIdentityContractButton', () => {
  it('should render ok', () => {
    const props = {
      web3: {},
      fromWallet: '',
      identityContractAddress: '',
      erc735Claim: {}
    }
    const wrapper = mount(<AddClaimToIdentityContractButton {...props} />)
    expect(wrapper.find(Loading)).toHaveLength(1)
    expect(wrapper.find('button')).toHaveLength(1)
  })
  it('should render a disabled button when no erc735Claim', () => {
    const props = {
      web3: {},
      fromWallet: '',
      identityContractAddress: ''
    }
    const wrapper = mount(<AddClaimToIdentityContractButton {...props} />)
    expect(wrapper.find(Loading)).toHaveLength(1)
    expect(wrapper.find('button[disabled]')).toHaveLength(1)
  })
  it('should invoke executeAddClaimOnIdentityContract when enabled and clicked', () => {
    const props = {
      web3: {},
      fromWallet: '',
      identityContractAddress: '',
      erc735Claim: {},
      executeAddClaimOnIdentityContractFunction: jest.fn(() => Promise.resolve(true))
    }
    const wrapper = mount(<AddClaimToIdentityContractButton {...props} />)
    wrapper.simulate('click')
    expect(props.executeAddClaimOnIdentityContractFunction).toHaveBeenCalled()
  })
})
