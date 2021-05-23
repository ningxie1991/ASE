import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'
import AutoComplete from './Autocomplete'
import LocationMarker from './LocationMarker'
import AttractionMarker from './AttractionMarker'
import ListingMarker from './ListingMarker'
import { config } from 'helpers/Constants.js'
import { getGeoJsonCoordinates } from 'services/calculatorService'
import MarkerClusterer from '@googlemaps/markerclustererplus'

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`

class Map extends Component {
  constructor(props) {
    super(props)
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
      cityViewPort: null,
      error: '',
    }
  }

  componentWillMount() {
    this.setCurrentLocation()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.attractions !== this.props.attractions) {
      console.log('attr change')
      this.fitMapBounds(false, false, true)
    } else if (prevProps.listings !== this.props.listings) {
      console.log('listings change')
      this.fitMapBounds(false, true, false)
    } else if (prevProps.neighbourhoods !== this.props.neighbourhoods) {
      this.fitMapBounds(true, false, false)
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

    this.setChosenCityLocation()
    this.overrideInfoWindowClick()
  }

  addPlace = (place) => {
    let name = place.name
    let placeId = place.place_id
    let pictureUrl =
      place.photos && place.photos[0]
        ? place.photos[0].getUrl({ maxWidth: 200 })
        : ''
    let lat = place.geometry.location.lat()
    let lng = place.geometry.location.lng()
    let currentPlace = {
      name: name,
      placeId: placeId,
      lat: lat,
      lng: lng,
      pictureUrl: pictureUrl,
    }

    this.setState((prevState) => ({
      places: [...prevState.places, place],
      currentPlace: currentPlace,
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
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            center: [position.coords.latitude, position.coords.longitude],
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          // hardcode Berlin geometry location
          const latitude = 52.52000659999999
          const longitude = 13.404954
          this.setState({
            center: [latitude, longitude],
            //lat: latitude,
            //lng: longitude,
          })
        }
      )
    }
  }

  setChosenCityLocation() {
    const { mapApi, mapInstance } = this.state
    const request = {
      query: 'Berlin, Germany',
      fields: ['name', 'geometry'],
    }

    const service = new mapApi.places.PlacesService(mapInstance)
    service.findPlaceFromQuery(request, (results, status) => {
      if (status === mapApi.places.PlacesServiceStatus.OK) {
        const place = results[0]
        const latitude = place.geometry.location.lat()
        const longitude = place.geometry.location.lng()
        let viewPort = place.geometry.viewport
        mapInstance.fitBounds(viewPort)
        this.setState({
          center: [latitude, longitude],
          cityViewPort: viewPort,
          //lat: latitude,
          //lng: longitude,
        })
      }
    })
  }

  fitMapBounds = (neighbourhoodChange, listingChange, attractionChange) => {
    const { mapApiLoaded, mapInstance, mapApi } = this.state
    const { attractions, listings, neighbourhoods } = this.props
    if (mapApiLoaded) {
      const bounds = new mapApi.LatLngBounds()
      if (attractionChange) {
        if (attractions && attractions.length > 1) {
          attractions.map(function (attraction) {
            const position = { lat: attraction.lat, lng: attraction.lng }
            bounds.extend(position)
          })
        }
      } else if (listingChange) {
        if (listings && listings.length > 0) {
          listings.map(function (listing) {
            const position = {
              lat: parseFloat(listing.latitude),
              lng: parseFloat(listing.longitude),
            }
            bounds.extend(position)
          })
        } else if (listings.length === 0) {
          this.drawNeighbourhood(bounds, neighbourhoods, false)
        }
      } else if (neighbourhoodChange) {
        if (neighbourhoods && neighbourhoods.length > 0) {
          console.log('draw neighbourhood if condiiton')
          this.drawNeighbourhood(bounds, neighbourhoods)
        }
      }

      //TODO why checking > 1
      if (
        (attractions && attractions.length > 1 && attractionChange) ||
        (listings && listingChange) ||
        (neighbourhoods && neighbourhoods.length > 0 && neighbourhoodChange)
      ) {
        mapInstance.fitBounds(bounds)
      }
    }
  }

  getGeoJSON() {
    try {
      //redux store
      //TODO remove hard coded text
      const osmID = 55741
      getGeoJsonCoordinates(osmID)
        .then((res) => {
          console.log('geo json data', res.data)
        })
        .catch((err) => {
          console.log(err)
          this.setState({ error: err })
        })
    } catch (error) {
      console.log(error.response)
      this.setState({ error: error.response })
    }
  }

  drawNeighbourhood(bounds, neighbourhoods, addGeoData = true) {
    console.log('draw neighbourhood')
    const { mapApiLoaded, mapInstance, mapApi } = this.state
    if (addGeoData) {
      mapInstance.data.forEach(function (feature) {
        mapInstance.data.remove(feature)
      })
    }

    if (mapApiLoaded) {
      neighbourhoods.map((neighbourhood) => {
        if (neighbourhood.coordinates && neighbourhood.coordinates.length > 0) {
          var coordinatesFormatted = [JSON.parse(neighbourhood.coordinates)]
          console.log('coordinates to draw', coordinatesFormatted)
          var data = {
            type: 'Feature',
            geometry: {
              type: 'MultiPolygon',
              coordinates: coordinatesFormatted,
            },
          }
          data.geometry.coordinates[0][0].map((boundary) => {
            const position = {
              lat: boundary[1],
              lng: boundary[0],
            }
            bounds.extend(position)
          })
          if (addGeoData) mapInstance.data.addGeoJson(data)
        }
      })
    }
  }
  // drawNeighbourhood(bounds, coordinates) {
  //   var coordinatesFormatted = [JSON.parse(coordinates)]
  //   console.log('coordinate', coordinatesFormatted)
  //   const { mapApiLoaded, mapInstance, mapApi } = this.state

  //   if (mapApiLoaded) {
  //     var data = {
  //       type: 'Feature',
  //       geometry: {
  //         type: 'MultiPolygon',
  //         coordinates: coordinatesFormatted,
  //       },
  //     }
  //     data.geometry.coordinates[0][0].map((boundary) => {
  //       const position = {
  //         lat: boundary[1],
  //         lng: boundary[0],
  //       }
  //       bounds.extend(position)
  //     })
  //     mapInstance.data.forEach(function (feature) {
  //       mapInstance.data.remove(feature)
  //     })
  //     mapInstance.data.addGeoJson(data)
  //   }
  // }

  overrideInfoWindowClick = () => {
    const { mapInstance, mapApi } = this.state

    //override the built-in setPosition-method
    mapApi.InfoWindow.prototype.setPosition = function () {
      //this property isn't documented, but as it seems
      //it's only defined for InfoWindows opened on POI's
      if (this.logAsInternal) {
        mapApi.event.addListenerOnce(this, 'map_changed', function () {
          //the infoWindow will be opened, usually after a click on a POI
          if (mapInstance) {
            //trigger the click
            mapApi.event.trigger(mapInstance, 'click', {
              latLng: this.getPosition(),
            })
          }
        })
      }
    }

    mapApi.event.addListener(mapInstance, 'click', (e) => {
      if (e.placeId) {
        const request = {
          placeId: e.placeId,
          fields: ['name', 'geometry', 'place_id', 'photo'],
        }
        const service = new mapApi.places.PlacesService(mapInstance)
        service.getDetails(request, (place, status) => {
          if (status === mapApi.places.PlacesServiceStatus.OK) {
            this.addPlace(place)
          }
        })
      }
    })
  }

  render() {
    const { currentPlace, mapApiLoaded, mapInstance, mapApi } = this.state
    const { attractions, listings } = this.props

    const listingMarkers =
      listings &&
      listings.map(function (listing) {
        return (
          <ListingMarker
            lat={listing.latitude}
            lng={listing.longitude}
            listing={listing}
          />
        )
      })

    const locationsMarkers =
      attractions &&
      attractions.map(function (attraction) {
        return (
          <LocationMarker
            lat={attraction.lat}
            lng={attraction.lng}
            pictureUrl={attraction.pictureUrl}
          />
        )
      })

    return (
      <Wrapper>
        {mapApiLoaded && (
          <div>
            <AutoComplete
              map={mapInstance}
              mapApi={mapApi}
              addplace={this.addPlace}
            />
          </div>
        )}
        <GoogleMapReact
          center={this.state.center}
          zoom={this.state.zoom}
          draggable={this.state.draggable}
          //onChange={this._onChange}
          //onChildMouseDown={this.onMarkerInteraction}
          //onChildMouseUp={this.onMarkerInteractionMouseUp}
          //onChildMouseMove={this.onMarkerInteraction}
          //onChildClick={() => console.log('child click')}
          onClick={this._onClick}
          bootstrapURLKeys={{
            key: `${config.api_key}`, //todo please change the API key
            libraries: ['places', 'geometry'],
            mapIds: [`${config.map_id}`],
          }}
          options={{
            mapId: `${config.map_id}`,
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >
          {currentPlace.placeId && (
            <AttractionMarker
              key={currentPlace.placeId}
              lat={currentPlace.lat}
              lng={currentPlace.lng}
              attraction={currentPlace}
              onAddAttraction={this.props.onAddAttraction}
            />
          )}
          {locationsMarkers}
          {listingMarkers}
        </GoogleMapReact>
      </Wrapper>
    )
  }
}

export default Map
