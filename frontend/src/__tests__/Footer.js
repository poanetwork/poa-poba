import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Footer from '../ui/layout/Footer'

configure({ adapter: new Adapter() })

describe('<Footer />', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Footer />)

    expect(wrapper.find('div.footer')).toHaveLength(1)
    expect(wrapper.find('div div.logo-container')).toHaveLength(1)
    expect(wrapper.find('div div.logo-container p')).toHaveLength(1)
    expect(wrapper.find('div div.logo-container div.social-container')).toHaveLength(1)
    expect(wrapper.find('div div.logo-container div.social-container a.social-item')).toHaveLength(
      3
    )
  })
})
