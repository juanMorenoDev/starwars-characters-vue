import axios from 'axios'

export interface CharacterApiResponse {
  name: string
  birth_year: string
  gender: string
  species: string[]
  films: string[]
  // otros campos omitidos
}

export const CharacterApi = {
  async getAll(): Promise<CharacterApiResponse[]> {
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    const response = await axios.get<CharacterApiResponse[]>(`${baseUrl}/people`)
    return response.data
  },
}
