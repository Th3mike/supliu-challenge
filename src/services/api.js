import axios from 'axios';

const api = axios.create({
    baseURL: "https://tiao.supliu.com.br/api/",
});


export default api;