import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Section from '../Section'

configure({ adapter: new Adapter() })

describe('<Section />', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Section />)
    expect(wrapper.find('.section')).toHaveLength(1)
  })
})
