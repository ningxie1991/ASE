import React from 'react'
import { Route, Switch } from 'react-router'
import BrowsingPage from '../pages/browsing/BrowsingPage'
import Home from '../pages/Home'
import Welcome from '../pages/landing/Landing'
import WelcomeInitial from '../pages/landing/WelcomeInitial'

class AppRouter extends React.Component {
  render() {
    return (
      <Switch>
        <div>
          <Route path='/listings' exact component={BrowsingPage} />
          <Route path='/home' exact component={Welcome} />
          <Route path='/' exact component={WelcomeInitial} />
        </div>
      </Switch>
    )
  }
}

export default AppRouter
