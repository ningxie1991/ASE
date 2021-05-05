import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../pages/Home'
import TripItinerary from '../pages/TripItinerary'
import Welcome from '../pages/TripItinerary'

class AppRouter extends React.Component {
  render() {
    return (
      <Switch>
          <Route path='/listings' exact component={Home} />
          <Route path='/home' exact component={TripItinerary} />
          <Route path='/' exact component={Welcome} />
      </Switch>
    )
  }
}

export default AppRouter
