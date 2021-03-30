import axios from 'axios';

const API_URL = 'http://localhost:3001/finder/';

class FinderService{

    getMessage(){
        return axios.get(API_URL + "hello");
    }
}

export default new FinderService();