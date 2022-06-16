import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://172.16.10.72:3000/api/v1'
});

export default axiosInstance;

