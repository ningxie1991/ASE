import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_BACKEND_CALCULATOR_API}`;

export default async function getBestNeighbourhoods(query) {
  //   return data
  return await axios.post(baseUrl + '/best_neighborhoods',
    query
  )
}

export async function getGeoJsonCoordinates(osmID) {
  return await axios.get(baseUrl, {
    params: {
      id: osmID,
    },
  })
}
