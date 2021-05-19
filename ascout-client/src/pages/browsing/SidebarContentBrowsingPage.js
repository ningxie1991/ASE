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
import getListingsByNeighbourhood, {
  getListingsByNeighbourhoodList,
} from 'services/browseService'
import Pagination from '@material-ui/lab/Pagination'
import Chip from '@material-ui/core/Chip'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import EditLocationIcon from '@material-ui/icons/EditLocation'
import FilterListIcon from '@material-ui/icons/FilterList'
import IconButton from '@material-ui/core/IconButton'
import Filters from './Filters'
import LinearProgress from '@material-ui/core/LinearProgress'
import getBestNeighbourhoods from '../../services/calculatorService'
import ScrollAnimation from 'react-animate-on-scroll'
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

  const [category, setCategory] = useState([0])
  const [listings, setListings] = useState([])
  const [neighbourhoods, setNeighbourhoods] = useState(null)
  const [paginatedNeighbourhoodListings, setPaginatedNeighbourhoodListings] =
    useState(null)
  const [displayNeighbourhoodListings, setDisplayNeighbourhoodListings] =
    useState([])
  const [paginateCount, setPaginateCount] = React.useState(1)
  const [boundaryNum, setBoundaryNum] = React.useState(0)
  const [error, setError] = React.useState('')

  const [loadingListings, setLoadingListings] = useState(false)
  const [filterModal, setFilterModal] = useState(false)
  const [filters, setFilters] = useState([])
  const filtersRef = useRef({})

  const handleCategory = (event, category) => {
    console.log('selected category', category)
    setCategory(category)
    if (category.length > 0) {
      const neightbourhoodNames = category.map((id) => neighbourhoods[id].name)
      const dataFiltered = listings.filter((e) =>
        neightbourhoodNames.includes(e.neighbourhood)
      )
      setDisplayNeighbourhoodListings(dataFiltered)
      setPaginatedData(dataFiltered)
      props.onMarkListings(dataFiltered)
    } else {
      setPaginatedData([])
      setDisplayNeighbourhoodListings([])
      props.onMarkListings([])
    }
  }

  const toggleFilterModal = () => {
    setFilterModal(!filterModal)
  }

  const handleFilters = () => {
    const params = filtersRef.current
    console.log('selected mountain routes', params['filters'])
  }

  const findNeighbourhoods = () => {
    try {
      // redux store
      getBestNeighbourhoods({
        attractionList: props.attractions,
        travelMode: 'TRANSIT',
      })
        .then((res) => {
          const data = res.data
          props.onMarkNeighbourhoods(data)
          setNeighbourhoods(data)
          getListingsByNeighbourhoods(data)
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

  const setPaginatedData = (dataFiltered) => {
    var count = 0
    var chunk = 10
    var tempArray = []
    for (var i = 0, j = dataFiltered.length; i < j; i += chunk) {
      tempArray.push(dataFiltered.slice(i, i + chunk))
      count += 1
    }
    setBoundaryNum(count)
    setPaginatedNeighbourhoodListings(tempArray)
  }

  const getListingsByNeighbourhoods = (neighbourhoods) => {
    try {
      //redux store
      setLoadingListings(true)
      const neighbourhoodNames = neighbourhoods.map((n) => n.name)
      getListingsByNeighbourhoodList(neighbourhoodNames)
        .then((res) => {
          console.log(res.data)
          setListings(res.data)
          const neightbourhoodName = neighbourhoods[0].name
          const dataFiltered = res.data.filter(
            (e) => e.neighbourhood === neightbourhoodName
          )
          setDisplayNeighbourhoodListings(dataFiltered)
          setPaginatedData(dataFiltered)
          setLoadingListings(false)
          props.onMarkListings(dataFiltered)
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
          style={{
            borderBottom: '1px solid #BCB7B7',
            paddingBottom: '4%',
            paddingLeft: '2%',
          }}
        >
          <Grid
            container
            style={{
              marginTop: '5%',
              marginBottom: '2%',
              width: '100%',
            }}
            direction='row'
            justify='flex-start'
            alignItems='baseline'
          >
            <Grid item xs={12} md={12} lg={12}>
              {/* <h5
                className='textHeading'
                style={{
                  marginBottom: '0',
                  marginTop: '0',
                }}
              >
              </h5> */}
              <Typography
                variant='button'
                display='block'
                gutterBottom
                style={{ float: 'left' }}
              >
                My Trip Locations
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            style={{ textAlign: 'left', paddingBottom: '5%', paddingTop: '3%' }}
          >
            {props.attractions &&
              props.attractions.map(function (attraction) {
                return (
                  <Chip
                    label={attraction.name}
                    icon={<LocationOnIcon />}
                    style={{ margin: '1%', marginLeft: '0' }}
                    onDelete={() => {
                      props.onRemoveAttraction(attraction)
                    }}
                  />
                )
              })}
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Button
              color='primary'
              variant='contained'
              style={{ fontSize: '12px', float: 'left' }}
              onClick={() => {
                findNeighbourhoods()
              }}
              disabled={!(props.attractions && props.attractions.length > 0)}
            >
              Find Neighbourhood
              <EditLocationIcon
                style={{ paddingLeft: '3%' }}
              ></EditLocationIcon>
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          {neighbourhoods && Object.keys(neighbourhoods).length > 0 && (
            <Grid
              container
              style={{
                marginTop: '3%',
                marginBottom: '3%',
                width: '100%',
                paddingLeft: '3%',
              }}
              direction='row'
              justify='space-between'
              alignItems='center'
            >
              <Grid>
                <Typography variant='button' display='block' gutterBottom>
                  Top 3 Neighbourhoods
                </Typography>
              </Grid>
              <Grid>
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
          )}
          <FormControl style={{ width: '100%', marginBottom: '4%' }}>
            <StyledToggleButtonGroup
              value={category}
              onChange={handleCategory}
              aria-label='text alignmepynt'
              fullWidth
              style={{ display: 'inline' }}
            >
              {neighbourhoods &&
                neighbourhoods.map(function (neighbourhood, index) {
                  return (
                    <ToggleButton value={index} style={{ padding: '3%' }}>
                      {neighbourhood.name}
                    </ToggleButton>
                  )
                })}
            </StyledToggleButtonGroup>
          </FormControl>
        </Grid>
        {loadingListings && <LinearProgress />}
        {!loadingListings &&
        paginatedNeighbourhoodListings &&
        paginatedNeighbourhoodListings.length > 0 ? (
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            style={{
              overflowY: 'auto',
              height: '490px',
              paddingTop: '2%',
              paddingRight: '2%',
            }}
          >
            {!loadingListings &&
              paginatedNeighbourhoodListings &&
              paginatedNeighbourhoodListings.length > 0 &&
              paginatedNeighbourhoodListings[paginateCount - 1].length > 0 &&
              paginatedNeighbourhoodListings[paginateCount - 1].map(function (
                listing
              ) {
                return (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    style={{ marginBottom: '3%' }}
                  >
                    <Card className={classes.root}>
                      <CardContent
                        style={{ textAlign: 'left', paddingBottom: '0' }}
                      >
                        <Grid container>
                          <Grid
                            item
                            xs={12}
                            md={12}
                            lg={12}
                            style={{ paddingBottom: '2%' }}
                          >
                            {/* <Typography variant='h5' component='h4'>
                              {listing.name}
                            </Typography> */}
                            <Typography
                              variant='button'
                              display='block'
                              gutterBottom
                            >
                              {listing.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} md={4} lg={4}>
                            <Typography variant='body2' component='p'>
                              <img
                                src={listing.pictureUrl}
                                width='100%'
                                height='100%'
                                style={{
                                  minWidth: '120px',
                                  minHeight: '120px',
                                }}
                              />
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={8}
                            md={8}
                            lg={8}
                            style={{ position: 'relative', paddingLeft: '2%' }}
                          >
                            <Typography
                              className={classes.title}
                              color='textSecondary'
                              gutterBottom
                            >
                              {listing.propertyType}
                            </Typography>
                            <Typography
                              variant='body2'
                              component='p'
                              style={{ fontSize: '0.675em' }}
                            >
                              {listing.neighbourhood}
                            </Typography>
                            <Grid container alignItems='flex-start'>
                              <Grid item xs={8} md={8} lg={8}>
                                <Typography
                                  variant='overline'
                                  display='block'
                                  gutterBottom
                                >
                                  {listing.roomType}
                                </Typography>
                              </Grid>
                              <Grid item xs={4} md={4} lg={4}>
                                <Typography
                                  variant='body2'
                                  component='p'
                                  style={{ float: 'right', marginBottom: '2%' }}
                                >
                                  {listing.price} CHF
                                </Typography>
                              </Grid>
                            </Grid>

                            <Button
                              color='primary'
                              variant='contained'
                              style={{
                                fontSize: '12px',
                                right: '0',
                                position: 'absolute',
                                bottom: '0',
                                marginBottom: '2%',
                              }}
                            >
                              More Details
                              <ArrowForwardIosIcon
                                style={{ paddingLeft: '3%' }}
                              ></ArrowForwardIosIcon>
                            </Button>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              })}
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              align='center'
              style={{ display: 'inline-block', paddingTop: '2%' }}
            >
              <Pagination
                hidden={boundaryNum == 0}
                color='primary'
                onChange={(event, val) => setPaginateCount(val)}
                count={boundaryNum}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid xs={12} sm={12} md={12}>
            <Card className={classes.root}>
              <CardContent style={{ overflowY: 'auto', padding: '3%' }}>
                <Typography
                  className={classes.title}
                  color='textSecondary'
                  gutterBottom
                  style={{ marginBottom: '0' }}
                >
                  {paginatedNeighbourhoodListings
                    ? 'No Results found for the filters'
                    : 'Pick you travel destinations from the map and click the button find best neighbourhood.'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </div>
  )
}
