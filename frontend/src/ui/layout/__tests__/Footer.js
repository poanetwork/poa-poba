import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Footer from '../ui/layout/Footer'

configure({ adapter: new Adapter() })

describe('<Footer />', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Footer />)

    expect(wrapper.find('footer')).toHaveLength(1)
    expect(wrapper.find('footer .rights-reserved')).toHaveLength(1)
    expect(wrapper.find('footer .social-container')).toHaveLength(1)
    expect(wrapper.find('footer .social-container .social-item')).toHaveLength(4)
  })
})
