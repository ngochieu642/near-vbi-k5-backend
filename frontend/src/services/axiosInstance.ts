import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://18.142.229.27:30000/api/v1'
});

export default axiosInstance;

