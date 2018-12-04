import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AddClaimToIdentityPage from '../AddClaimToIdentityPage'

configure({ adapter: new Adapter() })

// Mock react-router-dom Link to prevent error of WithBackButton wrapped page
jest.mock('react-router-dom', () => ({
  Link: () => null
}))

describe('AddClaimToIdentityPage', () => {
  const mockedProps = {
    web3: {},
    account: 'ACCOUNT',
    match: {
      params: {
        keccakIdentifier: 'KECCAKIDENTIFIER'
      }
    }
  }

  it('renders/mounts correctly', () => {
    const wrapper = mount(<AddClaimToIdentityPage {...mockedProps} />)
    expect(wrapper.find('.add-claim-to-identity-page')).toHaveLength(1)
  })
})
