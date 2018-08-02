import React from 'react'
import Header from './ui/Header'
import Footer from './ui/Footer'
import Main from './ui/Main'
import Sidebar from './ui/Sidebar'
import Content from './ui/Content'
import Section from './ui/Section'
import Web3Provider from './Web3Provider'
import PoBA from './PoBA'

const App = () => (
  <div className="App">
    <Web3Provider
      render={({ web3, accounts }) => {
        let content = null
        if (!web3) {
          content = <div>No web3</div>
        } else if (!accounts || accounts.length === 0) {
          content = <div>No unlocked account</div>
        } else {
          content = <PoBA web3={web3} account={accounts[0]} />
        }

        return (
          <Main>
            <Sidebar />
            <Content>
              <Header />
              <Section>
                <Route exact path="/" component={() => <IndexPage />}/>
                <Route exact path="/help" component={() => <HelpPage />}/>
                <Route path="/register" component={() => <RegisterAddressPage my_web3={this.state.my_web3}
                                                                              contract={this.state.contract}/>}/>
                <Route path="/confirm" component={() => <ConfirmationPage my_web3={this.state.my_web3}
                                                                          contract={this.state.contract}/>}/>
                <Route path="/my-addresses" component={() => <MyAddressesPage my_web3={this.state.my_web3}
                                                                              contract={this.state.contract}/>}/>
                {content}</Section>
              <Footer />
            </Content>
          </Main>
        )
      }}
    />
  </div>
)

export default App
