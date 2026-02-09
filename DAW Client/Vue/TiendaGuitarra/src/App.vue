<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { db } from "./data/guitarras.js";
import Guitarra from "./components/Guitarra.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

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
  carrito.value = JSON.parse(localStorage.getItem('carrito'));
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

const aumentarCantidad = (id) => {
  const articuloIndex = carrito.value.findIndex((element) => id === element.id);
  carrito.value[articuloIndex].cantidad++;
};

const decrementarCantidad = (id) => {
  const articuloIndex = carrito.value.findIndex((element) => (id === element.id));
  if (carrito.value[articuloIndex].cantidad > 1)
    carrito.value[articuloIndex].cantidad--;
};

const eliminarProducto = (id) => {
  const articuloIndex = carrito.value.findIndex((element) => (id === element.id));
  if (articuloIndex >= 0) carrito.value.splice(articuloIndex,1)
};

const vaciarCarrito = () => {
  carrito.value.splice(0, carrito.value.length);
}

const guardarLocalStorage = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito.value));
}

watch(carrito, () => {
  guardarLocalStorage()
}, {
  deep:true
})

</script>

<template>
  <Header
    v-bind:carrito="carrito"
    v-bind:guitarraPromo="guitarraPromo"
    @agregar-carrito="agregarCarrito"
    @aumentar-cantidad="aumentarCantidad"
    @decrementar-cantidad="decrementarCantidad"
    @eliminar-producto="eliminarProducto"
    @vaciar-carrito="vaciarCarrito"
  />

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

  <Footer />
</template>

<style></style>
