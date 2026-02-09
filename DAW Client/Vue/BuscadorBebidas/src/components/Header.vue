<script setup>
import { RouterLink, useRoute } from "vue-router";
import { computed } from 'vue';
import { useBebidasStore } from '../stores/bebidas';

/* Utilizo useRoute() para acceder a la información de la ruta actual */
const route = useRoute();

/* Se recomiendo crear una variable igualada a la funcion del Store */
const store = useBebidasStore();
console.log(store.categorias);

console.log(route);

/* Si el nombre de la ruta es igual a inicio, es decir, estamos en la vista inicio, se devolvera true */
const paginaInicio = computed(() => route.name === 'inicio');

const handleSubmit = () => {
  store.obtenerBebidas();
}

</script>

<template>
  <header class="bg-slate-800" :class="{'header':paginaInicio}">
    <div class="mx-auto container px-5 py-16">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink :to="{ name: 'inicio' }">
            <img class="w-32" src="/img/logo.svg" alt="imagen logo" />
          </RouterLink>
        </div>

        <nav class="flex gap-4 text-white">
          <RouterLink
            :to="{ name: 'inicio' }"
            class="uppercase font-bold p-2"
            active-class="text-orange-500 bg-white rounded-lg p-2"
          >
            Inicio
          </RouterLink>
          <RouterLink
            :to="{ name: 'favoritos' }"
            class="uppercase font-bold p-2"
            active-class="text-orange-500 bg-white rounded-lg p-2"
          >
            Favoritos
          </RouterLink>
        </nav>
      </div>
      <form
        class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
        v-if="paginaInicio"
        v-on:submit.prevent="handleSubmit()"
      >
        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="ingrediente"
            >Nombre o Ingredientes</label
          >
          <input
            id="ingrediente"
            type="text"
            class="p-3 w-full rounded-lg focus:outline-none bg-white"
            placeholder="Nombre o Ingrediente: ej. Vodka, Tequilla, etc"
            v-model="store.busqueda.nombre"
          />
        </div>
        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="categoria"
            >Categoría</label
          >
          <select
            id="categoria"
            class="p-3 w-full rounded-lg focus:outline-none bg-white"
            v-model="store.busqueda.categoria"
          >
            <option value="">--Seleccione--</option>
            <option
              v-for="categoria in store.categorias"
              :key="categoria.strCategory"
              :value="categoria.strCategory"
            >
            {{ categoria.strCategory }}
            </option>
          </select>
        </div>
        <input
          type="submit"
          class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
          value="Buscar Bebidas"
        />
      </form>
    </div>
  </header>
</template>

<style>
  .header {
    background-image: url('/img/bg.jpg');
    background-size: cover;
    background-position: center;
  }
</style>
