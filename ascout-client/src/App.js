import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import React, { Component } from 'react'
import './App.css'
import AppRouter from './routers/AppRouer'
import theme from './Theme'

export default class App extends Component {
  constructor(props) {
    super(props)
    console.log('env:', process.env.NODE_ENV)
    console.log(
      'calculator-service url:',
      process.env.REACT_APP_BACKEND_CALCULATOR_API
    )
    console.log('browse-service url:', process.env.REACT_APP_BACKEND_BROWSE_API)
  }

  render() {
    return (
      <div className='App'>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouter></AppRouter>
        </ThemeProvider>
      </div>
    )
  }
}
