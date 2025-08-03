import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import type { Character } from '../../domain/Character'
import { useSelectedCharacterStore } from '../stores/SelectedCharacter'
// import { getCharacterById } from '@/domains/characters/application/GetCharacterById' // opcional

export function useCharacterDetail() {
  const route = useRoute()
  const { selectedCharacter } = useSelectedCharacterStore()

  const character = ref<Character | null>(null)

  onMounted(async () => {
    const id = route.params.id as string

    if (selectedCharacter && selectedCharacter.id === id) {
      character.value = selectedCharacter
    } else {
    }
  })

  return {
    character,
  }
}
