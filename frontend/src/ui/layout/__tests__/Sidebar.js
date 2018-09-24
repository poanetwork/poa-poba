import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Sidebar from '../Sidebar'

configure({ adapter: new Adapter() })

describe('<Sidebar />', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Sidebar />)
    expect(wrapper.find('.sidebar')).toHaveLength(1)
  })
})
