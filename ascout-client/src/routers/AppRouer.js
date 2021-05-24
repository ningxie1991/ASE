import Landing from 'pages/landing/Landing'
import Welcome from 'pages/landing/Welcome'
import TripItinerary from 'pages/TripItinerary'
import React from 'react'
import { Route, Switch } from 'react-router'
import BrowsingPage from '../pages/browsing/BrowsingPage'
import Home from '../pages/Home'

class AppRouter extends React.Component {
  render() {
    return (
      <Switch>
        <div>
          <Route path='/listings' exact component={BrowsingPage} />
          <Route path='/home' exact component={TripItinerary} />
          <Route path='/' exact component={Welcome} />
        </div>
      </Switch>
    )
  }
}

export default AppRouter
