<script setup>
import { ref } from 'vue';
import Alerta from './Alerta.vue';

const presupuestoInicial = ref(0);
const error = ref("");

const emit = defineEmits(['definir-presupuesto']);

const validarPresupuesto = () => {
    if (presupuestoInicial.value <= 0 || presupuestoInicial.value === "") {
        error.value = "El presupuesto introducido no es válido.";
        
        setTimeout(() => {
            presupuestoInicial.value = 0;
            error.value = "";
        }, 3000)

        return
    }

    emit('definir-presupuesto', presupuestoInicial.value);
}

</script>

<template>
  <form class="presupuesto" @:submit.prevent="validarPresupuesto">
    <Alerta v-if="error !== ''">
        {{ error }}
    </Alerta>
    <div class="campo">
        <label for="nuevo-presupuesto">Definir presupuesto</label>
        <input 
        type="number" 
        id="nuevo-presupuesto" 
        class="nuevo-presupuesto" 
        placeholder="Indica tu presupuesto"
        v-model="presupuestoInicial"
        ></input>
        <input type="submit" value="Aceptar"></input>
    </div>

  </form>
</template>

<style scoped>
 .presupuesto{ 
        width: 100%; 
    } 
    .campo { 
        display: grid; 
        gap: 2rem; 
    } 
    .presupuesto label { 
        font-size: 2.2rem; 
        text-align: center; 
        color: var(--azul); 
    } 
    .presupuesto input[type="number"] { 
        background-color: var(--gris-claro); 
        border-radius: 1rem; 
        padding: 1rem; 
        border: none; 
        font-size: 2.2rem; 
        text-align: center; 
    } 
    .presupuesto input[type="submit"] { 
        background-color: var(--azul); 
        border: none; 
        padding: 1rem; 
        font-size: 2rem; 
        text-align: center; 
        margin-top: 2rem; 
        color: var(--blanco); 
        font-weight: 900; 
        width: 100%; 
        transition: background-color 300ms ease; 
    } 
    .presupuesto input[type="submit"]:hover { 
        background-color: #1048A4; 
        cursor: pointer; 
    }    
</style>
