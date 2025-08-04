import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useSelectedCharacterStore } from '../SelectedCharacter'
import type { Character } from '@/domains/characters/domain/Character'

describe('SelectedCharacter Store', () => {
  let store: ReturnType<typeof useSelectedCharacterStore>

  const mockCharacter: Character = {
    id: '1',
    name: 'Luke Skywalker',
    birthYear: '19BBY',
    gender: 'Male',
    species: [],
    films: [],
  }

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useSelectedCharacterStore()
  })

  it('should initialize with null selected character', () => {
    expect(store.selectedCharacter).toBeNull()
  })

  it('should set a selected character', () => {
    store.setSelectedCharacter(mockCharacter)
    expect(store.selectedCharacter).toEqual(mockCharacter)
  })

  it('should clear the selected character', () => {
    store.setSelectedCharacter(mockCharacter)
    expect(store.selectedCharacter).toEqual(mockCharacter)

    store.clearSelectedCharacter()
    expect(store.selectedCharacter).toBeNull()
  })

  it('should replace the selected character when setting a new one', () => {
    const anotherCharacter: Character = {
      id: '2',
      name: 'Darth Vader',
      birthYear: '41.9BBY',
      gender: 'Male',
      species: [],
      films: [],
    }

    store.setSelectedCharacter(mockCharacter)
    expect(store.selectedCharacter).toEqual(mockCharacter)

    store.setSelectedCharacter(anotherCharacter)
    expect(store.selectedCharacter).toEqual(anotherCharacter)
    expect(store.selectedCharacter).not.toEqual(mockCharacter)
  })
})
