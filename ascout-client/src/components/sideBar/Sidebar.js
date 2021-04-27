import { Paper } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import React, { Component } from 'react'
import logo from '../../assets/imgs/logo.png'
import './sidebar.css'
import SidebarContentPage1 from './SidebarContentPage1'

class Sidebar extends Component {
  constructor() {
    super()
  }
  async componentDidMount() {}

  render() {
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
            <Grid item xs={12} md={12} lg={12} style={{ paddingLeft: '3%' }}>
              <SidebarContentPage1></SidebarContentPage1>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default Sidebar
