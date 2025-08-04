import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, h } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import CharacterList from '../CharacterList.vue'
import type { Component } from 'vue'
import type { Character } from '@/domains/characters/domain/Character'
import * as ResizeObserver from 'resize-observer-polyfill'

global.ResizeObserver = ResizeObserver.default

let charactersMock: Character[]
let isLoadingMock: boolean
let searchMock: string
let filteredCharactersMock: Character[]
const goToDetailMock = vi.fn()
const VApp: Component = {
  setup(_, { slots }) {
    return () => h('div', [slots.default?.()])
  },
}

// Mocks
vi.mock('../../composables/useCharacterList', () => ({
  useCharacterList: () => ({
    characters: ref(charactersMock),
    isLoading: ref(isLoadingMock),
    search: ref(searchMock),
    filteredCharacters: ref(filteredCharactersMock || charactersMock),
    headers: ref([
      { title: 'Name', key: 'name', sortable: true },
      { title: 'Birth Year', key: 'birthYear', sortable: true },
      { title: 'Gender', key: 'gender', sortable: true },
      { title: 'Actions', key: 'actions', sortable: false, align: 'center' },
    ]),
    goToDetail: goToDetailMock,
  }),
}))

const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
})

const mountComponent = () => {
  return mount(VApp as Component, {
    global: {
      components: { CharacterList },
      plugins: [vuetify],
      stubs: {
        StyledButton: true,
      },
    },
    slots: {
      default: () => h(CharacterList),
    },
  })
}

// Tests
describe('CharacterList.vue', () => {
  beforeEach(() => {
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
    filteredCharactersMock = [...charactersMock]
    isLoadingMock = false
    searchMock = ''
    vi.clearAllMocks()
  })

  it('should display loading state when data is loading', () => {
    isLoadingMock = true
    const wrapper = mountComponent()
    expect(wrapper.findComponent({ name: 'v-progress-circular' }).exists()).toBe(true)
  })

  it('should display characters in the data table when loaded', async () => {
    const wrapper = mountComponent()
    await wrapper.vm.$nextTick()

    // Check if the table contains the character names
    expect(wrapper.text()).toContain('Luke Skywalker')
    expect(wrapper.text()).toContain('Darth Vader')

    // Check if the table headers are rendered
    expect(wrapper.text()).toContain('Name')
    expect(wrapper.text()).toContain('Birth Year')
    expect(wrapper.text()).toContain('Gender')
  })

  it('should display search input', () => {
    const wrapper = mountComponent()
    const searchInput = wrapper.find('input[type="text"]')
    expect(searchInput.exists()).toBe(true)
  })

  it('should display "No characters found" when no characters match the search', async () => {
    searchMock = 'non-existent-character'
    filteredCharactersMock = []

    const wrapper = mountComponent()
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('No characters found')
  })
})
