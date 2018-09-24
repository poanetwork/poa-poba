import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import HelpPage from '../HelpPage'

configure({ adapter: new Adapter() })

describe('HelpPage', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<HelpPage />)

    const wrappedContent = wrapper
      .childAt(0)
      .childAt(0)
      .dive()
    expect(wrappedContent.find('.help-page')).toHaveLength(1)
  })
})
