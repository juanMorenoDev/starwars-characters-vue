import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import type { Character } from '../../domain/Character'
import { useSelectedCharacterStore } from '../stores/SelectedCharacter'
import { GetCharacterById } from '../../application/GetCharacterById'
import { CharacterRepositoryHttp } from '../../adapters/CharacterRepositoryHttp'

export function useCharacterDetail() {
  const route = useRoute()
  const { selectedCharacter } = useSelectedCharacterStore()

  const character = ref<Character | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  onMounted(async () => {
    const id = route.params.id as string

    if (selectedCharacter && selectedCharacter.id === id) {
      character.value = selectedCharacter
      return
    }

    try {
      isLoading.value = true
      error.value = null
      const useCase = new GetCharacterById(new CharacterRepositoryHttp())
      character.value = await useCase.execute(id)
    } catch (e) {
      console.error(e)
      error.value = 'An unexpected error occurred. Please try again later.'
    } finally {
      isLoading.value = false
    }
  })

  return {
    character,
    isLoading,
    error,
  }
}
