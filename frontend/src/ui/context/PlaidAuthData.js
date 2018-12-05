const LOCAL_STORAGE_KEY = 'PlaidToken'

// Simple methods to interface with localStorage, and to keep this out of UI components
export const getPlaidToken = () => localStorage.getItem(LOCAL_STORAGE_KEY)
export const setPlaidToken = token => localStorage.setItem(LOCAL_STORAGE_KEY, token)
