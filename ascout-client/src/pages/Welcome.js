import React, { Component, useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Map from '../components/map/Map'
import Sidebar from '../components/sideBar/Sidebar'
import WelcomeModal1 from '../components/welcome1/WelcomeModal1'
import WelcomeModal2 from '../components/welcome2/WelcomeModal2'
export default function Welcome() {
  const pickedCity = useRef(null)
  const [city, setCity] = useState(null)

  const handlePickedCity = () => {
    const params = pickedCity.current['city']
    setCity(params)
    console.log(params)
  }

  return (
    <div>
      <Grid container style={{ height: '100vh' }}>
        <Grid item md={3} xs={3} style={{ background: 'white' }}>
          <Sidebar></Sidebar>
        </Grid>

        <Grid item md={9} xs={9}>
          <Map></Map>
        </Grid>
        {city === null ? (
          <WelcomeModal1
            stateRef={pickedCity}
            handlePickedCity={handlePickedCity}
            src={city}
          ></WelcomeModal1>
        ) : (
          <WelcomeModal2></WelcomeModal2>
        )}
      </Grid>
    </div>
  )
}
