import type { CharacterApiResponse } from '../infrastructure/CharacterApi'
import type { Character } from '../domain/Character'

function extractIdFromUrl(url: string): string {
  const parts = url.split('/')
  return parts[parts.length - 1] || parts[parts.length - 2]
}

export const CharacterApiMapper = {
  toDomain(apiCharacter: CharacterApiResponse): Character {
    return {
      id: extractIdFromUrl(apiCharacter.url),
      name: apiCharacter.name,
      birthYear: apiCharacter.birth_year,
      gender: apiCharacter.gender,
      species: apiCharacter.species.map(extractIdFromUrl),
      films: apiCharacter.films.map(extractIdFromUrl),
    }
  },
}
