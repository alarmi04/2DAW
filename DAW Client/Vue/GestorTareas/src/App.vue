<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import Tarea from "./components/Tarea.vue";

const tarea = reactive({
  nombre: "",
  completada: false,
});

const listaTareas = ref([]);

onMounted(() => {
  listaTareas.value = JSON.parse(localStorage.getItem("tareas")) || [];
});

const modificarEstado = (t) => {
  t.completada ? (t.completada = false) : (t.completada = true);
};

const agregarTarea = () => {
  const tareaExiste = listaTareas.value.findIndex(
    (element) => element.nombre === tarea.nombre,
  );
  if (tareaExiste < 0) {
    listaTareas.value.push({ ...tarea });
  }
};

const eliminarTarea = (t) => {
  const tareaIndex = listaTareas.value.findIndex(
    (element) => t.nombre === element.nombre,
  );
  if (tareaIndex >= 0) {
    listaTareas.value.splice(tareaIndex, 1);
  }
};

const tareasPendientes = computed(
  () => listaTareas.value.filter((t) => !t.completada).length,
);

const tareasCompletadas = computed(
  () => listaTareas.value.filter((t) => t.completada).length,
);

watch(
  listaTareas,
  () => {
    localStorage.setItem("tareas", JSON.stringify(listaTareas.value));
  },
  { deep: true },
);
</script>

<template>
  <div id="app">
    <h1>Gestión de Tareas</h1>
    <form @:submit.prevent="agregarTarea">
      <input type="text" placeholder="Añadir tarea..." v-model="tarea.nombre" />
      <button type="submit">Añadir</button>
    </form>
    <!-- Mostrar conteos de tareas pendientes y completadas -->
    <p>
      Tareas pendientes: {{ tareasPendientes }} | Tareas completadas:
      {{ tareasCompletadas }}
    </p>
    <!-- Lista de tareas -->
    <ul>
      <Tarea
        v-for="element in listaTareas"
        v-bind:tarea="element"
        @eliminar-tarea="eliminarTarea"
        @modificar-estado="modificarEstado"
      />
    </ul>
  </div>
</template>

<style>
body {
  margin: 0 auto;
  padding: 50px;
  font-family: Arial, sans-serif;
  text-align: center;
  background-image: url("/imagenFondo.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
h1 {
  color: #e76018;
}
form {
  margin-bottom: 20px;
}
p {
  color: white;
  text-transform: uppercase;
  font-weight: bold;
}
span {
  color: black;
  font-weight: bold;
}
input {
  padding: 8px;
  width: 80%;
  font-size: 16px;
}
button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  margin: 10px;
}

button:hover {
  background-color: #45a049;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.completed {
  text-decoration: line-through;
  color: grey;
}
.modificar {
  background-color: #4caf50;
}
.modificar:hover {
  background-color: #45a049;
}
.eliminar {
  background-color: red;
}
.eliminar:hover {
  background-color: darkred;
}
li button {
  color: white;
  border: none;
  cursor: pointer;
}
</style>
