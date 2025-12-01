<script setup>
import { ref, reactive, onMounted } from "vue";
import { db } from "./data/guitarras.js";
import Guitarra from "./components/Guitarra.vue";
import Header from "./components/Header.vue";

// Con reactive
/*const state = reactive({
  guitarras: db
});*/

// Con ref
const guitarras = ref();
const carrito = ref([]);
const guitarraPromo = ref({});

// Con onMounted() = useEffect()
onMounted(() => {
  guitarras.value = db; // ref
  // state.guitarras = db; // reactive
  guitarraPromo.value = guitarras.value[2];
}),
  console.log(guitarras.value);

const agregarCarrito = (guitarra) => {
  const articuloExiste = carrito.value.findIndex(
    (element) => guitarra.id === element.id
  );

  if (articuloExiste >= 0) {
    carrito.value[articuloExiste].cantidad++;
  } else {
    guitarra.cantidad = 1;
    carrito.value.push(guitarra);
  }
};
</script>

<template>
  <Header v-bind:carrito="carrito" v-bind:guitarraPromo="guitarraPromo" @agregar-carrito="agregarCarrito"/>

  <main class="container-xl mt-5">
    <h2 class="text-center">Nuestra Colección</h2>

    <div class="row mt-5">
      <Guitarra
        v-for="guitarra in guitarras"
        v-bind:guitarra="guitarra"
        @agregar-carrito="agregarCarrito"
      />
      <!-- FIN GUITARRA -->
    </div>
  </main>

  <footer class="bg-dark mt-5 py-5">
    <div class="container-xl">
      <p class="text-white text-center fs-4 mt-4 m-md-0">
        GuitarLA - Todos los derechos Reservados
      </p>
    </div>
  </footer>
</template>

<style></style>
