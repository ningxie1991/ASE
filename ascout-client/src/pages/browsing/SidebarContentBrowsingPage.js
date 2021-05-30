import { Button, Divider } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Chip from '@material-ui/core/Chip'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Slide from '@material-ui/core/Slide'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import ApartmentIcon from '@material-ui/icons/Apartment'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import EditLocationIcon from '@material-ui/icons/EditLocation'
import HomeWorkIcon from '@material-ui/icons/HomeWork'
import KingBedIcon from '@material-ui/icons/KingBed'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import PersonIcon from '@material-ui/icons/Person'
import StarIcon from '@material-ui/icons/Star'
import WcIcon from '@material-ui/icons/Wc'
import Pagination from '@material-ui/lab/Pagination'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import React, { useState } from 'react'
import { getListingsByNeighbourhoodList } from 'services/browseService'
import getBestNeighbourhoods from '../../services/calculatorService'

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
  textAlign: 'right',
  fontSize: '14px',
}

export default function SidebarContentBrowsingPage(props) {
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
      transition: 'all .25s linear',
      '&:hover': {
        boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        transform: 'scale3d(1.05, 1.05, 1)',
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
      fontSize: '13px',
      lineHeight: '1px',
    },
  }))(ToggleButtonGroup)

  const classes = useStyles()
  const [category, setCategory] = useState([0])
  const [listings, setListings] = useState([])
  const [neighbourhoods, setNeighbourhoods] = useState(null)
  const [paginatedNeighbourhoodListings, setPaginatedNeighbourhoodListings] =
    useState(null)
  const [paginateCount, setPaginateCount] = React.useState(1)
  const [boundaryNum, setBoundaryNum] = React.useState(0)
  const [error, setError] = React.useState('')

  const [loadingListings, setLoadingListings] = useState(false)
  const [loadingNeighbourhoods, setLoadingNeighbourhoods] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const [clickedListing, setClickedListing] = useState(null)
  const [showBoundary, setShowBoundary] = useState(true)
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
      setPaginatedData(dataFiltered)
    } else {
      setPaginatedData([])
      props.onMarkListings([])
    }
  }

  const findNeighbourhoods = () => {
    setCategory([0])
    setLoadingNeighbourhoods(true)
    if (listings.length > 0) {
      setListings([])
      setPaginatedNeighbourhoodListings(null)
      props.onMarkNeighbourhoods([])
      props.onMarkListings([])
    }

    try {
      getBestNeighbourhoods({
        attractionList: props.attractions,
        travelMode: 'TRANSIT',
        topK: 3,
      })
        .then((res) => {
          const data = res.data
          setShowBoundary(true)
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

  const handleChange = (event) => {
    !event.target.checked
      ? props.onMarkNeighbourhoods([])
      : props.onMarkNeighbourhoods(neighbourhoods)
    setShowBoundary(event.target.checked)
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
          sm={12}
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
            <Grid item xs={6} md={6} lg={6} sm={6}>
              <Typography
                variant='button'
                display='block'
                gutterBottom
                style={{ float: 'left' }}
              >
                My Trip Locations
              </Typography>
            </Grid>
            <Grid item xs={6} md={6} lg={6} sm={6}>
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
            sm={12}
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

        <Grid item xs={12} md={12} lg={12} sm={12}>
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
                  <FormControlLabel
                    control={
                      <Switch
                        checked={showBoundary}
                        onChange={handleChange}
                        name='checkedB'
                        color='primary'
                      />
                    }
                    style={{ fontSize: '0.8rem' }}
                    label='Show Boundary'
                  />
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
            sm={12}
            style={{
              overflowY: 'auto',
              height: '530px',
              paddingTop: '2%',
              paddingRight: '2%',
              overflowX: 'hidden',
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
                    sm={12}
                    style={{ marginBottom: '3%' }}
                  >
                    <Card
                      className={classes.root}
                      onMouseEnter={() => props.showInfoBox(listing)}
                      onMouseLeave={() => props.hideInfoBox(listing)}
                    >
                      <CardContent
                        style={{ textAlign: 'left', paddingBottom: '0' }}
                      >
                        <Grid container>
                          <Grid
                            item
                            xs={11}
                            md={11}
                            lg={11}
                            sm={11}
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
                          <Grid
                            item
                            xs={1}
                            md={1}
                            lg={1}
                            sm={1}
                            style={{ paddingBottom: '2%' }}
                          >
                            {listing && listing['hostIsSuperhost'] === 't' && (
                              <StarIcon
                                style={{ float: 'right', color: 'gold' }}
                              ></StarIcon>
                            )}
                          </Grid>
                          <Grid item xs={4} md={4} lg={4} sm={4}>
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
                            sm={8}
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
                              <Grid item xs={8} md={8} lg={8} sm={8}>
                                <Typography
                                  variant='overline'
                                  display='block'
                                  gutterBottom
                                >
                                  {listing.roomType}
                                </Typography>
                              </Grid>
                              <Grid item xs={4} md={4} lg={4} sm={4}>
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
                                marginBottom: '3%',
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
          <Grid xs={12} sm={12} md={12} lg={12}>
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
              sm={12}
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
        maxWidth='xs'
      >
        <DialogTitle id='alert-dialog-slide-title'>
          {clickedListing && clickedListing['name']}{' '}
          {clickedListing && clickedListing['hostIsSuperhost'] === 't' && (
            <StarIcon
              fontSize='large'
              style={{ float: 'right', color: 'gold' }}
            ></StarIcon>
          )}
        </DialogTitle>
        <DialogContent>
          {clickedListing && (
            <DialogContentText id='alert-dialog-slide-description'>
              <Grid container>
                <>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <img
                      src={clickedListing['pictureUrl']}
                      height='250'
                      width='100%'
                    ></img>
                  </Grid>

                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={6}
                    xs={6}
                    style={{
                      paddingTop: '2%',
                      fontSize: '16px',

                      fontWeight: 'bold',
                    }}
                  >
                    {clickedListing['hostName']}
                  </Grid>

                  <Grid
                    item
                    alignItems='center'
                    lg={6}
                    md={6}
                    sm={6}
                    xs={6}
                    style={{
                      display: 'flex',
                      paddingTop: '2%',
                      fontSize: '16px',
                      textAlign: 'right',
                      fontWeight: 'bold',
                    }}
                  >
                    {clickedListing['propertyType'] === 'Apartment' ? (
                      <>
                        <Grid item lg={10} md={10} sm={10} xs={10}>
                          Apartment
                        </Grid>
                        <Grid item lg={2} md={2} sm={2}>
                          <ApartmentIcon></ApartmentIcon>
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                          <HomeWorkIcon></HomeWorkIcon>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                          Hotel
                        </Grid>
                      </>
                    )}
                  </Grid>
                  <Divider
                    style={{
                      width: '100%',
                      marginTop: '2%',
                      marginBottom: '2%',
                    }}
                  ></Divider>
                  <Grid item lg={6} md={6} sm={6} xs={6} style={modalHStyle}>
                    Accommodates
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} style={modalVStyle}>
                    {Array(parseInt(clickedListing['accommodates']))
                      .fill(0)
                      .map((e, i) => i + 1)
                      .map((x) => (
                        <PersonIcon></PersonIcon>
                      ))}{' '}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} style={modalHStyle}>
                    Bathrooms
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} style={modalVStyle}>
                    {Array(parseInt(clickedListing['bathrooms']))
                      .fill(0)
                      .map((e, i) => i + 1)
                      .map((x) => (
                        <WcIcon></WcIcon>
                      ))}{' '}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} style={modalHStyle}>
                    Bedrooms
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} style={modalVStyle}>
                    {Array(parseInt(clickedListing['bedrooms']))
                      .fill(0)
                      .map((e, i) => i + 1)
                      .map((x) => (
                        <MeetingRoomIcon></MeetingRoomIcon>
                      ))}{' '}
                  </Grid>

                  <Grid item lg={6} md={6} sm={6} xs={6} style={modalHStyle}>
                    Beds
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} style={modalVStyle}>
                    {Array(parseInt(clickedListing['beds']))
                      .fill(0)
                      .map((e, i) => i + 1)
                      .map((x) => (
                        <KingBedIcon></KingBedIcon>
                      ))}{' '}
                  </Grid>
                  <Divider
                    style={{
                      width: '100%',
                      marginTop: '2%',
                      marginBottom: '2%',
                    }}
                  ></Divider>
                  <Grid item lg={6} md={6} sm={6} xs={6} style={modalHStyle}>
                    Price
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} style={modalVStyle}>
                    {clickedListing['price']} CHF
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} style={modalHStyle}>
                    Security Deposit
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} style={modalVStyle}>
                    {clickedListing['securityDeposit']} CHF
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} style={modalHStyle}>
                    Cleaning Fee
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} style={modalVStyle}>
                    {clickedListing['cleaningFee']} CHF
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
