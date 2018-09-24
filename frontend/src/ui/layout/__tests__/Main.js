import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Main from '../Main'

configure({ adapter: new Adapter() })

describe('<Main />', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Main />)

    expect(wrapper.find('div')).toHaveLength(1)
  })
})
