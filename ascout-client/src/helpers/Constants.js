// Constants.js
const prod = {
  url: {},
}
const dev = {
  url: {
    REACT_APP_BROWSE_API: 'http://34.116.255.40:3002/browse',
  },
}
export const config = process.env.NODE_ENV === 'development' ? dev : prod
