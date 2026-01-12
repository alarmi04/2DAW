// Este fichero se utiliza para las diferentes llamadas a la API.

import api from '../lib/axios.js'

export default {
    obtenerCategorias() {
        return api.get('/list.php?c=list')
    },

    buscarBebidas({categoria, nombre}) {
        return api.get(`/filter.php?c=${categoria}&i=${nombre}`)
    }
}