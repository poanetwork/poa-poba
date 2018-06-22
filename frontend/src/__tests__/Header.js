import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Header from '../ui/Header'

configure({ adapter: new Adapter() })

describe('<Header />', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Header />)

    expect(wrapper.find('header')).toHaveLength(1)
    expect(wrapper.find('header div.logo-container')).toHaveLength(1)
    expect(wrapper.find('header div.logo-container a.poa-logo')).toHaveLength(1)
  })
})
