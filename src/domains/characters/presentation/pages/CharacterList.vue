<template>
  <v-container>
    <v-row class="mb-4" justify="space-between" align="center">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold text-secondary">Star Wars Characters</h1>
      </v-col>
    </v-row>

    <v-card>
      <v-card-title>
        <v-text-field variant="outlined" v-model="search" append-inner-icon="mdi-magnify" label="Search" single-line
          hide-details clearable />
      </v-card-title>

      <v-data-table :headers="headers" :items="filteredCharacters" :loading="isLoading" :search="search"
        :items-per-page="10" class="elevation-1" :header-props="{ style: 'font-weight: bold' }">
        <template v-slot:loading>
          <v-row justify="center" class="py-6">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-row>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <StyledButton @click="goToDetail(item)" iconName="mdi-information-outline" />
        </template>

        <template v-slot:no-data>
          <v-alert type="info" class="ma-4">
            No characters found
          </v-alert>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useCharacterList } from '../../presentation/composables/useCharacterList';
import StyledButton from '@/shared/ui/StyledButton.vue';

const { goToDetail, isLoading, headers, search, filteredCharacters } = useCharacterList();



</script>
