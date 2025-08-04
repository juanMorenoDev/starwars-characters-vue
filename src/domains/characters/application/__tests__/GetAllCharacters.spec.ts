import { describe, it, expect, vi } from 'vitest'
import { GetAllCharacters } from '../GetAllCharacters'
import type { CharacterRepository } from '../../domain/CharacterRepository'
import type { Character } from '../../domain/Character'

describe('GetAllCharacters', () => {
  it('should get all characters from repository', async () => {
    const mockCharacters: Character[] = [
      {
        id: '1',
        name: 'Luke Skywalker',
        birthYear: '19BBY',
        gender: 'Male',
        species: [],
        films: [],
      },
      {
        id: '2',
        name: 'Leia Organa',
        birthYear: '19BBY',
        gender: 'Female',
        species: [],
        films: [],
      },
    ]

    const mockCharacterRepository: CharacterRepository = {
      getAll: vi.fn().mockResolvedValue(mockCharacters),
      getById: vi.fn(),
    }

    const getAllCharacters = new GetAllCharacters(mockCharacterRepository)

    const result = await getAllCharacters.execute()

    expect(mockCharacterRepository.getAll).toHaveBeenCalledTimes(1)
    expect(result).toEqual(mockCharacters)
    expect(result).toHaveLength(2)
  })

  it('should handle empty results from repository', async () => {
    const mockCharacterRepository: CharacterRepository = {
      getAll: vi.fn().mockResolvedValue([]),
      getById: vi.fn(),
    }

    const getAllCharacters = new GetAllCharacters(mockCharacterRepository)

    const result = await getAllCharacters.execute()

    expect(mockCharacterRepository.getAll).toHaveBeenCalledTimes(1)
    expect(result).toEqual([])
  })
})
