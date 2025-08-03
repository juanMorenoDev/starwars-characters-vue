import type { CharacterApiResponse } from '../infrastructure/CharacterApi'
import type { Character } from '../domain/Character'

export const CharacterApiMapper = {
  toDomain(apiCharacter: CharacterApiResponse): Character {
    return {
      name: apiCharacter.name,
      birthYear: apiCharacter.birth_year,
      gender: apiCharacter.gender,
      species: apiCharacter.species,
      films: apiCharacter.films,
    }
  },
}
