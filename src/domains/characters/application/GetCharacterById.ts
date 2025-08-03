import type { CharacterRepository } from '../domain/CharacterRepository'
import type { Character } from '../domain/Character'

export class GetCharacterById {
  constructor(private characterRepository: CharacterRepository) {}

  async execute(id: string): Promise<Character | null> {
    return this.characterRepository.getById(id)
  }
}
