import { mount } from '@vue/test-utils'
import StarRating from '@/components/StarRating.vue'
import { describe, expect, it } from 'vitest'

describe('Star Rating', () => {
  it('should render 5 filled stars out of 10', () => {
    const wrapper = mount(StarRating, { props: { rating: 5 } })
    const stars = wrapper.findAll('.fa-star')
    const filledStars = wrapper.findAll('.filled')
    expect(stars).toHaveLength(10)
    expect(filledStars).toHaveLength(5)
  })

  it('should render 5 and a half filled stars out of 10', () => {
    const wrapper = mount(StarRating, { props: { rating: 5.2 } })
    const stars = wrapper.findAll('.fa-star')
    const halfStar = wrapper.get('.fa-star-half-stroke')
    const filledStars = wrapper.findAll('.filled')
    expect(stars).toHaveLength(9)
    expect(halfStar).toBeTruthy()
    expect(filledStars).toHaveLength(6)
  })
})
