import Grid from '@material-ui/core/Grid'
import React, { Component } from 'react'
import Map from '../components/map/Map'
import Sidebar from '../components/sideBar/Sidebar'
export default function Welcome() {
  return (
    <div>
      <Grid container style={{ height: '100vh' }}>
        <Grid item md={3} xs={3} style={{ background: 'white' }}>
          <Sidebar></Sidebar>
        </Grid>
        <Grid item md={9} xs={9}>
          <Map></Map>
        </Grid>
      </Grid>
    </div>
  )
}
