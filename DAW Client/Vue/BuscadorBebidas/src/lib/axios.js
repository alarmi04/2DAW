// Este fichero se usa para las llamadas base de las APIs

import axios from 'axios';

const api = axios.create({
    baseURL:'https://www.thecocktaildb.com/api/json/v1/1'
})

export default api;