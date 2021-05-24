// Constants.js
const prod = {
  url: {
    BACKEND_CALCULATOR_API: 'http://34.65.177.14:3001/calculate',
    BACKEND_BROWSE_API: 'http://34.65.196.230:3002/browse',
    OPEN_STREET_MAP_GEO_LOCATION:
        'http://polygons.openstreetmap.fr/get_geojson.py',
  },
  api_key: "AIzaSyCbKaQsuL6O1PJH73XG7Pjdg2uD0TGPUuI",
  map_id: "3349742210282c73"
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

console.log("environment: " + process.env.NODE_ENV);
export const config = process.env.NODE_ENV === 'development' ? dev : prod
