<template>
  <v-btn v-tooltip:top="tooltip" size="small" variant="elevated" color="primary" class="styled-button" icon>
    <v-icon :icon="iconName" color="secondary" />
  </v-btn>
</template>

<script setup lang="ts">
defineProps<{
  iconName: string
  tooltip: string
}>()
</script>
