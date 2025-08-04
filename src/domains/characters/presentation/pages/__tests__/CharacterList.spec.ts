import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import CharacterList from '../CharacterList.vue'
import type { Character } from '@/domains/characters/domain/Character'

let charactersMock: Character[]
let isLoadingMock: boolean

// Mocks
vi.mock('../../composables/useCharacterList', () => ({
  useCharacterList: () => ({
    characters: ref(charactersMock),
    isLoading: ref(isLoadingMock),
    goToDetail: vi.fn(),
  }),
}))

// Tests
describe('CharacterList.vue', () => {
  beforeEach(() => {
    charactersMock = []
    isLoadingMock = true
  })

  it('debería mostrar el mensaje de carga inicialmente', () => {
    const wrapper = mount(CharacterList)
    expect(wrapper.text()).toContain('Loading characters...')
  })

  it('debería renderizar los datos de los personajes cuando se carguen', () => {
    charactersMock = [
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
        name: 'Darth Vader',
        birthYear: '41BBY',
        gender: 'Male',
        species: [],
        films: [],
      },
    ]
    isLoadingMock = false

    const wrapper = mount(CharacterList)

    expect(wrapper.text()).toContain('Luke Skywalker')
    expect(wrapper.text()).toContain('Darth Vader')
  })
})
