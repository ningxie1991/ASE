import { Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import React, { Component } from 'react'
import info_1 from '../../assets/imgs/info_1.png'
import './sidebar.css'

class SidebarContentPage1 extends Component {
  constructor() {
    super()
  }
  async componentDidMount() {}

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={12} md={12} lg={12} style={{ paddingLeft: '3%' }}>
            <h5 className='textHeading'>My attractions</h5>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Button color='primary' variant='contained'>
              Find the nearest neighbourhood{' '}
              <ArrowForwardIosIcon
                style={{ paddingLeft: '3%' }}
              ></ArrowForwardIosIcon>
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            style={{ position: 'absolute', bottom: '0' }}
          >
            <img src={info_1}></img>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default SidebarContentPage1
