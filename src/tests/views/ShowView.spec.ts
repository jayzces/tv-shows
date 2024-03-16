import { useShowsStore } from '@/stores/shows'
import type { Show } from '@/stores/types/show'
import ShowView from '@/views/ShowView.vue'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const useRoute = vi.fn()
vi.mock('vue-router', () => ({
  useRoute
}))

describe('Show View', () => {
  const mockRoutePush = vi.fn()
  const show1: Show = {
    id: 1,
    name: 'Show 1',
    genres: ['Action'],
    rating: { average: 2 },
    summary: '',
    premiered: '2024-03-15',
    language: 'English',
    banner: {
      id: 1,
      type: 'background',
      resolutions: {
        original: {
          url: 'https://'
        }
      }
    },
    image: {
      medium: 'https://',
      original: 'https://'
    }
  }
  const show2: Show = {
    id: 2,
    name: 'Show 2',
    genres: ['Action'],
    rating: { average: 2 },
    summary: '',
    premiered: '2024-03-15',
    language: 'English'
  }

  beforeEach(() => {
    setActivePinia(createPinia())
    vi.mock('vue-router', async () => ({
      RouterView: {},
      useRoute: () => ({
        params: { id: 1 }
      })
      // useRouter: () => ({
      //   push: mockRoutePush
      // })
    }))
  })

  it('should render properly', () => {
    const store = useShowsStore()
    store.shows = { 1: show1 }

    const wrapper = mount(ShowView, {
      props: { id: 1 },
      global: {
        stubs: {
          StarRating: true
        }
      }
    })

    expect(wrapper.get('.banner__image')).toBeTruthy()
    expect(wrapper.get('.poster')).toBeTruthy()
    expect(wrapper.get('.banner__text').text()).toContain('2024')
    expect(wrapper.get('h1').text()).toBe(show1.name)
  })

  it('should render conditionals', () => {
    const store = useShowsStore()
    store.shows = {
      1: {
        ...show1,
        banner: undefined,
        image: undefined,
        rating: { average: null }
      }
    }

    let wrapper = mount(ShowView, {
      props: { id: 1 },
      global: {
        stubs: {
          StarRating: true
        }
      }
    })

    expect(wrapper.find('.banner__image').exists()).toBeFalsy()
    expect(wrapper.get('.poster-placeholder')).toBeTruthy()

    wrapper = mount(ShowView, {
      props: { id: 3 },
      global: {
        stubs: {
          StarRating: true
        }
      }
    })
    expect(wrapper.text()).toBe('')
  })
})
