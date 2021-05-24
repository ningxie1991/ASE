import React, { Component } from 'react'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = (theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
})

const Wrapper = styled.div`
  position: absolute;
  z-index: 1;
  align-items: center;
  justify-content: center;
  width: 10%;
  padding: 20px;
  text-align: center;
`

const searchInput = {
  width: '100%',
  height: '40px',
  border: 'none',
  padding: '3%',
}

class AutoComplete extends Component {
  constructor(props) {
    super(props)
    this.clearSearchBox = this.clearSearchBox.bind(this)
  }

  componentDidMount({ map, mapApi } = this.props) {
    const options = {
      // restrict your search to a specific type of result
      types: ['address'],
      // restrict your search to a specific country, or an array of countries
      // componentRestrictions: { country: ['gb', 'us'] },
    }
    this.autoComplete = new mapApi.places.Autocomplete(
      this.searchInput
      //options,
    )
    this.autoComplete.addListener('place_changed', this.onPlaceChanged)
    this.autoComplete.bindTo('bounds', map)
  }

  componentWillUnmount({ mapApi } = this.props) {
    mapApi.event.clearInstanceListeners(this.searchInput)
  }

  onPlaceChanged = ({ map, addplace } = this.props) => {
    const place = this.autoComplete.getPlace()

    if (!place.geometry) return
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport)
    } else {
      map.setCenter(place.geometry.location)
      //map.setZoom(17);
    }

    addplace(place)
    this.searchInput.blur()
  }

  clearSearchBox() {
    this.searchInput.value = ''
  }

  render() {
    const { classes } = this.props
    return (
      <Wrapper>
        <Paper component='form' className={classes.root}>
          <input
            className='search-input'
            style={searchInput}
            ref={(ref) => {
              this.searchInput = ref
            }}
            type='text'
            onFocus={this.clearSearchBox}
            placeholder='Enter a location'
          />
          <IconButton
            type='submit'
            className={classes.iconButton}
            aria-label='search'
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Wrapper>
    )
  }
}

export default withStyles(useStyles)(AutoComplete)
