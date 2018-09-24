import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Content from '../Content'

configure({ adapter: new Adapter() })

describe('<Content />', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Content />)
    expect(wrapper.find('.content')).toHaveLength(1)
  })
})
