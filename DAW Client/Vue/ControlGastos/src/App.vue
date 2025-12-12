<script setup>
import { ref, reactive, watch } from "vue";
import Presupuesto from "./components/Presupuesto.vue";
import ControlPresupuesto from "./components/ControlPresupuesto.vue";
import iconoNuevoGasto from "./assets/nuevo-gasto.svg";
import Modal from "./components/Modal.vue";
import { generarId } from "./helpers";
import Gasto from "./components/Gasto.vue";

const presupuesto = ref(0);
const disponible = ref(0);
const gastos = ref([]);
const modal = reactive({
  mostrar: false,
  animar: false,
})
const gasto = reactive({
  nombre: "",
  cantidad: "",
  categoria: "",
  id: null,
  fecha: new Date(),
})
const gastado = ref(0);

watch(gastos, () => {
  gastado.value = gastos.value.reduce((total, gasto) => total + gasto.cantidad, 0)
  disponible.value = presupuesto.value - gastado.value;
}, {
  deep: true
})

const reiniciarGasto = () => {
  Object.entries(gasto).forEach(([key]) => {
    gasto[key] = ""
  })
  gasto.id = null;
  gasto.fecha = new Date();
}

watch(() => modal.mostrar,(abierto) => {
  if (!abierto) reiniciarGasto();
},{})

const mostrarModal = () => {
  modal.mostrar = true;
  setTimeout(() => {
    modal.animar = true;
  }, 500)

}

const ocultarModal = () => {
  modal.animar = false;
  setTimeout(() => {
    modal.mostrar = false;
  }, 500)
}

const definirPresupuesto = (cantidad) => {
  presupuesto.value = cantidad;
  disponible.value = cantidad;
};

const guardarGasto = () => {
  if (gasto.id) {
    const indice = gastos.value.findIndex(g => g.id === gasto.id)
    gastos.value[indice] = {...gasto}
  } else {
    gasto.id = generarId();
    gastos.value.push({ ...gasto });
  }
  ocultarModal();
  reiniciarGasto();
}

const seleccionarGasto = (id) => {
  const gastoEditar = gastos.value.find(g => g.id === id)
  Object.assign(gasto, gastoEditar)
  mostrarModal();
}

</script>

<template>
  <div :class="{ fijar: modal.mostrar }">
    <header>
      <h1>Planificador de Gastos</h1>
      <div class="contenedor-header contenedor sombra">
        <Presupuesto v-if="presupuesto === 0" @definir-presupuesto="definirPresupuesto" />
        <ControlPresupuesto v-else v-bind:presupuesto="presupuesto" v-bind:disponible="disponible" v-bind:gastado="gastado"/>
      </div>
    </header>
    <main v-if="presupuesto > 0">
      <div class="crear-gasto">
        <img v-bind:src="iconoNuevoGasto" alt="Icono Nuevo Gasto" @:click="mostrarModal"></img>
      </div>
      <Modal v-bind:id="gasto.id" v-bind:disponible="disponible" v-bind:modal="modal" v-if="modal.mostrar === true" @ocultar-modal="ocultarModal"
        @guardar-gasto="guardarGasto" v-model:nombre="gasto.nombre" v-model:cantidad="gasto.cantidad"
        v-model:categoria="gasto.categoria" />
      <div class="listado-gastos contenedor">
        <h2>{{ gastos.length > 0 ? "Gastos: " : "NO hay gastos" }}</h2>
        <Gasto v-for="gasto in gastos" v-bind:gasto="gasto" :key="gasto.id" @seleccionar-gasto="seleccionarGasto"/>
      </div>
    </main>
  </div>
</template>

<style>
:root {
  --azul: #3b82f6;
  --blanco: #fff;
  --gris-claro: #f5f5f5;
  --gris: #94a3b8;

  --gris-oscuro: #64748b;
  --negro: #000;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  font-size: 1.6rem;
  font-family: "Lato", sans-serif;
  background-color: var(--gris-claro);
}

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 3rem;
}

header {
  background-color: var(--azul);
}

header h1 {
  padding: 3rem 0;
  margin: 0;
  color: var(--blanco);
  text-align: center;
}

.contenedor {
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}

.contenedor-header {
  margin-top: -5rem;
  transform: translateY(5rem);
  padding: 5rem;
}

.sombra {
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: var(--blanco);
  border-radius: 1.2rem;
  padding: 5rem;
}

.crear-gasto {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}

.crear-gasto img {
  width: 5rem;
  cursor: pointer;
}

.listado-gastos {
  margin-top: 10rem;
}

.listado-gastos h2 {
  font-weight: 900;
  color: var(--gris-oscuro);
}

.fijar {
  overflow: hidden;
  height: 100vh;
}
</style>
