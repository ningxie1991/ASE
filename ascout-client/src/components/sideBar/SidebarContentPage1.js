import { Button, List, ListItem } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import React, { Component } from 'react'
import AttractionList from "./AttractionList";
import info_1 from '../../assets/imgs/info_1.png'
import './sidebar.css'

class SidebarContentPage1 extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {}

  render() {

    return (
      <div>
        <Grid container>
          <Grid item xs={12} md={12} lg={12} style={{ paddingLeft: '3%' }}>
            <h5 className='textHeading'>My attractions</h5>
           <AttractionList
               attractions={this.props.attractions}
               onRemoveAttraction={this.props.onRemoveAttraction} />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Button color='primary' variant='contained'>
              Find the nearest neighbourhood{' '}
              <ArrowForwardIosIcon
                style={{ paddingLeft: '3%' }}></ArrowForwardIosIcon>
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
