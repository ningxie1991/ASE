// Constants.js
const prod = {
  url: {},
}
const dev = {
  url: {
    BACKEND_CALCULATOR_API: 'http://34.65.91.230:3001/calculate',
    BACKEND_BROWSE_API: 'http://34.65.207.172:3002/browse',
    OPEN_STREET_MAP_GEO_LOCATION:
      'http://polygons.openstreetmap.fr/get_geojson.py',
  },
  api_key: "AIzaSyCbKaQsuL6O1PJH73XG7Pjdg2uD0TGPUuI",
  map_id: "3349742210282c73"
}
export const config = process.env.NODE_ENV === 'development' ? dev : prod
