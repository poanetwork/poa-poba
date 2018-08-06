import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './ui/Header'
import Footer from './ui/Footer'
import Main from './ui/Main'
import Sidebar from './ui/Sidebar'
import Content from './ui/Content'
import Section from './ui/Section'
import IndexPage from './ui/IndexPage'
import HelpPage from './ui/HelpPage'
import ErrorPage from './ui/ErrorPage'
import BankAccountsPage from './ui/BankAccountsPage'
import Web3Provider from './Web3Provider'

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Main>
        <Sidebar />
        <Content>
          <Header />
          <Section>
            <Route
              exact
              path="/"
              component={() => (
                <Web3Provider
                  render={({ web3, accounts }) => {
                    let content = null
                    if (!web3) {
                      content = <ErrorPage error="web3" />
                    } else if (!accounts || accounts.length === 0) {
                      content = <ErrorPage error="unlock" />
                    } else {
                      console.log('web3', web3)
                      content = <IndexPage web3={web3} accounts={accounts} />
                    }
                    return content
                  }}
                />
              )}
            />
            <Route exact path="/help" component={() => <HelpPage />} />
            <Route
              path="/bankaccountslist/:token"
              component={props => <BankAccountsPage props={props} />}
            />
          </Section>
          <Footer />
        </Content>
      </Main>
    </BrowserRouter>
  </div>
)

export default App
