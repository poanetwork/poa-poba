import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import LogoContainer from '../ui/LogoContainer'

configure({ adapter: new Adapter() })

describe('<LogoContainer />', () => {
  it('renders correctly', () => {
    const wrapper = mount(<LogoContainer />)

    expect(wrapper.find('div.logo-container')).toHaveLength(1)
  })
})
