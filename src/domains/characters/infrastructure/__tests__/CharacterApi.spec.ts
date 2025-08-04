import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CharacterApi, type CharacterApiResponse } from '../CharacterApi'

// Mocks
const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
}))

vi.mock('axios', () => {
  return {
    default: {
      post: vi.fn(),
      get: mocks.get,
    },
  }
})

describe('CharacterApi', () => {
  const mockCharacter: CharacterApiResponse = {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    gender: 'male',
    species: [],
    films: [],
    url: 'https://swapi.dev/api/people/1/',
  }

  const mockCharacter2: CharacterApiResponse = {
    name: 'Leia Organa',
    birth_year: '19BBY',
    gender: 'female',
    species: [],
    films: [],
    url: 'https://swapi.dev/api/people/5/',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAll', () => {
    it('should fetch all characters successfully', async () => {
      const mockResponse = {
        data: [mockCharacter, mockCharacter2],
      }

      mocks.get.mockResolvedValue(mockResponse)

      const result = await CharacterApi.getAll()

      expect(mocks.get).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResponse.data)
    })

    it('should handle API errors', async () => {
      const errorMessage = 'Network Error'
      mocks.get.mockRejectedValue(new Error(errorMessage))

      await expect(CharacterApi.getAll()).rejects.toThrow(errorMessage)
    })
  })

  describe('getById', () => {
    it('should fetch a character by id successfully', async () => {
      const characterId = '1'

      const mockResponse = {
        data: mockCharacter,
      }

      mocks.get.mockResolvedValue(mockResponse)
      const result = await CharacterApi.getById(characterId)

      expect(mocks.get).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResponse.data)
    })

    it('should handle 404 when character is not found', async () => {
      const characterId = '999'
      const error = {
        response: {
          status: 404,
          statusText: 'Not Found',
        },
      }
      mocks.get.mockRejectedValue(error)

      await expect(CharacterApi.getById(characterId)).rejects.toEqual(error)
    })

    it('should handle network errors', async () => {
      const characterId = '1'
      const errorMessage = 'Network Error'
      mocks.get.mockRejectedValue(new Error(errorMessage))

      await expect(CharacterApi.getById(characterId)).rejects.toThrow(errorMessage)
    })
  })
})
