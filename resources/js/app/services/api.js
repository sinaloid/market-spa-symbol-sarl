import axios from 'axios';

//const URL = 'https://market-africadefis.herokuapp.com/api/'
const URL = 'http://market.africadefis.com/api/'
const URL2 = 'http://127.0.0.1:8000/api/'
//const URLIMG = 'https://market-africadefis.herokuapp.com/uploads/'
const URLIMG = 'http://market.africadefis.com/uploads/'
const URLIMG2 = 'http://127.0.0.1:8000/uploads/'
export const SITE_URL = 'http://market.africadefis.com'

export const urlImg = URLIMG

const apiClient = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: {'Accept':'application/json'},
});

export default apiClient;