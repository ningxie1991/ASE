import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../pages/Home'
import Welcome from '../pages/Welcome'
import WelcomeInitial from '../pages/WelcomeInitial'

class AppRouter extends React.Component {
  render() {
    return (
      <Switch>
        <div>
          <Route path='/listings' exact component={Home} />
          <Route path='/home' exact component={Welcome} />
          <Route path='/' exact component={WelcomeInitial} />
        </div>
      </Switch>
    )
  }
}

export default AppRouter
