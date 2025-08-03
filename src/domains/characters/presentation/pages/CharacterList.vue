<template>
  <div class="character-list">
    <h1>Characters</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Birth Year</th>
          <th>Gender</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="character in characters" :key="character.name">
          <td>{{ character.name }}</td>
          <td>{{ character.birthYear }}</td>
          <td>{{ character.gender }}</td>
          <td>
            <StyledButton>
              View
            </StyledButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CharacterRepositoryHttp } from '../../adapters/CharacterRepositoryHttp';
import { GetAllCharacters } from '../../application/GetAllCharacters';
import type { Character } from '../../domain/Character';
import StyledButton from '@/shared/ui/StyledButton.vue';

const characters = ref<Character[]>([]);
const useCase = new GetAllCharacters(new CharacterRepositoryHttp());

onMounted(async () => {
  characters.value = await useCase.execute();
});
</script>