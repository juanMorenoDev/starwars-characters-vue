import type { CharacterRepository } from '../domain/CharacterRepository'
import { Character } from '../domain/Character'
import { CharacterApi } from '../infrastructure/CharacterApi'
import { CharacterApiMapper } from './CharacterApiMapper'

export class CharacterRepositoryHttp implements CharacterRepository {
  async getAll(): Promise<Character[]> {
    const apiCharacters = await CharacterApi.getAll()
    return apiCharacters.map(CharacterApiMapper.toDomain)
  }
}
