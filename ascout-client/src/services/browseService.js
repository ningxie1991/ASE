import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_BACKEND_BROWSE_API}`

export default async function getListingsByNeighbourhood(neighbourhood) {
  //   return data
  return await axios.get(baseUrl + '/neighbourhood=' + neighbourhood)
}

export async function getListingsByNeighbourhoodList(neighbourhoodList) {
  //   return data
  return await axios.post(baseUrl + '/neighbourhoods', neighbourhoodList,
    {
      params: {
        paging: false,
      },
    }
  )
}

export async function getAllListings() {
  //   return data
  return await axios.get(baseUrl + '/allListings')
}
