import { Paper } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import React, { useState, useEffect } from 'react'
import logo from '../../assets/imgs/logo.png'
import './sidebar.css'
import SidebarContentBrowsingPage from 'pages/browsing/SidebarContentBrowsingPage'
import SidebarContentLandingPage from 'pages/landing/SidebarContentLandingPage'

export default function Sidebar() {
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
            paddingBottom: '4%',
            paddingTop: '2%',
          }}
        >
          <img src={logo} alt='logo' />
        </Grid>
        <Grid container>
          <Grid item xs={12} md={12} lg={12} style={{ padding: '3%' }}>
            {path.includes('listings') ? (
              <SidebarContentBrowsingPage></SidebarContentBrowsingPage>
            ) : (
              <SidebarContentLandingPage></SidebarContentLandingPage>
            )}
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
