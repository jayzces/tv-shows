import View404 from '../../views/404View.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('404 View', () => {
  it('should render properly', () => {
    const wrapper = mount(View404)
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.text()).toContain('404')
  })
})
