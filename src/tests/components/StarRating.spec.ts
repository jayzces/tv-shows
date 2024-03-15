import StarRating from '@/components/StarRating.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('Star Rating', () => {
  it('should render 5 filled stars out of 10', () => {
    const wrapper = mount(StarRating, { props: { rating: 5 } })
    expect(wrapper.findAll('.fa-star')).toHaveLength(10)
    expect(wrapper.findAll('.filled')).toHaveLength(5)
    expect(wrapper.html()).toContain('title="5"')
  })

  it('should render 5 and a half filled stars out of 10', () => {
    const wrapper = mount(StarRating, { props: { rating: 5.2 } })
    expect(wrapper.findAll('.fa-star')).toHaveLength(9)
    expect(wrapper.get('.fa-star-half-stroke')).toBeTruthy()
    expect(wrapper.findAll('.filled')).toHaveLength(6)
  })

  it('should have a "No Rating" title', () => {
    const wrapper = mount(StarRating, { props: { rating: 0 } })
    expect(wrapper.html()).toContain('title="No Rating"')
  })
})
