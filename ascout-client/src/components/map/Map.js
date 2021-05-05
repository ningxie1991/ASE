import React, { Component } from 'react'

import GoogleMapReact from 'google-map-react'

import styled from 'styled-components'

import AutoComplete from './Autocomplete'
import Marker from './Marker'
import MarkerWithInfoBox from './MarkerWithInfoBox'
import {
  IconButton,
  ListItem
} from "@material-ui/core";
import ClearIcon
  from "@material-ui/icons/Clear";

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`

class Map extends Component {
  constructor (props) {
    super(props);
    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      geoCoder: null,
      places: [],
      currentPlace: {},
      center: [],
      zoom: 1,
      address: '',
      name: '',
      pictureUrl: '',
      draggable: true,
      lat: null,
      lng: null
    }
  }

  componentWillMount() {
    this.setCurrentLocation();
  }

  onMarkerInteraction = (childKey, childProps, mouse) => {
    this.setState({
      draggable: false,
      lat: mouse.lat,
      lng: mouse.lng,
    })
  }
  onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
    this.setState({ draggable: true })
    this._generateAddress()
  }

  _onChange = ({ center, zoom }) => {
    this.setState({
      center: center,
      zoom: zoom,
    })
  }

  _onClick = (value) => {
    this.setState({
      lat: value.lat,
      lng: value.lng,
    })
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    })

    this._generateAddress()
  }

  addPlace = (place) => {

    let name = place.name;
    let placeId = place.place_id;
    let pictureUrl = place.photos && place.photos[0] ? place.photos[0].getUrl({maxWidth: 200}) : '';
    let lat = place.geometry.location.lat();
    let lng = place.geometry.location.lng();
    let currentPlace = {
      name: name,
      placeId: placeId,
      lat: lat,
      lng: lng,
      pictureUrl: pictureUrl
    }

    this.setState((prevState) => ({
      places: [...prevState.places, place],
      currentPlace: currentPlace
    }))

    //this._generateAddress()
  }


  _generateAddress() {
    const { mapApi } = this.state

    const geocoder = new mapApi.Geocoder()

    geocoder.geocode(
      { location: { lat: this.state.lat, lng: this.state.lng } },
      (results, status) => {
        console.log(results)
        console.log(status)
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12
            this.setState({ address: results[0].formatted_address })
          } else {
            window.alert('No results found')
          }
        } else {
          window.alert('Geocoder failed due to: ' + status)
        }
      }
    )
  }

  // Get Current Location Coordinates
  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          center: [position.coords.latitude, position.coords.longitude],
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
    }
  }

  render() {
    const { attractions, currentPlace, mapApiLoaded, mapInstance, mapApi } = this.state

    return (
      <Wrapper>
        {mapApiLoaded && (
            <div>
              <AutoComplete map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />
            </div>
        )}
        <GoogleMapReact
          center={this.state.center}
          zoom={this.state.zoom}
          draggable={this.state.draggable}
          //onChange={this._onChange}
          //onChildMouseDown={this.onMarkerInteraction}
          //onChildMouseUp={this.onMarkerInteractionMouseUp}
          //nChildMouseMove={this.onMarkerInteraction}
          //onChildClick={() => console.log('child click')}
          //onClick={this._onClick}
          bootstrapURLKeys={{
            key: 'AIzaSyDgniqQ4LcK1HxEOaLE1kIoUcx0YWArZUY',
            libraries: ['places', 'geometry'],
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >

          {this.props.attractions && (
              this.props.attractions.map(function(attraction){
              return (
                  <Marker
                      key={attraction.placeId}
                      lat={attraction.lat}
                      lng={attraction.lng}
                      pictureUrl={attraction.pictureUrl}
                  />
              );
            }, this)
          )}

          <MarkerWithInfoBox
              key={currentPlace.placeId}
              lat={currentPlace.lat}
              lng={currentPlace.lng}
              attraction={currentPlace}
              onAddAttraction={this.props.onAddAttraction}
          />

        </GoogleMapReact>

        <div className='info-wrapper'>
          <div className='map-details'>
            Latitude: <span>{this.state.lat}</span>, Longitude:{' '}
            <span>{this.state.lng}</span>
          </div>
          <div className='map-details'>
            Zoom: <span>{this.state.zoom}</span>
          </div>
          <div className='map-details'>
            Address: <span>{this.state.address}</span>
          </div>
        </div>
      </Wrapper>
    )
  }
}

export default Map
