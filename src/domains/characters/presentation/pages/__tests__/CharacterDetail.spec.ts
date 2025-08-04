import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import CharacterDetail from '../CharacterDetail.vue'
import type { Character } from '@/domains/characters/domain/Character'

let characterMock: Character
let isLoadingMock: boolean

// Mocks
vi.mock('../../composables/useCharacterDetails', () => ({
  useCharacterDetail: () => ({
    character: ref(characterMock),
    isLoading: ref(isLoadingMock),
    error: null,
  }),
}))

// Tests
describe('CharacterDetail.vue', () => {
  beforeEach(() => {
    characterMock = {
      id: '',
      name: '',
      birthYear: '',
      gender: '',
      species: [''],
      films: [''],
    }
    isLoadingMock = true
  })

  it('debería mostrar el mensaje de carga inicialmente', () => {
    const wrapper = mount(CharacterDetail)
    expect(wrapper.text()).toContain('Loading character...')
  })

  it('debería renderizar los datos de un personaje', () => {
    characterMock = {
      id: 'mock.id',
      name: 'mock.name',
      birthYear: 'mock.birthYear',
      gender: 'mock.gender',
      species: ['mock.url'],
      films: ['mock.url'],
    }
    isLoadingMock = false
    const wrapper = mount(CharacterDetail)
    expect(wrapper.text()).toContain(characterMock.name)
    expect(wrapper.text()).toContain(characterMock.birthYear)
    expect(wrapper.text()).toContain(characterMock.gender)
  })
})
