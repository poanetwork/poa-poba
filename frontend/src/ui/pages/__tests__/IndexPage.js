import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import IndexPage from '../IndexPage'

configure({ adapter: new Adapter() })

describe('IndexPage', () => {
  it('renders correctly', () => {
    const props = {
      web3: null,
      accounts: [null]
    }
    const wrapper = shallow(<IndexPage {...props} />)
    expect(wrapper.find('.main')).toHaveLength(1)
  })
})
