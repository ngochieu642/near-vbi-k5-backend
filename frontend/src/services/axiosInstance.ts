import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://54.254.178.184:30000/api/v1'
});

export default axiosInstance;

