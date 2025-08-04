import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { GetAllCharacters } from '../../application/GetAllCharacters'
import { CharacterRepositoryHttp } from '../../adapters/CharacterRepositoryHttp'
import type { Character } from '../../domain/Character'
import { useSelectedCharacterStore } from '../stores/SelectedCharacter'

export function useCharacterList() {
  const router = useRouter()
  const isLoading = ref(false)
  const characters = ref<Character[]>([])
  const { setSelectedCharacter } = useSelectedCharacterStore()

  const useCase = new GetAllCharacters(new CharacterRepositoryHttp())

  const fetchCharacters = async () => {
    isLoading.value = true
    characters.value = await useCase.execute()
    isLoading.value = false
  }

  const goToDetail = (character: Character) => {
    setSelectedCharacter(character)
    router.push({ name: 'character-detail', params: { id: character.id } })
  }

  onMounted(fetchCharacters)

  return {
    characters,
    goToDetail,
    isLoading,
  }
}
