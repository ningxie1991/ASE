import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import hist from './utils/History'

ReactDOM.render(
  <Router history={hist}>
    <App />
  </Router>,
  document.getElementById('root')
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))

// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
