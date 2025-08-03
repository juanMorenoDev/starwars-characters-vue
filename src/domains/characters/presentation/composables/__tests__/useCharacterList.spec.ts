import { describe, it, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { useCharacterList } from '../useCharacterList'
import { withSetup } from '@/shared/__tests__/test.utils'

const mockCharacters = [
  {
    id: '1',
    name: 'Luke Skywalker',
    birthYear: '19BBY',
    gender: 'Male',
    species: [],
    films: [],
  },
  { id: '2', name: 'Darth Vader', birthYear: '41BBY', gender: 'Male', species: [], films: [] },
]

const setSelectedCharacter = vi.fn()

// Mocks
vi.mock('../../../application/GetAllCharacters', () => ({
  GetAllCharacters: vi.fn().mockImplementation(() => ({
    execute: vi.fn().mockImplementation(() => Promise.resolve(mockCharacters)),
  })),
}))

vi.mock('../../stores/SelectedCharacter', () => ({
  useSelectedCharacterStore: vi.fn(() => ({
    setSelectedCharacter,
  })),
}))

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}))

// Tests
describe('useCharacterList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with empty characters and loading state', () => {
    const { characters, isLoading } = useCharacterList()
    expect(characters.value).toEqual([])
    expect(isLoading.value).toBe(false)
  })

  it('should fetch characters on mount', async () => {
    const [mockMount] = withSetup(useCharacterList)
    await nextTick()
    expect(mockMount.characters.value).toEqual(mockCharacters)
  })

  it('should navigate to character detail', async () => {
    const { goToDetail } = useCharacterList()
    const character = {
      id: '1',
      name: 'Luke',
      birthYear: '19BBY',
      gender: 'Male',
      species: [],
      films: [],
    }

    goToDetail(character)
    await nextTick()
    expect(setSelectedCharacter).toHaveBeenCalledWith(character)
  })
})
