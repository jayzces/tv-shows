import App from '@/App.vue'
import { useShowsStore } from '@/stores/shows'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'

describe('Main App', () => {
  setActivePinia(createPinia())

  it('should render properly', () => {
    const store = useShowsStore()
    store.activeSearch = true

    let wrapper = mount(App, {
      global: {
        stubs: {
          NavHeader: true,
          SearchResults: {
            template: '<div class="search-results"></div>'
          },
          RouterView: {
            template: '<div class="router-view"></div>'
          }
        }
      }
    })

    expect(wrapper.find('.search-results').exists()).toBeTruthy()
    expect(wrapper.find('.router-view').exists()).toBeFalsy()

    store.activeSearch = false
    wrapper = mount(App, {
      global: {
        stubs: {
          NavHeader: true,
          SearchResults: {
            template: '<div class="search-results"></div>'
          },
          RouterView: {
            template: '<div class="router-view"></div>'
          }
        }
      }
    })
    expect(wrapper.find('.search-results').exists()).toBeFalsy()
    expect(wrapper.find('.router-view').exists()).toBeTruthy()
  })
})
