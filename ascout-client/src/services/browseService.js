import axios from 'axios';

const API_URL = 'http://34.116.255.40:3002/browse/';

export default async function getListingsFromNeighbourhood(neighbourhood) {
    const response = await axios.get(API_URL + "neighbourhood=" + neighbourhood);
    const data = await response.data;

    return data;
}

