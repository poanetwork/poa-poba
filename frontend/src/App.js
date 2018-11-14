import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { withWeb3 } from 'react-web3-provider'
import Header from './ui/layout/Header'
import Footer from './ui/layout/Footer'
import Main from './ui/layout/Main'
import Sidebar from './ui/layout/Sidebar'
import Content from './ui/layout/Content'
import Section from './ui/layout/Section'
import IndexPage from './ui/pages/IndexPage'
import HelpPage from './ui/pages/HelpPage'
import ErrorPage from './ui/pages/ErrorPage'
import MyPlaidBankAccountsPage from './ui/pages/MyPlaidBankAccountsPage'
import MyVerifiedBankAccountsPage from './ui/pages/MyVerifiedBankAccountsPage'

export class AppContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedAccount: null
    }
  }

  componentDidUpdate(prevProps) {
    const { web3, web3State } = this.props
    if (web3State.isConnected !== prevProps.web3State.isConnected && web3) {
      web3.eth.getAccounts().then(accounts => {
        this.setState({
          selectedAccount: accounts[0]
        })
      })
    }
  }

  renderRoutes() {
    const { web3 } = this.props
    const { selectedAccount } = this.state
    return (
      <BrowserRouter>
        <section>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/help" component={HelpPage} />
          <Route
            path="/bankaccountslist/:token"
            component={props => (
              <MyPlaidBankAccountsPage props={props} web3={web3} account={selectedAccount} />
            )}
          />
          <Route
            path="/mybankaccountslist"
            component={() => <MyVerifiedBankAccountsPage web3={web3} account={selectedAccount} />}
          />
        </section>
      </BrowserRouter>
    )
  }

  render() {
    const { web3 } = this.props
    const { selectedAccount } = this.state

    return (
      <div className="App">
        <Main>
          <Sidebar />
          <Content>
            <Header />
            <Section>
              <section className="h100percent">
                {!web3 || !selectedAccount ? <ErrorPage /> : this.renderRoutes()}
              </section>
            </Section>
            <Footer />
          </Content>
        </Main>
      </div>
    )
  }
}

const App = withWeb3(AppContainer)
export default App
