import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import RegisteredAccountsList from '../ui/presentational/RegisteredAccountsList'

configure({ adapter: new Adapter() })

describe('<RegisteredAccountsList />', () => {
  it('renders correctly for 0 accounts', () => {
    const wrapper = mount(<RegisteredAccountsList accounts={[]} />)

    expect(wrapper.find('div.registered-accounts-list')).toHaveLength(0)
  })

  it('renders correctly for 1+ accounts', () => {
    const wrapper = mount(<RegisteredAccountsList accounts={['account_1', 'account_2']} />)

    expect(wrapper.find('div.registered-accounts-list')).toHaveLength(1)
    expect(wrapper.find('div.registered-accounts-list ul')).toHaveLength(1)
    expect(wrapper.find('div.registered-accounts-list ul li')).toHaveLength(2)
  })
})
