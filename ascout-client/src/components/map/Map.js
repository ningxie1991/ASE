import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'
import AutoComplete from './Autocomplete'
import LocationMarker from './LocationMarker'
import AttractionMarker from './AttractionMarker'
import ListingMarker from './ListingMarker'
import { config } from 'helpers/Constants.js'

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
      zoom: 10,
      address: '',
      name: '',
      pictureUrl: '',
      draggable: true,
      lat: null,
      lng: null,
      cityViewPort: null
    }
  }

  componentWillMount() {
    this.setCurrentLocation();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.attractions !== this.props.attractions ||
        prevProps.listings !== this.props.listings) {
      this.fitMapBounds();
    }
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
      }, () => {
        // hardcode Berlin geometry location
        const latitude = 52.52000659999999;
        const longitude = 13.404954
        this.setState({
          center: [latitude, longitude],
          //lat: latitude,
          //lng: longitude,
        })
      });
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
        let viewPort = place.geometry.viewport;
        mapInstance.fitBounds(viewPort)
        this.setState({
          center: [latitude, longitude],
          cityViewPort: viewPort
          //lat: latitude,
          //lng: longitude,
        });
      }
    });
  }

  fitMapBounds = () => {
    const { mapApiLoaded, mapInstance, mapApi } = this.state
    const { attractions, listings } = this.props

    if (mapApiLoaded) {
      const bounds = new mapApi.LatLngBounds();

      if(attractions && attractions.length > 1) {
        attractions.map(function(attraction){
          const position = {lat: attraction.lat, lng: attraction.lng}
          bounds.extend(position);
        });
      }

      if(listings && listings.length > 0) {
        listings.map(function(listing){
          const position = {lat: parseFloat(listing.latitude), lng: parseFloat(listing.longitude)}
          bounds.extend(position);
        });
      }

      if((attractions && attractions.length > 1) || (listings && listings.length > 1)) {
        mapInstance.fitBounds(bounds);
      }
    }
  }

  render() {
    const { currentPlace, mapApiLoaded, mapInstance, mapApi } = this.state
    const { attractions, listings } = this.props

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
          onChange={this._onChange}
          onChildMouseDown={this.onMarkerInteraction}
          onChildMouseUp={this.onMarkerInteractionMouseUp}
          nChildMouseMove={this.onMarkerInteraction}
          onChildClick={() => console.log('child click')}
          onClick={this._onClick}
          bootstrapURLKeys={{
            key: `${config.api_key}`, //todo please change the API key
            libraries: ['places', 'geometry'],
            mapIds: [`${config.map_id}`]
          }}
          options={{
            mapId: `${config.map_id}`,
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >

          {attractions && (
              attractions.map(function(attraction){
              return (
                  <LocationMarker
                      lat={attraction.lat}
                      lng={attraction.lng}
                      pictureUrl={attraction.pictureUrl}
                  />
              );
            }, this)
          )}

          {listings && (
              listings.map(function(listing){
                return (
                    <ListingMarker
                        lat={listing.latitude}
                        lng={listing.longitude}
                        listing={listing}
                    />
                );
              }, this)
          )}

          {currentPlace.placeId && <AttractionMarker
              key={currentPlace.placeId}
              lat={currentPlace.lat}
              lng={currentPlace.lng}
              attraction={currentPlace}
              onAddAttraction={this.props.onAddAttraction}
          />}

        </GoogleMapReact>
      </Wrapper>
    )
  }
}

export default Map
