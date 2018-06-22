import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Title from '../ui/Title'

configure({ adapter: new Adapter() })

describe('<Title />', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Title />)

    expect(wrapper.find('h1')).toHaveLength(1)
  })
})
