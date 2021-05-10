import Grid from '@material-ui/core/Grid'
import React, { Component } from 'react'
import Map from 'components/map/Map'
import Sidebar from 'components/sideBar/Sidebar'
export default class BrowsingPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      attractions: [],
      listings: []
    }
  }

  addAttraction = (attraction) => {
    let attractions = [...this.state.attractions];
    if(!attractions.includes(attraction)) {
      attractions.push(attraction);
      this.setState({ attractions });
    }
  }

  removeAttraction = (attraction) => {
    let attractions = this.state.attractions.filter(item => item.placeId != attraction.placeId);
    this.setState({ attractions })
  }

  populateListings = (listings) => {
    this.setState({ listings })
  }

  render() {
    return (
        <div>
          <Grid
              container
              style={{height: '100vh'}}>
            <Grid
                item
                md={3}
                xs={3}
                style={{background: 'white'}}>
              <Sidebar
                  attractions={this.state.attractions}
                  onRemoveAttraction={this.removeAttraction}
                  onPopulateListings={this.populateListings}
              ></Sidebar>
            </Grid>
            <Grid
                item
                md={9}
                xs={9}>
              <Map
                  attractions={this.state.attractions}
                  listings={this.state.listings}
                  onAddAttraction={this.addAttraction}
              ></Map>
            </Grid>
          </Grid>
        </div>
    )
  }
}
