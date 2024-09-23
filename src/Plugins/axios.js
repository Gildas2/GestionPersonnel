import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost/GestionPersonnel/backend/'
    //baseURL: 'http://192.168.1.49/GestionPersonnel/backend/'
});

export default instance;
