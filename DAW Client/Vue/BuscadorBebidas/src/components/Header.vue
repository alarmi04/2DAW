<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="bg-slate-800">
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
          >
            <option value="">--Seleccione--</option>
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
