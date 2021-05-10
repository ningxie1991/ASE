import Grid from '@material-ui/core/Grid'
import React, { Component } from 'react'
import Map from '../components/map/Map'
import Sidebar from '../components/sideBar/Sidebar'
import Attraction from '../components/sideBar/Attraction'

export default class TripItinerary extends Component {

    constructor(props) {
        super(props)
        this.state = {
            attractions: []
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
                      onRemoveAttraction={this.removeAttraction}></Sidebar>
                </Grid>
                <Grid
                    item
                    md={9}
                    xs={9}>
                  <Map attractions={this.state.attractions} onAddAttraction={this.addAttraction}></Map>
                </Grid>
              </Grid>
            </div>
        )
    }
}
