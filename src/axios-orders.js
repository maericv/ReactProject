import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-myburger-69e34.firebaseio.com/'


});
export default instance;