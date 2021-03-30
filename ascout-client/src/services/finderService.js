import axios from 'axios';

const API_URL = 'http://localhost:3001/finder/';

export default async function getMessage() {
    const response = await axios.get(API_URL + "hello");
    const data = await response.data;

    return data;
}

