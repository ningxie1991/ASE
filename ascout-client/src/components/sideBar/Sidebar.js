import { Paper } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import React, { useState, useEffect } from 'react'
import logo from '../../assets/imgs/logo.png'
import './sidebar.css'
import SidebarContentBrowsingPage from 'pages/browsing/SidebarContentBrowsingPage'
import SidebarContentLandingPage from 'pages/landing/SidebarContentLandingPage'

export default function Sidebar(props) {
  const [path, setPath] = useState('')

  useEffect(() => {
    const pathname = window.location.pathname //returns the current url minus the domain name
    console.log('path name', pathname)
    setPath(pathname)
  }, [])

  return (
    <div style={{ height: '100%' }}>
      <Paper elevation={3} style={{ height: '100%' }}>
        <Grid
          container
          justify='center'
          style={{
            borderBottom: '1px solid #BCB7B7',
            paddingBottom: '1%',
            paddingTop: '1%',
          }}
        >
          <img src={logo} alt='logo' />
          {/* <span style={{fontSize: '14pt'}}>Berlin, Germany</span> */}
        </Grid>
        <Grid container>
          <Grid item xs={12} md={12} lg={12} style={{ padding: '3%' }}>
            {path.includes('listings') ? (
              <SidebarContentBrowsingPage
                attractions={props.attractions}
                hoverAttraction={props.hoverAttraction}
                onRemoveAttraction={props.onRemoveAttraction}
                onMarkListings={props.onMarkListings}
                onMarkNeighbourhoods={props.onMarkNeighbourhoods}
                showInfoBox={props.showInfoBox}
                hideInfoBox={props.hideInfoBox}
              ></SidebarContentBrowsingPage>
            ) : (
              <SidebarContentLandingPage
                attractions={props.attractions}
                onRemoveAttraction={props.onRemoveAttraction}
              ></SidebarContentLandingPage>
            )}
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
