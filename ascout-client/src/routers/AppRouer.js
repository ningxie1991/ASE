import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../pages/Home'
import Welcome from '../pages/Welcome'
import WelcomeInitial from '../pages/WelcomeInitial'

class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>
            <Route path='/home' render={() => <Home />} />
            <Route path='/welcome' render={() => <Welcome />} />
            <Route path='/' render={() => <WelcomeInitial />} />
          </div>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default AppRouter
