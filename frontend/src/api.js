import axios from "axios"; 

const API_PORT= 5001; 
const BASE_URL= `https://localhost:${API_PORT}/api`;

const api= axios.create ({
    baseURL: BASE_URL,
    headers: {"Content-type": "application/json"}
})

export default api;