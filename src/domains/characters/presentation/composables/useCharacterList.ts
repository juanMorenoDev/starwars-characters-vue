import { ref, onMounted, type Ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { GetAllCharacters } from '../../application/GetAllCharacters'
import { CharacterRepositoryHttp } from '../../adapters/CharacterRepositoryHttp'
import type { Character } from '../../domain/Character'
import { useSelectedCharacterStore } from '../stores/SelectedCharacter'

interface Header {
  title: string
  key: string
  sortable: boolean
  align?: 'start' | 'center' | 'end'
  filterable?: boolean
}

export function useCharacterList() {
  const router = useRouter()
  const isLoading = ref(false)
  const characters = ref<Character[]>([])
  const search = ref('')
  const { setSelectedCharacter } = useSelectedCharacterStore()
  const useCase = new GetAllCharacters(new CharacterRepositoryHttp())

  const headers: Ref<Header[]> = ref([
    { title: 'Name', key: 'name', sortable: true },
    { title: 'Birth Year', key: 'birthYear', sortable: true },
    { title: 'Gender', key: 'gender', sortable: true },
    { title: 'Actions', key: 'actions', sortable: false, align: 'center' },
  ])

  const fetchCharacters = async () => {
    isLoading.value = true
    characters.value = await useCase.execute()
    isLoading.value = false
  }

  const filteredCharacters = computed(() => {
    if (!search.value) return characters.value
    const searchTerm = search.value.toLowerCase()
    return characters.value.filter(
      (char) =>
        char.name.toLowerCase().includes(searchTerm) ||
        char.birthYear?.toLowerCase().includes(searchTerm) ||
        char.gender?.toLowerCase().includes(searchTerm),
    )
  })

  const goToDetail = (character: Character) => {
    setSelectedCharacter(character)
    router.push({ name: 'character-detail', params: { id: character.id } })
  }

  onMounted(fetchCharacters)

  return {
    characters,
    goToDetail,
    isLoading,
    headers,
    search,
    filteredCharacters,
  }
}
