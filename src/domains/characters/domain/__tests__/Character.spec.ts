import { describe, it, expect } from 'vitest'
import { Character } from '../Character'

describe('Character', () => {
  const createCharacter = (overrides: Partial<Character> = {}) => {
    const defaults = {
      id: '1',
      name: 'Luke Skywalker',
      birthYear: '19BBY',
      gender: 'male',
      species: ['https://swapi.dev/api/species/1/'],
      films: ['https://swapi.dev/api/films/1/'],
    }

    return new Character(
      overrides.id || defaults.id,
      overrides.name || defaults.name,
      overrides.birthYear || defaults.birthYear,
      overrides.gender || defaults.gender,
      overrides.species || defaults.species,
      overrides.films || defaults.films,
    )
  }

  it('should create a character with all required properties', () => {
    const character = createCharacter()

    expect(character).toBeInstanceOf(Character)
    expect(character.id).toBe('1')
    expect(character.name).toBe('Luke Skywalker')
    expect(character.birthYear).toBe('19BBY')
    expect(character.gender).toBe('male')
    expect(character.species).toEqual(['https://swapi.dev/api/species/1/'])
    expect(character.films).toEqual(['https://swapi.dev/api/films/1/'])
  })

  it('should handle empty species and films arrays', () => {
    const character = createCharacter({
      species: [],
      films: [],
    })

    expect(character.species).toEqual([])
    expect(character.films).toEqual([])
  })
})
