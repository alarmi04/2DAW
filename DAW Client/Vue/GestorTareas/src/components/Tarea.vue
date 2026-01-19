<script setup>
const props = defineProps({
  tarea: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['eliminar-tarea', 'modificar-estado'])
</script>

<template>
  <li :class="{ completed: tarea.completada }">
    <span> {{ tarea.nombre }} </span>
    <div>
      <button class="modificar" @:click="$emit('modificar-estado', tarea)">
        {{
          tarea.completada ? "Marcar como completada" : "Marcar como pendiente"
        }}
      </button>
      <button class="eliminar" @:click="$emit('eliminar-tarea', tarea)">Eliminar</button>
    </div>
  </li>
</template>

<style lang="scss" scoped></style>
