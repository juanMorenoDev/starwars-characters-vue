<template>
  <section class="character-detail">
    <div v-if="isLoading" class="centered-message">
      <p>Loading character...</p>
    </div>
    <div v-else-if="error" class="centered-message error">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="character" class="container">
      <h1 class="title">{{ character.name }}</h1>

      <div class="info-card">
        <p><strong>Birth Year:</strong> {{ character.birthYear }}</p>
        <p><strong>Gender:</strong> {{ character.gender }}</p>
        
        <p><strong>Species:</strong></p>
        <ul>
          <li v-for="(specie, index) in character.species" :key="index">{{ specie }}</li>
        </ul>

        <p><strong>Films:</strong></p>
        <ul>
          <li v-for="(film, index) in character.films" :key="index">{{ film }}</li>
        </ul>
      </div>
    </div>
    <div v-else class="centered-message">
      <p>Character not found.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCharacterDetail } from '../composables/useCharacterDetails';

const { character, isLoading, error } = useCharacterDetail();
</script>

<style lang="scss" scoped>
.centered-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: $text-color;

  &.error {
    color: #ef4444; // a red color for errors
  }
}

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