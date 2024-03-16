import ShowTile from '@/components/ShowTile.vue'
import { config, mount } from '@vue/test-utils'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Show Tile', () => {
  beforeAll(() => {
    config.global.renderStubDefaultSlot = true
  })

  afterAll(() => {
    config.global.renderStubDefaultSlot = false
  })

  it('should render properly', () => {
    const wrapper = mount(ShowTile, {
      props: {
        show: {
          id: 1,
          name: 'Show 1',
          genres: ['Action'],
          rating: { average: 2 },
          summary: '',
          premiered: '2024-03-15',
          language: 'English'
        }
      },
      global: {
        stubs: {
          RouterLink: true
        }
      },
      slots: {
        default: 'Default'
      }
    })

    expect(wrapper.get('.show__image-placeholder')).toBeTruthy()
    expect(wrapper.get('h4').text()).toBe('Show 1')
    expect(wrapper.get('.show__rating').text()).toBe('Rating 2')
  })

  it('should render conditionals', () => {
    const wrapper = mount(ShowTile, {
      props: {
        show: {
          id: 1,
          name: 'Show 1',
          image: {
            original: '',
            medium: ''
          },
          genres: ['Action'],
          rating: { average: null },
          summary: '',
          premiered: '2024-03-15',
          language: 'English'
        }
      },
      global: {
        stubs: {
          RouterLink: true
        }
      }
    })

    expect(wrapper.get('.show__image')).toBeTruthy()
    expect(wrapper.get('.show__rating').text()).toBe('No Rating')
  })
})
