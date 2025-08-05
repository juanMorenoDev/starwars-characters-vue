<template>
  <v-col cols="12">
    <v-row class="my-2">
      <strong>{{ title }}</strong>
    </v-row>
    <v-row>
      <v-col v-for="(item, index) in images" :key="index" cols="4" sm="2">
        <v-row class="pa-1">
          <v-img :src="`${baseUrl}/${item}.jpg`" eager :alt="`id: ${index}`" />
        </v-row>
      </v-col>
    </v-row>
  </v-col>
</template>

<script setup lang="ts">
defineProps<{
  title: string,
  images: string[]
  baseUrl: string
}>()
</script>
