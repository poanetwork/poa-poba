import { createContext } from 'react'

const PlaidContext = createContext({})

export const PlaidContextProvider = PlaidContext.Provider
export const PlaidContextConsumer = PlaidContext.Consumer

const LOCAL_STORAGE_KEY = 'PlaidToken'

export class PlaidContextManager {
  constructor() {
    this.plaidToken = null
    this.setPlaidToken = token => {
      localStorage.setItem(LOCAL_STORAGE_KEY, token)
    }
    this.getPlaidToken = () => localStorage.getItem(LOCAL_STORAGE_KEY)
  }
}

export default PlaidContext
