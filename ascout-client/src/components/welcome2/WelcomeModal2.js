import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import CloseIcon from '@material-ui/icons/Close'
import React from 'react'
import logo from '../../assets/imgs/logo.png'
import welcomemodal1 from '../../assets/imgs/welcomemodal1.png'
import hist from '../../utils/History'
import './WelcomeModal.css'
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

export default function WelcomeModal2() {
  const [open, setOpen] = React.useState(true)

  const calulateNeighbourhoodButtonClick = () => {
    hist.push('/listings')
  }

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
              <h6 className='textQuestion'>Pick how you want to Scout?</h6>
              <div style={{ marginBottom: '3%', marginTop: '2%' }}>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={calulateNeighbourhoodButtonClick}
                >
                  Calculate the ideal neighbourhood{' '}
                  <ArrowForwardIosIcon
                    style={{ paddingLeft: '3%' }}
                  ></ArrowForwardIosIcon>
                </Button>
              </div>
              <div style={{ marginBottom: '3%' }}>
                <Button color='primary' variant='contained'>
                  Have a look at all the listings of the city{' '}
                  <ArrowForwardIosIcon
                    style={{ paddingLeft: '3%' }}
                  ></ArrowForwardIosIcon>
                </Button>
              </div>
              <div style={{ marginBottom: '3%' }}>
                <Button color='primary' variant='contained'>
                  Have a look at these plans we prepared for you{' '}
                  <ArrowForwardIosIcon
                    style={{ paddingLeft: '3%' }}
                  ></ArrowForwardIosIcon>
                </Button>
              </div>
            </Grid>

            <Grid item md={5}>
              <img src={welcomemodal1} width='100%' alt='image sticker'></img>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  )
}
