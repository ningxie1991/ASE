import React, { Component } from 'react'

import GoogleMapReact from 'google-map-react'

import styled from 'styled-components'

import AutoComplete from './Autocomplete'
import LocationMarker from './LocationMarker'
import AttractionMarker from './AttractionMarker'
import ListingMarker from './ListingMarker'
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

    this.setChosenCityLocation();
  }

  addPlace = (place) => {

    let name = place.name;
    let placeId = place.place_id;
    let pictureUrl = place.photos && place.photos[0] ? place.photos[0].getUrl({maxWidth: 200}) : '';
    let lat = place.geometry.location.lat();
    let lng = place.geometry.location.lng();
    let currentPlace = {
      name: name,
      placeId: name,
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

  setChosenCityLocation() {
    const {mapApi, mapInstance} = this.state;
    const request = {
      query: 'Berlin, Germany',
      fields: ['name', 'geometry'],
    }

    const service  = new mapApi.places.PlacesService(mapInstance);
    service.findPlaceFromQuery(request, (results, status) => {
      if (status === mapApi.places.PlacesServiceStatus.OK) {
        const place = results[0];
        const latitude = place.geometry.location.lat();
        const longitude = place.geometry.location.lng();
        this.setState({
          center: [latitude, longitude],
          lat: latitude,
          lng: longitude,
        });
        if (place.geometry.viewport) {
          mapInstance.fitBounds(place.geometry.viewport)
        } else {
          mapInstance.setCenter(place.geometry.location)
          //map.setZoom(17);
        }
      }
    });


  }

  render() {
    const { currentPlace, mapApiLoaded, mapInstance, mapApi } = this.state

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
            key: 'AIzaSyCbKaQsuL6O1PJH73XG7Pjdg2uD0TGPUuI', //todo please change the API key
            libraries: ['places', 'geometry'],
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >

          {this.props.attractions && (
              this.props.attractions.map(function(attraction){
              return (
                  <LocationMarker
                      lat={attraction.lat}
                      lng={attraction.lng}
                      pictureUrl={attraction.pictureUrl}
                  />
              );
            }, this)
          )}

          {this.props.listings && (
              this.props.listings.map(function(listing){
                return (
                    <ListingMarker
                        lat={listing.latitude}
                        lng={listing.longitude}
                        listing={listing}
                    />
                );
              }, this)
          )}

          <AttractionMarker
              key={currentPlace.placeId}
              lat={currentPlace.lat}
              lng={currentPlace.lng}
              attraction={currentPlace}
              onAddAttraction={this.props.onAddAttraction}
          />

        </GoogleMapReact>
      </Wrapper>
    )
  }
}

export default Map
