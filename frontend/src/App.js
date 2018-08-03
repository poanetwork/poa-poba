import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Header from './ui/Header'
import Footer from './ui/Footer'
import Main from './ui/Main'
import Sidebar from './ui/Sidebar'
import Content from './ui/Content'
import Section from './ui/Section'
import IndexPage from './ui/IndexPage'
import HelpPage from './ui/HelpPage'
import Web3Provider from './Web3Provider'

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Main>
        <Sidebar />
        <Content>
          <Header />
          <Section>
            <Route exact path="/" component={() => (
              <Web3Provider
                render={({ web3, accounts }) => {
                  let content = null
                  if (!web3) {
                    content = <div>No web3</div>
                  } else if (!accounts || accounts.length === 0) {
                    content = <div>No unlocked account</div>
                  } else {
                    content = <IndexPage web3={web3} accounts={accounts} />
                  }
                  return content
                }} />
            )} />
            <Route exact path="/help" component={() => <HelpPage />}/>
            {/*<Route path="/register" component={() => <RegisterAddressPage my_web3={this.state.my_web3}*/}
                                                                          {/*contract={this.state.contract}/>}/>*/}
            {/*<Route path="/confirm" component={() => <ConfirmationPage my_web3={this.state.my_web3}*/}
                                                                      {/*contract={this.state.contract}/>}/>*/}
            {/*<Route path="/my-addresses" component={() => <MyAddressesPage my_web3={this.state.my_web3}*/}
                                                                          {/*contract={this.state.contract}/>}/>*/}
            {/*{content}*/}
          </Section>
          <Footer />
        </Content>
      </Main>
    </BrowserRouter>
  </div>
)

export default App
