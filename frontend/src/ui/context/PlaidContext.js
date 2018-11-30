import { createContext } from 'react'

const PlaidContext = createContext({})

export const PlaidContextProvider = PlaidContext.Provider
export const PlaidContextConsumer = PlaidContext.Consumer

export class PlaidContextManager {
  constructor() {
    this.plaidToken = null
    this.setPlaidToken = token => {
      this.plaidToken = token
    }
    this.getPlaidToken = () => this.plaidToken
  }
}

export default PlaidContext
