import React from 'react'
import ReactDOM from 'react-dom'
import { css } from 'glamor'
import 'font-awesome/css/font-awesome.css'
import App from './App'
import globalStyles from './ui/styles/global'
import registerServiceWorker from './registerServiceWorker'

css.global('*', {
  boxSizing: 'border-box'
})
css.global('html, body', globalStyles)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
