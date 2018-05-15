import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Web3 from 'web3'
import Web3Provider from '../Web3Provider'

configure({ adapter: new Adapter() })

describe('Web3Provider', () => {
  let wrapper = null

  it("passes a null web3 if it's not present", done => {
    wrapper = mount(
      <Web3Provider
        render={({ web3, allFetched }) => {
          allFetched.then(() => {
            if (!web3) {
              done()
            }
          })
        }}
      />
    )
  })

  it('passes the web3 object when present', done => {
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

    wrapper = mount(
      <Web3Provider
        render={({ web3, allFetched }) => {
          allFetched.then(() => {
            if (window.web3.currentProvider === web3.currentProvider) {
              done()
            } else {
              done.fail('Injected web3 is not the same as global')
            }
          })
        }}
      />
    )
  })

  it('passes the unlocked accounts', done => {
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

    wrapper = mount(
      <Web3Provider
        render={({ accounts, allFetched }) => {
          allFetched.then(() => {
            if (accounts && accounts.length) {
              done()
            }
          })
        }}
      />
    )
  })

  it('passes the networkId', done => {
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

    wrapper = mount(
      <Web3Provider
        render={({ networkId, allFetched }) => {
          allFetched.then(() => {
            if (networkId) {
              done()
            }
          })
        }}
      />
    )
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
      wrapper = null
    }
  })
})
