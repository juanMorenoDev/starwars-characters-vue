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
        <tr v-for="character in characters" :key="character.id">
          <td>{{ character.name }}</td>
          <td>{{ character.birthYear }}</td>
          <td>{{ character.gender }}</td>
          <td>
            <StyledButton @click="goToDetail(character)">
              View
            </StyledButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import StyledButton from '@/shared/ui/StyledButton.vue';
import { useCharacterList } from '../../presentation/composables/useCharacterList';

const { characters, goToDetail } = useCharacterList()

</script>