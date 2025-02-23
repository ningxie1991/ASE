import { Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import AttractionList from 'components/sideBar/AttractionList'
import 'components/sideBar/sidebar.css'
import React from 'react'
import info_1 from '../../assets/imgs/info_1.png'

export default function SidebarContentLandingPage(props) {
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={12} lg={12} style={{ paddingLeft: '3%' }}>
          <h5 className='textHeading'>My attractions</h5>
          <AttractionList
            attractions={props.attractions}
            onRemoveAttraction={props.onRemoveAttraction}
          />
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
