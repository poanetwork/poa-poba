import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Logo from '../ui/Logo'

configure({ adapter: new Adapter() })

describe('<Logo />', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Logo />)

    expect(wrapper.find('a.poa-logo')).toHaveLength(1)
  })
})
