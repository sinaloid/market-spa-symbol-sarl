import axios from 'axios';

//const URL = 'https://market-africadefis.herokuapp.com/api/'
const URL = 'http://africadefis.com/spa-market/public/api/'
const URL2 = 'http://127.0.0.1:8000/api/'
//const URLIMG = 'https://market-africadefis.herokuapp.com/uploads/'
const URLIMG = 'http://africadefis.com/spa-market/public/uploads/'
const URLIMG2 = 'http://127.0.0.1:8000/uploads/'

export const urlImg = URLIMG

const apiClient = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: {'Accept':'application/json'},
});

export default apiClient;