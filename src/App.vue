<template>
  <v-app>
    <v-layout>
      <NavBar />
      <v-main>
        <RouterView />
      </v-main>
    </v-layout>

  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from '@/shared/ui/NavBar.vue';

</script>

<style lang="scss">
h1 {
  color: $secondary-color
}
</style>
