import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from '../App'

configure({ adapter: new Adapter() })

describe('App component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<App />)

    expect(wrapper.find('BrowserRouter')).toHaveLength(1)
    expect(wrapper.find('Web3Provider')).toHaveLength(1)
    expect(wrapper.find('Header')).toHaveLength(1)
    expect(wrapper.find('Footer')).toHaveLength(1)
  })
})
