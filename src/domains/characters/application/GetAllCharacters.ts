import type { CharacterRepository } from '../domain/CharacterRepository'
import type { Character } from '../domain/Character'

export class GetAllCharacters {
  constructor(private characterRepository: CharacterRepository) {}

  async execute(): Promise<Character[]> {
    return this.characterRepository.getAll()
  }
}
