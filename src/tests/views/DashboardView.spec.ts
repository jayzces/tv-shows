import { useShowsStore } from '@/stores/shows'
import DashboardView from '@/views/DashboardView.vue'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Dashboard View', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should render loading', () => {
    const store = useShowsStore()
    store.isLoading = true

    const wrapper = mount(DashboardView, {
      global: {
        stubs: {
          ShowList: {
            template: '<div></div>',
            props: ['prefix']
          }
        }
      }
    })

    expect(wrapper.text()).toContain('Loading')
  })

  it('should render genres with shows', () => {
    const store = useShowsStore()
    store.shows = {
      1: {
        id: 1,
        name: 'Show 1',
        genres: ['Action'],
        rating: { average: 2 },
        summary: '',
        premiered: '2024-03-15',
        language: 'English'
      },
      2: {
        id: 2,
        name: 'Show 2',
        genres: ['Action'],
        rating: { average: 3 },
        summary: '',
        premiered: '2024-03-15',
        language: 'English'
      },
      3: {
        id: 3,
        name: 'Show 3',
        genres: ['Action'],
        rating: { average: 5 },
        summary: '',
        premiered: '2024-03-15',
        language: 'English'
      },
      4: {
        id: 4,
        name: 'Show 4',
        genres: ['Action'],
        rating: { average: 5 },
        summary: '',
        premiered: '2024-03-15',
        language: 'English'
      },
      5: {
        id: 5,
        name: 'Show 5',
        genres: ['Action'],
        rating: { average: 7 },
        summary: '',
        premiered: '2024-03-15',
        language: 'English'
      }
    }
    store.showsByGenre['Action'] = [1, 2, 3, 4, 5]

    const wrapper = mount(DashboardView, {
      global: {
        stubs: {
          ShowList: {
            template: '<div></div>',
            props: ['prefix']
          }
        }
      }
    })

    expect(wrapper.findAll('.genre-section')).toHaveLength(1)
  })
})
