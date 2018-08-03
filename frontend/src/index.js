import React from 'react'
import ReactDOM from 'react-dom'
import 'font-awesome/css/font-awesome.css'
import App from './App'
import './ui/styles/global'
import registerServiceWorker from './registerServiceWorker'

import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
