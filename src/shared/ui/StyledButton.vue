<template>
  <button class="styled-button">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.styled-button {
  background-color: $primary-color;
  color: white;
  padding: $padding;
  border: none;
  border-radius: $border-radius;
  font-size: $font-size;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: $secondary-color;
  }
}
</style>