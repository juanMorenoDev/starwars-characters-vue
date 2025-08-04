<template>
  <v-btn variant="elevated" color="primary" class="styled-button" icon>
    <v-icon :icon="iconName" color="white" />
  </v-btn>
</template>

<script setup lang="ts">
defineProps<{
  iconName: string
}>()
</script>

<style lang="scss" scoped>
.styled-button {
  &:hover {
    background-color: $secondary-color;
  }
}
</style>
