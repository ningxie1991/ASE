import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/home/Home'

const App = () => (
  <Switch>
    <Route path='/' component={Home}></Route>
  </Switch>
)

export default App
