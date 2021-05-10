// Constants.js
const prod = {
  url: {},
}
const dev = {
  url: {
    BACKEND_CALCULATOR_API: "http://34.65.91.230:3001/calculate",
    BACKEND_BROWSE_API: "http://34.65.207.172:3002/browse"
  },
}
export const config = process.env.NODE_ENV === 'development' ? dev : prod
