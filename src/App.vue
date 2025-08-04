<template>
  <v-app>
    <RouterView />
  </v-app>
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