import { describe, it, expect } from 'vitest'
import { CharacterApiMapper } from '../CharacterApiMapper'
import type { CharacterApiResponse } from '../../infrastructure/CharacterApi'

describe('CharacterApiMapper', () => {
  const mockApiCharacter: CharacterApiResponse = {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    gender: 'male',
    species: ['https://swapi.dev/api/species/1/'],
    films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/2/'],
    url: 'https://swapi.dev/api/people/1/',
  }

  it('should map API response to domain character correctly', () => {
    const result = CharacterApiMapper.toDomain(mockApiCharacter)

    expect(result).toEqual({
      id: '1',
      name: 'Luke Skywalker',
      birthYear: '19BBY',
      gender: 'male',
      species: ['1'],
      films: ['1', '2'],
    })
  })

  it('should extract ID from URL correctly', () => {
    const result = CharacterApiMapper.toDomain({
      ...mockApiCharacter,
      url: 'https://swapi.dev/api/people/42/',
    })

    expect(result.id).toBe('42')
  })

  it('should handle URL with trailing slash', () => {
    const result = CharacterApiMapper.toDomain({
      ...mockApiCharacter,
      url: 'https://swapi.dev/api/people/42',
    })

    expect(result.id).toBe('42')
  })
})
