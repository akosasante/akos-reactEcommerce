import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://ecommerce-6kwa.onrender.com/api/v1',
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    withCredentials: true
});

export default apiClient