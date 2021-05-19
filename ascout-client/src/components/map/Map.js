import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'
import AutoComplete from './Autocomplete'
import LocationMarker from './LocationMarker'
import AttractionMarker from './AttractionMarker'
import ListingMarker from './ListingMarker'
import { config } from 'helpers/Constants.js'
import { getGeoJsonCoordinates } from 'services/calculatorService'

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
    if (
      prevProps.attractions !== this.props.attractions ||
      prevProps.listings !== this.props.listings
    ) {
      this.fitMapBounds()
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

  fitMapBounds = () => {
    const { mapApiLoaded, mapInstance, mapApi } = this.state
    const { attractions, listings, neighbourhoods } = this.props
    if (mapApiLoaded) {
      const bounds = new mapApi.LatLngBounds()

      if (attractions && attractions.length > 1) {
        attractions.map(function (attraction) {
          const position = { lat: attraction.lat, lng: attraction.lng }
          bounds.extend(position)
        })
      }

      if (neighbourhoods && neighbourhoods.length > 0) {
        //TODO removed get coordinates method for the moment TODO
        this.drawNeighbourhood(bounds)
      }

      if (listings && listings.length > 0) {
        listings.map(function (listing) {
          const position = {
            lat: parseFloat(listing.latitude),
            lng: parseFloat(listing.longitude),
          }
          bounds.extend(position)
        })
      }
      //TODO why checking > 1
      if (
        (attractions && attractions.length > 1) ||
        (listings && listings.length > 1) ||
        (neighbourhoods && neighbourhoods.length > 0)
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

  drawNeighbourhood(bounds) {
    const { mapApiLoaded, mapInstance, mapApi } = this.state

    if (mapApiLoaded) {
      var data = {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [13.2816511, 52.5004783],
                [13.2817371, 52.5004022],
                [13.2819224, 52.5001981],
                [13.2820362, 52.5000433],
                [13.2819918, 52.5000337],
                [13.2820644, 52.4997652],
                [13.2813531, 52.4995496],
                [13.2823061, 52.4985128],
                [13.2830907, 52.49776],
                [13.2831928, 52.497694],
                [13.2833573, 52.4975586],
                [13.2834827, 52.4974077],
                [13.2835143, 52.4973139],
                [13.2835333, 52.4972936],
                [13.2838948, 52.4968696],
                [13.2841616, 52.4965024],
                [13.2842655, 52.4962953],
                [13.284317, 52.4961129],
                [13.2844197, 52.4959045],
                [13.2845354, 52.4957893],
                [13.2845102, 52.4957818],
                [13.2847691, 52.4955452],
                [13.2847445, 52.4955328],
                [13.2850414, 52.4953058],
                [13.2850152, 52.4952972],
                [13.2852145, 52.4951544],
                [13.2854127, 52.4951727],
                [13.2862549, 52.4951172],
                [13.2861899, 52.4949837],
                [13.2861483, 52.4946737],
                [13.2861302, 52.4946518],
                [13.2864687, 52.4945552],
                [13.2865533, 52.4946623],
                [13.2872303, 52.4944987],
                [13.2877403, 52.4944204],
                [13.2885788, 52.4943927],
                [13.2887807, 52.494267],
                [13.2889704, 52.4943802],
                [13.2891024, 52.4943678],
                [13.2891449, 52.4943639],
                [13.2898561, 52.494329],
                [13.2898868, 52.4943372],
                [13.2899283, 52.4943266],
                [13.2901828, 52.4944345],
                [13.2908495, 52.4939397],
                [13.290897, 52.494049],
                [13.2928782, 52.4928815],
                [13.2937938, 52.4923395],
                [13.2949294, 52.4916842],
                [13.2963627, 52.4909088],
                [13.2966659, 52.490733],
                [13.2968963, 52.4905835],
                [13.2970628, 52.4904701],
                [13.2974741, 52.4901806],
                [13.2982752, 52.4895837],
                [13.2989643, 52.48908],
                [13.2989675, 52.4890664],
                [13.2993923, 52.4887502],
                [13.2996616, 52.4885763],
                [13.3003754, 52.4880442],
                [13.3008177, 52.4883287],
                [13.3015203, 52.4886674],
                [13.3017468, 52.4887035],
                [13.3019702, 52.4887356],
                [13.3005816, 52.489634],
                [13.3007374, 52.4897697],
                [13.3013184, 52.4937402],
                [13.301433, 52.4945236],
                [13.3005098, 52.4947631],
                [13.3006911, 52.4948774],
                [13.3009072, 52.4949133],
                [13.301218, 52.4950613],
                [13.3014411, 52.4966131],
                [13.3013822, 52.4966171],
                [13.3014383, 52.4970025],
                [13.3015041, 52.4970096],
                [13.3016723, 52.4982214],
                [13.301697, 52.4982951],
                [13.3016209, 52.4982976],
                [13.3018529, 52.4990214],
                [13.3019001, 52.4998258],
                [13.2964364, 52.5013941],
                [13.2948701, 52.5019058],
                [13.295999, 52.5022457],
                [13.2958893, 52.5024191],
                [13.2958505, 52.5024805],
                [13.2953652, 52.5032979],
                [13.2953037, 52.5033177],
                [13.2915758, 52.5027628],
                [13.2897984, 52.5025274],
                [13.2884141, 52.5023922],
                [13.2882327, 52.502373],
                [13.2878935, 52.50235],
                [13.2874647, 52.5023679],
                [13.2848752, 52.5014708],
                [13.2852891, 52.5009777],
                [13.2843618, 52.5006884],
                [13.2846249, 52.5003745],
                [13.2842531, 52.5002585],
                [13.2839885, 52.5005713],
                [13.283148, 52.5003092],
                [13.2827361, 52.5008004],
                [13.2816511, 52.5004783],
              ],
            ],
          ],
        },
      }
      data.geometry.coordinates[0][0].map((boundary) => {
        const position = {
          lat: boundary[1],
          lng: boundary[0],
        }
        bounds.extend(position)
      })
      mapInstance.data.forEach(function (feature) {
        mapInstance.data.remove(feature)
      })
      mapInstance.data.addGeoJson(data)
    }
  }

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
          {attractions &&
            attractions.map(function (attraction) {
              return (
                <LocationMarker
                  lat={attraction.lat}
                  lng={attraction.lng}
                  pictureUrl={attraction.pictureUrl}
                />
              )
            })}

          {listings &&
            listings.map(function (listing) {
              return (
                <ListingMarker
                  lat={listing.latitude}
                  lng={listing.longitude}
                  listing={listing}
                />
              )
            })}

          {currentPlace.placeId && (
            <AttractionMarker
              key={currentPlace.placeId}
              lat={currentPlace.lat}
              lng={currentPlace.lng}
              attraction={currentPlace}
              onAddAttraction={this.props.onAddAttraction}
            />
          )}
        </GoogleMapReact>
      </Wrapper>
    )
  }
}

export default Map
