import axios from 'axios'
import { config } from 'helpers/Constants.js'

//const API_URL = 'http://localhost:3001/browse/';

export default async function getAllListings() {
  //   const response = await axios.get(API_URL + 'allListings')
  //   const data = await response.data

  //   return data
  return await axios.get(`${config.url.REACT_APP_API_BROWSE}/allListings`)
}
