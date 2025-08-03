<template>
  <section class="character-detail">
    <div class="container">
      <h1 class="title">Character Detail</h1>

      <div class="info-card">
        <p><strong>Name:</strong> --</p>
        <p><strong>Birth Year:</strong> --</p>
        <p><strong>Gender:</strong> --</p>
        <p><strong>Species:</strong></p>
        <ul>
          <li v-for="(specie, index) in [1, 2]" :key="index">--</li>
        </ul>
        <p><strong>Films:</strong></p>
        <ul>
          <li v-for="(film, index) in [1, 2]" :key="index">--</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No hay lógica aún
</script>

<style lang="scss" scoped>
.character-detail {
  padding: 2rem;

  .container {
    max-width: 800px;
    margin: 0 auto;
    background-color: $white;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    padding: 2rem;
  }

  .title {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: $primary-color;
  }

  .info-card {
    p {
      margin: 0.5rem 0;
      font-size: 1rem;
    }

    ul {
      margin: 0.5rem 0 1rem;
      padding-left: 1.25rem;
      list-style-type: disc;

      li {
        margin: 0.25rem 0;
      }
    }
  }
}
</style>