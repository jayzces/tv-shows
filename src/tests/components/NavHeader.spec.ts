import NavHeader from '@/components/NavHeader.vue'
import { useShowsStore } from '@/stores/shows'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('Nav Header', () => {
  const mockFetch = (data: any): Promise<any> =>
    new Promise((resolve) =>
      resolve({
        json: () => new Promise((r) => r(data))
      })
    )

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should submit query', () => {
    const wrapper = mount(NavHeader, {
      global: {
        stubs: {
          RouterLink: true
        }
      }
    })
    const store = useShowsStore()
    const spy = vi.spyOn(store, 'getFilteredShows').mockImplementationOnce(() => mockFetch([]))
    const searchField = wrapper.get('.search-field')

    // @ts-ignore
    searchField.element.value = 'testing'
    searchField.trigger('input')
    wrapper.get('form').trigger('submit')

    expect(spy).toHaveBeenCalledWith('testing')
  })

  it('should reset search', () => {
    const wrapper = mount(NavHeader, {
      global: {
        stubs: {
          RouterLink: true
        }
      }
    })
    const store = useShowsStore()
    const spy = vi.spyOn(store, 'clearSearch')
    const searchField = wrapper.get('.search-field')

    // @ts-ignore
    searchField.element.value = 'testing'
    searchField.trigger('input')
    // @ts-ignore
    expect(wrapper.vm.query).toBe('testing')

    wrapper.get('.clear-button').trigger('click')
    // @ts-ignore
    expect(wrapper.vm.query).toBe('')
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should toggle search and focus input', () => {
    const wrapper = mount(NavHeader, {
      global: {
        stubs: {
          RouterLink: true
        }
      }
    })
    // @ts-ignore
    const spy = vi.spyOn(wrapper.vm.inputField, 'focus')

    wrapper.get('.search-button').trigger('click')
    // @ts-ignore
    expect(wrapper.vm.expandSearch).toBeTruthy()
    expect(spy).toHaveBeenCalledOnce()
  })
})
