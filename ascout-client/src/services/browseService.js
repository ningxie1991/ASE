import axios from 'axios'
import { config } from 'helpers/Constants.js'

export default async function getListingsByNeighbourhood(neighbourhood) {
  //   return data
  return await axios.get(`${config.url.REACT_APP_API_BROWSE}/neighbourhood=` + neighbourhood)
}

export async function getListingsByNeighbourhoodList(neighbourhoodList) {
  //   return data
  // return await axios.post(`${config.url.REACT_APP_API_BROWSE}/neighbourhoods`, neighbourhoodList)
   return await axios.post(`http://34.116.255.40:3002/browse/neighbourhoods`, neighbourhoodList)
}

export async function getAllListings() {
  //   return data
  return await axios.get(`${config.url.REACT_APP_API_BROWSE}/allListings`)
}