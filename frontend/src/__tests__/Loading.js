import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Loading from '../ui/general/Loading'

configure({ adapter: new Adapter() })

describe('<Loading />', () => {
  it('renders correctly when show is false', () => {
    const wrapper = mount(<Loading />)

    expect(wrapper.find('div.loading-container')).toHaveLength(0)
  })
  it('renders correctly when show is true', () => {
    const wrapper = mount(<Loading show={true} />)

    expect(wrapper.find('div.loading-container')).toHaveLength(1)
    expect(wrapper.find('div.loading-container div.loading-inner')).toHaveLength(1)
    expect(wrapper.find('div.loading-container div.loading-inner div.loading-dot')).toHaveLength(6)
  })
})
