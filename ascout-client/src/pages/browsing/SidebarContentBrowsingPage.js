import { Button, CircularProgress } from '@material-ui/core'
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
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const modalHStyle = {
  paddingTop: '2%',

  fontSize: '14px',
  fontWeight: 'bold',
}
const modalVStyle = {
  paddingTop: '2%',

  fontSize: '14px',
}
const card = {
  boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
  transition: 'all .25s linear',
  '&:hover': {
    boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
    background: 'green',
    transform: 'scale3d(1.05, 1.05, 1)',
  },
}
export default function SidebarContentBrowsingPage(props) {
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
      '&:hover': {
        boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
      },
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
    overrides: {
      MuiCard: {
        root: {
          boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
          '&:hover': {
            boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
          },
        },
      },
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
  const filtersRef = useRef({})
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
  const [loadingNeighbourhoods, setLoadingNeighbourhoods] = useState(false)
  const [filterModal, setFilterModal] = useState(false)
  const [filters, setFilters] = useState([])
  const [modalStatus, setModalStatus] = useState(false)
  const [clickedListing, setClickedListing] = useState(null)

  const handleClose = () => {
    setModalStatus(false)
  }

  const setModal = (listing) => {
    setClickedListing(listing)
    setModalStatus(true)
  }

  const handleCategory = (event, category) => {
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
  }

  const findNeighbourhoods = () => {
    setLoadingNeighbourhoods(true)
    try {
      getBestNeighbourhoods({
        attractionList: props.attractions,
        travelMode: 'TRANSIT',
        topK: 3,
      })
        .then((res) => {
          const data = res.data
          props.onMarkNeighbourhoods(data)
          setNeighbourhoods(data)
          getListingsByNeighbourhoods(data)
          setLoadingNeighbourhoods(false)
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
    var chunk = 44
    var tempArray = []
    for (var i = 0, j = dataFiltered.length; i < j; i += chunk) {
      tempArray.push(dataFiltered.slice(i, i + chunk))
      count += 1
    }
    setBoundaryNum(count)
    setPaginatedNeighbourhoodListings(tempArray)
    props.onMarkListings(tempArray[paginateCount - 1])
  }

  const getListingsByNeighbourhoods = (neighbourhoods) => {
    try {
      setLoadingListings(true)
      const neighbourhoodNames = neighbourhoods.map((n) => n.name)
      getListingsByNeighbourhoodList(neighbourhoodNames)
        .then((res) => {
          setListings(res.data)
          const neightbourhoodName = neighbourhoods[0].name
          const dataFiltered = res.data.filter(
            (e) => e.neighbourhood === neightbourhoodName
          )
          setDisplayNeighbourhoodListings(dataFiltered)
          setPaginatedData(dataFiltered)
          setLoadingListings(false)
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
            paddingBottom: '1%',
            paddingLeft: '1%',
          }}
        >
          <Grid
            container
            style={{
              marginTop: '2%',
              marginBottom: '2%',
              width: '100%',
            }}
            direction='row'
            justify='flex-start'
            alignItems='baseline'
          >
            <Grid item xs={6} md={6} lg={6}>
              <Typography
                variant='button'
                display='block'
                gutterBottom
                style={{ float: 'left' }}
              >
                My Trip Locations
              </Typography>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <Button
                color='primary'
                variant='contained'
                style={{ fontSize: '12px', float: 'right' }}
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
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            style={{ textAlign: 'left', paddingBottom: '1%', paddingTop: '1%' }}
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
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          {loadingNeighbourhoods && (
            <Grid
              container
              style={{
                marginTop: '3%',
                marginBottom: '0',
                width: '100%',
                paddingLeft: '3%',
                display: 'block',
              }}
              direction='row'
              alignItems='center'
            >
              <LinearProgress color='secondary' />
            </Grid>
          )}
          {!loadingNeighbourhoods &&
            neighbourhoods &&
            Object.keys(neighbourhoods).length > 0 && (
              <Grid
                container
                style={{
                  marginTop: '3%',
                  marginBottom: '0',
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
                    <FilterListIcon
                      onClick={toggleFilterModal}
                    ></FilterListIcon>
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
          <FormControl style={{ width: '100%', marginBottom: '2%' }}>
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
        {loadingListings && (
          <LinearProgress style={{ marginBottom: '5%', width: '100%' }} />
        )}
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
              height: '600px',
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
                    <Card className={classes.root} style={card}>
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
                                style={{
                                  width: '100%',
                                  height: '120px',
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
                              style={{ fontSize: '0.875em' }}
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
                              onClick={() => setModal(listing)}
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
                  {loadingListings
                    ? 'Please wait listings are loading'
                    : paginatedNeighbourhoodListings
                    ? 'No Results found for the filters'
                    : loadingNeighbourhoods
                    ? 'Please wait neighbourhoods are loading'
                    : 'Pick your travel destinations from the map and click the button find best neighbourhood.'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        {!loadingListings &&
        paginatedNeighbourhoodListings &&
        paginatedNeighbourhoodListings.length > 0 ? (
          <Grid
            container
            direction='column'
            alignItems='center'
            justify='center'
          >
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
                onChange={(event, val) => {
                  setPaginateCount(val)
                  props.onMarkListings(paginatedNeighbourhoodListings[val - 1])
                }}
                count={boundaryNum}
              />
            </Grid>
          </Grid>
        ) : null}
      </Grid>

      <Dialog
        open={modalStatus}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>
          {clickedListing && clickedListing['name']}
        </DialogTitle>
        <DialogContent>
          {clickedListing && (
            <DialogContentText id='alert-dialog-slide-description'>
              <Grid container>
                <>
                  <Grid item lg={12} md={12} sm={12}>
                    <img
                      src={clickedListing['pictureUrl']}
                      height='250'
                      width='100%'
                    ></img>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalHStyle}>
                    Name
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalVStyle}>
                    {clickedListing['name']}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalHStyle}>
                    Host Name
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalVStyle}>
                    {clickedListing['hostName']}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalHStyle}>
                    Host is Superhost
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalVStyle}>
                    {clickedListing['hostIsSuperhost'] === 't'
                      ? 'True'
                      : 'False'}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalHStyle}>
                    Neighbourhood Group
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalVStyle}>
                    {clickedListing['neighbourhoodGroup']}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalHStyle}>
                    Neighbourhood
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalVStyle}>
                    {clickedListing['neighbourhood']}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalHStyle}>
                    Latitude
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalVStyle}>
                    {clickedListing['latitude']}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalHStyle}>
                    Longitude
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalVStyle}>
                    {clickedListing['longitude']}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalHStyle}>
                    Property Type
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalVStyle}>
                    {clickedListing['propertyType']}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalHStyle}>
                    Room Type
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalVStyle}>
                    {clickedListing['roomType']}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalHStyle}>
                    Accommodates
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalVStyle}>
                    {clickedListing['accommodates']}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalHStyle}>
                    Bathrooms
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalVStyle}>
                    {clickedListing['bathrooms']}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalHStyle}>
                    Bedrooms
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalVStyle}>
                    {clickedListing['bedrooms']}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalHStyle}>
                    Bed Type
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalVStyle}>
                    {clickedListing['bedType']}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalHStyle}>
                    Beds
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalVStyle}>
                    {clickedListing['beds']}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalHStyle}>
                    Price
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalVStyle}>
                    {clickedListing['price']}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalHStyle}>
                    Security Deposit
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalVStyle}>
                    {clickedListing['securityDeposit']}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalHStyle}>
                    Cleaning Fee
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} style={modalVStyle}>
                    {clickedListing['cleaningFee']}
                  </Grid>
                </>
              </Grid>
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
