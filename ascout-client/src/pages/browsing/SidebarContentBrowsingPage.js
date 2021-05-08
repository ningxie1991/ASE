import { Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import React, { useState, useEffect, useRef } from 'react'
import info_1 from 'assets/imgs/info_1.png'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import getListingsByNeighbourhood, { getAllListings, getListingsByNeighbourhoodList } from 'services/browseService'
import Pagination from '@material-ui/lab/Pagination'
import Chip from '@material-ui/core/Chip'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import EditLocationIcon from '@material-ui/icons/EditLocation'
import FilterListIcon from '@material-ui/icons/FilterList'
import IconButton from '@material-ui/core/IconButton'
import Filters from './Filters'
import LinearProgress from '@material-ui/core/LinearProgress';

export default function SidebarContentBrowsingPage(props) {
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  })

  const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
      margin: theme.spacing(0.5),
      border: 'none',
      '&:not(:first-child)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-child': {
        borderRadius: theme.shape.borderRadius,
      },
      fontSize: '11px',
      lineHeight: '1px',
    },
  }))(ToggleButtonGroup)

  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>

  const [category, setCategory] = useState('0')
  const [listings, setListings] = useState([])
  const [neighbourhoods, setNeighbourhoods] = useState([])
  const [loadingListings, setLoadingListings] = useState(false);
  const [filterModal, setFilterModal] = useState(false)
  const [filters, setFilters] = useState([])
  const [error, setError] = useState('')
  const filtersRef = useRef({})

  const handleCategory = (event, category) => {
    setCategory(category)
  }

  const toggleFilterModal = () => {
    setFilterModal(!filterModal)
  }

  const handleFilters = () => {
    const params = filtersRef.current
    console.log('selected mountain routes', params['filters'])
  }

  useEffect(() => {
    try {
      //redux store
      getAllListings()
        .then((res) => {
          setListings(res.data)
        })
        .catch((err) => {
          console.log(err)
          setError(err)
        })
    } catch (error) {
      console.log(error.response)
      setError(error.response)
    }
  }, [])

  const findNeighbourhoods = () => {
    // hardcode for now, To-Do: call calculator service
    const neighbourhoods = ["Brunnenstr. Süd","Prenzlauer Berg Nordwest","Schöneberg-Nord"];
    setNeighbourhoods(neighbourhoods);
    getListingsByNeighbourhoods(neighbourhoods);
  }

  const getListingsByNeighbourhoods = (neighbourhoods) => {
    try {
      //redux store
      setLoadingListings(true);
      getListingsByNeighbourhoodList(neighbourhoods)
          .then((res) => {
            setListings(res.data)
            setLoadingListings(false);
            props.onPopulateListings(res.data);
          })
          .catch((err) => {
            console.log(err)
            setError(err)
          })
    } catch (error) {
      console.log(error.response)
      setError(error.response)
    }
  }

  return (
    <div>
      <Grid container>
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          style={{ borderBottom: '1px solid #BCB7B7', paddingBottom: '4%' }}
        >
          <Grid container style={{ margin: '2%' }}>
            <Grid item xs={12} md={6} lg={6}>
              <h5
                className='textHeading'
                style={{
                  marginBottom: '0',
                  marginTop: '0',
                }}
              >
                My Trip Locations
              </h5>
            </Grid>
            <Grid item xs={12} md={6} lg={6} style={{ float: 'right' }}>
              <Button
                color='primary'
                variant='contained'
                style={{ fontSize: '12px', float: 'right' }}
                onClick={() => { findNeighbourhoods(); }}
              >
                Find Neighbourhood
                <EditLocationIcon
                  style={{ paddingLeft: '3%' }}
                ></EditLocationIcon>
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={12} style={{ textAlign: 'left' }}>
            {props.attractions && props.attractions.map(function(attraction){
              return (
                  <Chip
                      label={attraction.name}
                      icon={<LocationOnIcon />}
                      style={{ margin: '1%' }}
                      onDelete={() => { props.onRemoveAttraction(attraction) }}
                  />
              )}
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container style={{ marginTop: '5%', marginBottom: '5%' }}>
            <Grid item xs={10} md={10} lg={10}>
              <h5 className='textHeading' style={{ margin: '0' }}>
                Top 3 Neighbourhood
              </h5>
            </Grid>
            <Grid item xs={2} md={2} lg={2}>
              <IconButton aria-label='upload picture' component='span'>
                <FilterListIcon onClick={toggleFilterModal}></FilterListIcon>
              </IconButton>
              <Filters
                stateRef={filtersRef}
                handleFilters={handleFilters}
                src={filters}
                open={filterModal}
              ></Filters>
            </Grid>
          </Grid>
          <FormControl>
            <StyledToggleButtonGroup
              value={category}
              exclusive
              onChange={handleCategory}
              aria-label='text alignmepynt'
            >
              {neighbourhoods && neighbourhoods.map(function(neighbourhood, index){
                  return (
                      <ToggleButton value={index}>{neighbourhood}</ToggleButton>
                  )
               })
              }
            </StyledToggleButtonGroup>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          style={{ overflowY: 'auto', height: '630px' }}
        >
          {loadingListings && <LinearProgress />}
          {!loadingListings && listings && listings.map(function(listing){
            return (
              <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  style={{marginBottom: '3%'}}>
                <Card
                    className={classes.root}>
                  <CardContent
                      style={{textAlign: 'left'}}>
                    <Typography
                        className={classes.title}
                        color='textSecondary'
                        gutterBottom
                    >
                    </Typography>
                    <Typography
                        variant='h5'
                        component='h2'>
                      {listing.name}
                    </Typography>
                    <Typography
                        className={classes.pos}
                        color='textSecondary'>
                    </Typography>
                    <Typography
                        variant='body2'
                        component='p'>
                      <img src={listing.picture_url} width="150" height="150" />
                    </Typography>
                    <Typography
                        variant='body2'
                        component='p'
                        style={{float: 'right'}}
                    >
                      {listing.price} CHF
                    </Typography>
                  </CardContent>
                  <CardActions
                      style={{
                        width: '100%',
                        display: 'inline-block'
                      }}>
                    <Button
                        color='primary'
                        variant='contained'
                        style={{
                          fontSize: '12px',
                          float: 'right'
                        }}
                    >
                      More
                      Details
                      <ArrowForwardIosIcon
                          style={{paddingLeft: '3%'}}
                      ></ArrowForwardIosIcon>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )}
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          style={{ marginBottom: '1%', position: 'absolute', bottom: '0' }}
        >
          <Pagination count={10} color='primary' />
        </Grid>
      </Grid>
    </div>
  )
}
