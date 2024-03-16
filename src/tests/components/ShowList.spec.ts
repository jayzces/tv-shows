import ShowList from '@/components/ShowList.vue'
import type { Show } from '@/stores/types/show'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('Show List', () => {
  it('should render properly', () => {
    const shows: Show[] = [
      {
        id: 1,
        name: 'Show 1',
        genres: ['Action'],
        rating: { average: 2 },
        summary: '',
        premiered: '2024-03-15',
        language: 'English'
      }
    ]

    const wrapper = mount(ShowList, {
      props: {
        shows,
        wrap: true
      },
      global: {
        stubs: {
          ShowTile: {
            template: '<div class="show"></div>'
          }
        }
      }
    })

    expect(wrapper.get('.shows-list').classes()).toContain('wrap')
    expect(wrapper.findAll('.show')).toHaveLength(1)
  })
})
