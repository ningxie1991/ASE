/* eslint-disable no-use-before-define */
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

export default function CityAutoComplete(props) {
  const classes = useStyles()

  const [city, setCity] = useState(props.src ? props.src : null)

  useEffect(() => {
    props.stateRef.current = { city }
    props.handlePickedCity()
  }, [city])

  return (
    <div className={classes.root} style={{ marginTop: '5%' }}>
      <Autocomplete
        id='size-small-standard'
        size='small'
        options={top100Films}
        getOptionLabel={(option) => option.title}
        value={city}
        onChange={(event, newValue) => {
          setCity(newValue)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='standard'
            label='Pick the city you want to visit'
            placeholder='Favorites'
          />
        )}
      />
    </div>
  )
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [{ title: 'Berlin' }]
