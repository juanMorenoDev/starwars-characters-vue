import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CharacterRepositoryHttp } from '../CharacterRepositoryHttp'
import { CharacterApi } from '../../infrastructure/CharacterApi'
import { CharacterApiMapper } from '../CharacterApiMapper'

// Mocks
vi.mock('../../infrastructure/CharacterApi')
vi.mock('../CharacterApiMapper')

const mockCharacter = {
  id: '1',
  name: 'Luke Skywalker',
  birthYear: '19BBY',
  gender: 'male',
  species: ['https://swapi.dev/api/species/1/'],
  films: ['https://swapi.dev/api/films/1/'],
}

const mockApiCharacter = {
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  gender: 'male',
  species: ['https://swapi.dev/api/species/1/'],
  films: ['https://swapi.dev/api/films/1/'],
  url: 'https://swapi.dev/api/people/1/',
}

describe('CharacterRepositoryHttp', () => {
  let repository: CharacterRepositoryHttp

  beforeEach(() => {
    vi.clearAllMocks()
    repository = new CharacterRepositoryHttp()
  })

  describe('getAll', () => {
    const mockedGetAll = vi.mocked(CharacterApi.getAll)
    it('should return characters', async () => {
      const mockApiCharacters = [mockApiCharacter]
      const mockMappedCharacters = [mockCharacter]

      mockedGetAll.mockResolvedValue(mockApiCharacters)
      vi.mocked(CharacterApiMapper.toDomain).mockReturnValue(mockCharacter)

      const result = await repository.getAll()

      expect(mockedGetAll).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockMappedCharacters)
    })

    it('should handle errors from the API', async () => {
      const errorMessage = 'API Error'
      mockedGetAll.mockRejectedValue(new Error(errorMessage))

      await expect(repository.getAll()).rejects.toThrow(errorMessage)
    })
  })

  describe('getById', () => {
    const mockedGetById = vi.mocked(CharacterApi.getById)
    it('should return a mapped character when found', async () => {
      mockedGetById.mockResolvedValue(mockApiCharacter)
      vi.mocked(CharacterApiMapper.toDomain).mockReturnValue(mockCharacter)

      const result = await repository.getById('1')

      expect(mockedGetById).toHaveBeenCalledWith('1')
      expect(CharacterApiMapper.toDomain).toHaveBeenCalledWith(mockApiCharacter)
      expect(result).toEqual(mockCharacter)
    })

    it('should return null when character is not found (404)', async () => {
      const error = {
        isAxiosError: true,
        response: {
          status: 404,
        },
      }
      mockedGetById.mockRejectedValue(error)

      const result = await repository.getById('999')

      expect(result).toBeNull()
    })
  })
})
