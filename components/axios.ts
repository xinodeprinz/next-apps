import axios from 'axios';
import sweetAlert from './alert';

const instance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'Accept': 'application/json',
    },
});

instance.interceptors.request.use(request => {
    return request;
}, error => {
    sweetAlert({ icon: 'error', title: "The request couldn't go through. Please try again." })
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    return response;
}, error => {
    sweetAlert({ icon: 'error', title: error.response.data.message })
    return Promise.reject(error);
});


export default instance;