// axios instance configuration
// central api connector

import axios from 'axios';

//create axios instance
const API=axios.create({
    baseURL:"http://localhost:5000/api", // this is our backend base url
});

//export this instance
export default API;