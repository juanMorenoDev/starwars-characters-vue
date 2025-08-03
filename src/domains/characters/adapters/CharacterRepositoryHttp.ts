import type { CharacterRepository } from '../domain/CharacterRepository'
import { Character } from '../domain/Character'
import { CharacterApi } from '../infrastructure/CharacterApi'
import { CharacterApiMapper } from './CharacterApiMapper'
import axios from 'axios'

export class CharacterRepositoryHttp implements CharacterRepository {
  async getAll(): Promise<Character[]> {
    const apiCharacters = await CharacterApi.getAll()
    return apiCharacters.map(CharacterApiMapper.toDomain)
  }

  async getById(id: string): Promise<Character | null> {
    try {
      const apiCharacter = await CharacterApi.getById(id)
      return CharacterApiMapper.toDomain(apiCharacter)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // The character was not found, which is a valid business case.
        return null
      }
      // For any other error, re-throw it to be handled by the presentation layer.
      console.error('An unexpected error occurred fetching character by ID:', id, 'Error:', error)
      throw new Error('Failed to fetch character data.')
    }
  }
}
