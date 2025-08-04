import { describe, it, expect, vi } from 'vitest'
import { GetCharacterById } from '../GetCharacterById'
import type { CharacterRepository } from '../../domain/CharacterRepository'
import type { Character } from '../../domain/Character'

describe('GetCharacterById', () => {
  it('should get a character by id from repository', async () => {
    const mockCharacter: Character = {
      id: '1',
      name: 'Luke Skywalker',
      birthYear: '19BBY',
      gender: 'Male',
      species: [],
      films: [],
    }

    const mockCharacterRepository: CharacterRepository = {
      getById: vi.fn().mockResolvedValue(mockCharacter),
      getAll: vi.fn(),
    }

    const getCharacterById = new GetCharacterById(mockCharacterRepository)
    const characterId = '1'

    const result = await getCharacterById.execute(characterId)

    expect(mockCharacterRepository.getById).toHaveBeenCalledTimes(1)
    expect(mockCharacterRepository.getById).toHaveBeenCalledWith(characterId)
    expect(result).toEqual(mockCharacter)
  })

  it('should return null when character is not found', async () => {
    const mockCharacterRepository: CharacterRepository = {
      getById: vi.fn().mockResolvedValue(null),
      getAll: vi.fn(),
    }

    const getCharacterById = new GetCharacterById(mockCharacterRepository)
    const nonExistentId = '999'

    const result = await getCharacterById.execute(nonExistentId)

    expect(mockCharacterRepository.getById).toHaveBeenCalledTimes(1)
    expect(mockCharacterRepository.getById).toHaveBeenCalledWith(nonExistentId)
    expect(result).toBeNull()
  })

  it('should handle repository errors', async () => {
    const errorMessage = 'Error fetching character'
    const mockCharacterRepository: CharacterRepository = {
      getById: vi.fn().mockRejectedValue(new Error(errorMessage)),
      getAll: vi.fn(),
    }

    const getCharacterById = new GetCharacterById(mockCharacterRepository)
    const characterId = '1'

    await expect(getCharacterById.execute(characterId)).rejects.toThrow(errorMessage)
    expect(mockCharacterRepository.getById).toHaveBeenCalledTimes(1)
    expect(mockCharacterRepository.getById).toHaveBeenCalledWith(characterId)
  })
})
