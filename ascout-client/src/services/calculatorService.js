import axios from 'axios'
import { config } from 'helpers/Constants.js'

export default async function getBestNeighbourhoods(attractions) {
  //   return data
  return await axios.post(`${config.url.BACKEND_CALCULATOR_API}/best_neighborhoods`, attractions)
}
