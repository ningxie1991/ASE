import { createMuiTheme } from '@material-ui/core'
import React, { Component } from 'react'
import './App.css'
import Home from './pages/Home'
import AppRouter from './routers/AppRouer'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './Theme'
export default class App extends Component {
  constructor(props) {
    super(props)
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
