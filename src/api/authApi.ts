import axios from 'axios';

const authApi = axios.create({
    baseURL: 'https://bakiury-social-network-back.herokuapp.com',
    // baseURL: 'http://localhost:3000',
    // params: {
    //     key: 'AIzaSyCZ20dnqz7hScJ2DbmlMS4lhgar9edVFz4'
    // }
});

export default authApi;