import { describe, it, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { useCharacterDetail } from '../useCharacterDetails'
import { withSetup } from '@/shared/__tests__/test.utils'

let mockCharacter = {
  id: '1',
  name: 'Luke Skywalker',
  birthYear: '19BBY',
  gender: 'Male',
  species: [],
  films: [],
}

const setSelectedCharacter = vi.fn()
const getCharacterByIdMocked = vi.fn().mockImplementation(() => Promise.resolve(mockCharacter))

// Mocks
vi.mock('../../../application/GetCharacterById', () => ({
  GetCharacterById: vi.fn().mockImplementation(() => ({
    execute: getCharacterByIdMocked,
  })),
}))

vi.mock('../../stores/SelectedCharacter', () => ({
  useSelectedCharacterStore: vi.fn(() => ({
    setSelectedCharacter,
    selectedCharacter: mockCharacter,
  })),
}))

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    params: {
      id: '1',
    },
  })),
  useRouter: vi.fn(() => ({
    back: vi.fn(),
  })),
}))

// Tests
describe('useCharacterDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with character and loading state', () => {
    const { character, isLoading } = useCharacterDetail()
    expect(character.value).toEqual(null)
    expect(isLoading.value).toBe(false)
  })

  it('should get stored character on mount', async () => {
    const [mockMount] = withSetup(useCharacterDetail)
    await nextTick()
    expect(mockMount.character.value).toEqual(mockCharacter)
  })

  it('should get character by id if store is empty on mount', async () => {
    mockCharacter = {
      id: '',
      name: '',
      birthYear: '',
      gender: '',
      species: [],
      films: [],
    }
    const [mockMount] = withSetup(useCharacterDetail)
    await nextTick()
    expect(getCharacterByIdMocked).toHaveBeenCalledWith('1')
    expect(mockMount.character.value).toEqual(mockCharacter)
  })
})
