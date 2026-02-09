import { defineStore } from 'pinia';
import { onMounted, ref, reactive } from 'vue';
import APIServices from '@/services/APIServices';

export const useBebidasStore = defineStore('bebidas', () => {
    const categorias = ref([]);
    const busqueda = reactive({
        nombre:'',
        categoria:''
    });

    onMounted(async () => {
        const {data: {drinks}} = await APIServices.obtenerCategorias();
        console.log(drinks);
        categorias.value = drinks;
    });

    async function obtenerBebidas() {
        const {data: {drinks}} = await APIServices.buscarBebidas(busqueda);
        console.log(drinks)
    }

    return {
        categorias,
        busqueda,
        obtenerBebidas
    }
})