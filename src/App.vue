<template>
  <div class="app">
    <h1>Hola Vue + Sass 👋</h1>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

</script>

<style lang="scss">
.app {
  h1 {
    color: rebeccapurple;
    font-weight: bold;
  }
}
</style>