// Constants.js
const prod = {
  url: {},
}
const dev = {
  url: {
    REACT_APP_BROWSE_API: 'http://localhost:3001/browse/',
  },
}
export const config = process.env.NODE_ENV === 'development' ? dev : prod
