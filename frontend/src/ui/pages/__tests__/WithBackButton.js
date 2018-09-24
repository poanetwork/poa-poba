import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import WithBackButton from '../WithBackButton'

configure({ adapter: new Adapter() })

const BasicComponent = () => <div className="basic-component" />

describe('WithBackButton high order component', () => {
  it('renders correctly', () => {
    const BasicComponentWithBackButton = WithBackButton(BasicComponent)

    // Check that it render without throwing any exception and that the original
    // component is rendered too
    const wrapper = shallow(<BasicComponentWithBackButton />)
    expect(wrapper.find(BasicComponent)).toHaveLength(1)

    // Check basic classNames are in place (at a specific position)
    const WithBackButtonShallow = wrapper.first().shallow()
    expect(WithBackButtonShallow.find('.with-back-button')).toHaveLength(1)
    const WrappedContentShallow = WithBackButtonShallow.childAt(0).shallow()
    expect(WrappedContentShallow.find('.with-back-button-wrapped-content')).toHaveLength(1)

    // Check that the back button is rendered too (at a specific position)
    const BackButtonShallow = WithBackButtonShallow.childAt(1).shallow()
    expect(BackButtonShallow.find('button')).toHaveLength(1)
  })
})
