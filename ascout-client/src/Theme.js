// @flow
import { createMuiTheme } from '@material-ui/core'

import { Theme } from '@material-ui/core'

const theme: Theme = createMuiTheme({
  palette: {
    primary: { main: '#579ED2', contrastText: '#fff' },
    secondary: { main: '#A9A9A9' },
  },
})

export default theme
