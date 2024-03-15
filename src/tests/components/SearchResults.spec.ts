import SearchResults from '@/components/SearchResults.vue'
import { useShowsStore } from '@/stores/shows'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'

describe('Search Results', () => {
  setActivePinia(createPinia())

  it('should render 2 shows', () => {
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
      }
    }
    store.filteredShows = [2, 1]

    const wrapper = mount(SearchResults, {
      global: {
        stubs: {
          ShowList: {
            template: '<div class="show"></div>',
            props: ['prefix']
          }
        }
      }
    })

    expect(wrapper.text()).toContain('2 found')
  })
})
