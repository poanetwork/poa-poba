import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Erc725ClaimContent from '../Erc735ClaimContent'

configure({ adapter: new Adapter() })

describe('<Erc725ClaimContent />', () => {
  it('renders a message when no erc735 claim present ', () => {
    const wrapper = mount(<Erc725ClaimContent erc735Claim={null} />)
    expect(wrapper.find('p')).toHaveLength(1)
    expect(wrapper.find('.erc735-claim-data')).toHaveLength(0)
  })
  it('renders the erc735 claim content when it is present', () => {
    const erc735Claim = {
      issuer: '0x...',
      signature: '0x...',
      data: '0x...',
      uri: 'something'
    }
    const wrapper = mount(<Erc725ClaimContent erc735Claim={erc735Claim} />)
    expect(wrapper.find('pre.erc735-claim-content')).toHaveLength(1)
  })
})
