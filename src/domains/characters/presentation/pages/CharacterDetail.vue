<template>
  <v-main>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card v-if="isLoading" class="text-center">
            <v-card-text>
              <v-progress-circular indeterminate color="primary" />
              <p>Loading character...</p>
            </v-card-text>
          </v-card>
          <v-card elevation="6" rounded="lg" v-else-if="character">
            <v-card-text>
              <v-row class="pa-5">
                <v-col cols="4" sm="3" class="my-2">
                  <v-row>
                    <v-img :src="`/images/characters/${character.id}.jpg`" alt="Character" width="10rem"
                      class="rounded-lg" />
                  </v-row>
                </v-col>
                <v-col cols="8" sm="9">
                  <v-row>
                    <v-col cols="12">
                      <h1 class="star-wars-font text-secondary">{{ character.name.toLowerCase() }}</h1>
                      <p><strong>Birth Year:</strong> {{ character.birthYear }}</p>
                      <p><strong>Gender:</strong> {{ character.gender }}</p>
                    </v-col>
                  </v-row>
                  <ImageRow title="Films:" :images="character.films" baseUrl="/images/films" />
                  <ImageRow title="Species:" :images="character.species" baseUrl="/images/species" />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-container>
                <v-row justify="center">
                  <StyledIconButton @click="goBack" iconName="mdi-chevron-left" tooltip="Back" />
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>
          <v-card v-else class="text-center">
            <v-card-text>
              <p>Character not found.</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import StyledIconButton from '../components/StyledIconButton.vue';
import ImageRow from '../components/ImageRow.vue';
import { useCharacterDetail } from '../composables/useCharacterDetails';

const { character, isLoading, goBack } = useCharacterDetail();
</script>
