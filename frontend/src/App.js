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
import BankAccountsPage from './ui/BankAccountsPage'
import Web3Provider from './Web3Provider'

const noWeb3Render = () => <div>No web3</div>
const noUnlockedAccountRender = () => <div>No unlocked account</div>
const routesRender = (web3, accounts) => {
  return (
    <section>
      <Route exact path="/" component={() => <IndexPage web3={web3} accounts={accounts} />} />
      <Route exact path="/help" component={() => <HelpPage />} />
      <Route
        path="/bankaccountslist/:token"
        component={props => <BankAccountsPage props={props} web3={web3} account={accounts[0]} />}
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
