import axios from 'axios'
import { config } from 'helpers/Constants.js'

export default async function getBestNeighbourhoods(query) {
  //   return data
  return await axios.post(
    `${config.url.BACKEND_CALCULATOR_API}/best_neighborhoods`,
    query
  )
}

export async function getGeoJsonCoordinates(osmID) {
  return await axios.get(`${config.url.OPEN_STREET_MAP_GEO_LOCATION}`, {
    params: {
      id: osmID,
    },
  })
}
