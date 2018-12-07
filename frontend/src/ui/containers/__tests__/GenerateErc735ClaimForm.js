import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Web3 from 'web3'
import GenerateErc735ClaimForm from '../GenerateErc735ClaimForm'

configure({ adapter: new Adapter() })

const mockedErc735ClaimData = {
  issuerAddress: '0x...',
  signature: '0x...',
  data: '0x...',
  uri: 'something'
}
const mockedPoBAServer = {
  generateErc735Claim: () => {
    return Promise.resolve(mockedErc735ClaimData)
  }
}
const mockedProperties = {
  account: 'ACCOUNT',
  keccakIdentifier: 'KECCAKIDENTIFIER',
  PoBAServer: mockedPoBAServer,
  web3: new Web3(),
  onErc735ClaimGenerated: jest.fn()
}

describe('GenerateErc735ClaimForm', async () => {
  it('should render ok', () => {
    const wrapper = mount(<GenerateErc735ClaimForm {...mockedProperties} />)
    expect(wrapper.find('.generate-erc-735-claim-form')).toHaveLength(1)
    expect(wrapper.find('form')).toHaveLength(1)
  })
  it('should not allow to submit the form if identity address contract is empty', () => {
    const wrapper = mount(<GenerateErc735ClaimForm {...mockedProperties} />)
    const spy = jest.spyOn(mockedPoBAServer, 'generateErc735Claim')
    wrapper.find('form').simulate('submit', { preventDefault: () => true })
    expect(spy).not.toHaveBeenCalled()
  })
  it('should not allow to submit the form if identity address contract is not a valid address', () => {
    const wrapper = mount(<GenerateErc735ClaimForm {...mockedProperties} />)
    const identityContractAddress = '0x...'
    wrapper.setState({ identityContractAddress })
    const spy = jest.spyOn(mockedPoBAServer, 'generateErc735Claim')
    wrapper.find('form').simulate('submit', { preventDefault: () => true })
    expect(spy).not.toHaveBeenCalled()
  })
  it('should invoke generateErc735Claim when identity contract address is valid and the form is submitted', () => {
    const wrapper = mount(<GenerateErc735ClaimForm {...mockedProperties} />)
    const identityContractAddress = '0x92970dbD5C0Ee6b439422bFd7cD71e1DDA921A03'
    wrapper.setState({ identityContractAddress })
    wrapper.find('form').simulate('submit', { preventDefault: () => true })
    expect(mockedPoBAServer.generateErc735Claim).toHaveBeenCalledWith(
      mockedProperties.account,
      mockedProperties.keccakIdentifier,
      identityContractAddress
    )
  })
  it('should invoke onErc735ClaimGenerated when after the form got submitted and the claim was successfully generated', () => {
    const wrapper = mount(<GenerateErc735ClaimForm {...mockedProperties} />)
    const identityContractAddress = '0x92970dbD5C0Ee6b439422bFd7cD71e1DDA921A03'
    wrapper.setState({ identityContractAddress })
    wrapper.find('form').simulate('submit', { preventDefault: () => true })
    expect(mockedProperties.onErc735ClaimGenerated).toHaveBeenCalledWith({
      type: 7,
      scheme: 1,
      issuer: mockedErc735ClaimData.issuerAddress,
      signature: mockedErc735ClaimData.signature,
      data: mockedErc735ClaimData.data,
      uri: mockedErc735ClaimData.uri
    })
  })
})
