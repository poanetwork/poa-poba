import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './ui/layout/Header'
import Footer from './ui/layout/Footer'
import Main from './ui/layout/Main'
import Sidebar from './ui/layout/Sidebar'
import Content from './ui/layout/Content'
import Section from './ui/layout/Section'
import IndexPage from './ui/pages/IndexPage'
import HelpPage from './ui/pages/HelpPage'
import ErrorPage from './ui/pages/ErrorPage'
import BankAccountsPage from './ui/pages/BankAccountsPage'
import MyBankAccountsPage from './ui/pages/MyBankAccountsPage'
import Web3Provider from './Web3Provider'

const noWeb3Render = () => <ErrorPage error="noWeb3Render" />
const noUnlockedAccountRender = () => <ErrorPage error="noUnlockedAccountRender" />
const routesRender = (web3, accounts) => {
  return (
    <section>
      <Route exact path="/" component={() => <IndexPage web3={web3} accounts={accounts} />} />
      <Route exact path="/help" component={() => <HelpPage />} />
      <Route
        path="/bankaccountslist/:token"
        component={props => <BankAccountsPage props={props} web3={web3} account={accounts[0]} />}
      />
      <Route
        path="/mybankaccountslist"
        component={props => <MyBankAccountsPage props={props} web3={web3} account={accounts[0]} />}
      />
    </section>
  )
}

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Main>
        <Sidebar />
        <Content>
          <Header />
          <Section>
            <Web3Provider
              render={({ web3, accounts }) => {
                let content = null
                if (!web3) {
                  content = noWeb3Render()
                } else if (!accounts || accounts.length === 0) {
                  content = noUnlockedAccountRender()
                } else {
                  content = routesRender(web3, accounts)
                }
                return content
              }}
            />
          </Section>
          <Footer />
        </Content>
      </Main>
    </BrowserRouter>
  </div>
)

export default App
