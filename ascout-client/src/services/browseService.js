import axios from 'axios';

const API_URL = 'http://localhost:3001/browse/';

export default async function getAllListings() {
    const response = await axios.get(API_URL + "allListings");
    const data = await response.data;

    return data;
}

