import Grid from '@material-ui/core/Grid'
import React, { Component } from 'react'
import Map from 'components/map/Map'
import Sidebar from 'components/sideBar/Sidebar'
export default class BrowsingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      attractions: [],
      listings: [],
      neighbourhoods: [],
      hoverListingShow: null,
      hoverListingHide: null,
    }
  }

  addAttraction = (attraction) => {
    let attractions = [...this.state.attractions]
    let duplicates = this.state.attractions.filter(
      (item) => item.placeId === attraction.placeId
    )
    if (!duplicates || duplicates.length === 0) {
      attractions.push(attraction)
      this.setState({ attractions })
    }
  }

  removeAttraction = (attraction) => {
    let attractions = this.state.attractions.filter(
      (item) => item.placeId !== attraction.placeId
    )
    this.setState({ attractions })
  }

  markListings = (listings) => {
    this.setState({ listings })
  }

  markNeighbourhoods = (neighbourhoods) => {
    this.setState({ neighbourhoods })
  }

  showInfoBox = (listing) => {
    this.setState({ hoverListingShow: listing })
  }

  hideInfoBox = (listing) => {
    this.setState({ hoverListingHide: listing })
  }

  render() {
    return (
      <div>
        <Grid container style={{ height: '100vh' }}>
          <Grid item md={4} xs={4} style={{ background: 'white' }}>
            <Sidebar
              attractions={this.state.attractions}
              onRemoveAttraction={this.removeAttraction}
              onMarkListings={this.markListings}
              onMarkNeighbourhoods={this.markNeighbourhoods}
              showInfoBox={this.showInfoBox}
              hideInfoBox={this.hideInfoBox}
            ></Sidebar>
          </Grid>
          <Grid item md={8} xs={8}>
            <Map
              attractions={this.state.attractions}
              listings={this.state.listings}
              onAddAttraction={this.addAttraction}
              neighbourhoods={this.state.neighbourhoods}
              hoverListingShow={this.state.hoverListingShow}
              hoverListingHide={this.state.hoverListingHide}
            ></Map>
          </Grid>
        </Grid>
      </div>
    )
  }
}
