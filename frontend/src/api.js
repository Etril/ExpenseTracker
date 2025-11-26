import axios from "axios"; 

const API_PORT= 5001; 
const BASE_URL= `https://localhost:${API_PORT}/api`;

const api= axios.create ({
    baseURL: BASE_URL,
    headers: {"Content-type": "application/json"}
})

api.interceptors.request.use((config) => {
    const token= localStorage.getItem("jwt");
    if (!config.headers) {
    config.headers = {}; 
  }
    
    if (token) {
        config.headers.Authorization= `Bearer ${token}`;
    }

    return config;
} )

export default api;