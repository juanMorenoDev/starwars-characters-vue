<template>
  <section class="character-detail">
    <div v-if="isLoading" class="centered-message">
      <p>Loading character...</p>
    </div>
    <div v-else-if="error" class="centered-message error">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="character" class="container">
      <h1 class="title"> <button @click="goBack" class="back-button">←</button>
        {{ character.name }}</h1>

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
import { useRouter } from 'vue-router';
import { useCharacterDetail } from '../composables/useCharacterDetails';

const { character, isLoading, error } = useCharacterDetail();
const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<style lang="scss" scoped>
.centered-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;

  &.error {
    color: #ef4444; // a red color for errors
  }
}

.back-button {
  background-color: transparent;
  border: 1px solid $primary-color;
  color: $primary-color;
  padding: 0.5rem 1rem;
  border-radius: $border-radius;
  cursor: pointer;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: $primary-color;
    color: $white;
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
