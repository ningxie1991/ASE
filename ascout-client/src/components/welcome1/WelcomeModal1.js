import React, { useState, useEffect, useRef } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import logo from '../../assets/imgs/logo.png'
import Grid from '@material-ui/core/Grid'
import welcomemodal1 from '../../assets/imgs/welcomemodal1.png'
import './WelcomeModal.css'
import CityAutoComplete from '../autocomplete/city/CityAutoComplete'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

export default function WelcomeModal1(props) {
  const [open, setOpen] = useState(true)
  const [city, setCity] = useState(props.src ? props.src : null)
  const pickedCity = useRef(null)

  const handlePickedCity = () => {
    const params = pickedCity.current['city']
    setCity(params)
    console.log(params)
  }

  useEffect(() => {
    props.stateRef.current = { city }
    props.handlePickedCity()
  }, [city])

  return (
    <div>
      <Dialog
        aria-labelledby='customized-dialog-title'
        open={open}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle id='customized-dialog-title'>
          <img src={logo} alt='logo' style={{ textAlign: 'center' }} />
        </DialogTitle>
        <DialogContent dividers>
          <Grid container>
            <Grid item md={7}>
              <h6 className='textQuestion'>Where would you like to Scout?</h6>
              <CityAutoComplete
                stateRef={pickedCity}
                src={city}
                handlePickedCity={handlePickedCity}
              ></CityAutoComplete>
            </Grid>

            <Grid item md={5}>
              <img src={welcomemodal1} width='100%'></img>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  )
}
