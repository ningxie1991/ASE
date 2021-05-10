import axios from 'axios'
import { config } from 'helpers/Constants.js'

export default async function getListingsByNeighbourhood(neighbourhood) {
  //   return data
  return await axios.get(`${config.url.BACKEND_BROWSE_API}/neighbourhood=` + neighbourhood)
}

export async function getListingsByNeighbourhoodList(neighbourhoodList) {
  //   return data
    return await axios.post(`${config.url.BACKEND_BROWSE_API}/neighbourhoods`, neighbourhoodList)
}

export async function getAllListings() {
  //   return data
  return await axios.get(`${config.url.BACKEND_BROWSE_API}/allListings`)
}