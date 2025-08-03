import { defineStore } from 'pinia'
import type { Character } from '@/domains/characters/domain/Character'

interface State {
  selectedCharacter: Character | null
}

export const useSelectedCharacterStore = defineStore('selectedCharacter', {
  state: (): State => ({
    selectedCharacter: null,
  }),

  actions: {
    setSelectedCharacter(character: Character) {
      this.selectedCharacter = character
    },

    clearSelectedCharacter() {
      this.selectedCharacter = null
    },
  },
})
