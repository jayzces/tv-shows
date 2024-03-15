import { useShowsStore } from '@/stores/shows'
import type { Show } from '@/stores/types/show'
import type { ShowImage } from '@/stores/types/showImage'
import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('Shows Store', () => {
  const show1: Show = {
    id: 1,
    name: 'Show 1',
    genres: ['Action'],
    rating: { average: 2 },
    summary: '',
    premiered: '2024-03-15',
    language: 'English'
  }
  const show2: Show = {
    id: 2,
    name: 'Show 2',
    genres: ['Action'],
    rating: { average: 3 },
    summary: '',
    premiered: '2024-03-15',
    language: 'English'
  }
  const show3: Show = {
    id: 3,
    name: 'Show 3',
    genres: ['Action'],
    rating: { average: 3 },
    summary: '',
    premiered: '2024-03-15',
    language: 'English'
  }
  const showImage1: ShowImage = {
    id: 1,
    type: 'background',
    resolutions: {
      original: { url: 'http://' }
    }
  }

  const mockFetch = (data: any): Promise<any> =>
    new Promise((resolve) =>
      resolve({
        json: () => new Promise((r) => r(data))
      })
    )

  beforeEach(() => {
    setActivePinia(createPinia())
    global.fetch = vi.fn().mockImplementation(() => mockFetch([]))
  })

  describe('Actions', () => {
    it('clearing filtered array', () => {
      const store = useShowsStore()
      store.filteredShows = [1]
      store.clearSearch()
      expect(store.filteredShows).toEqual([])
    })

    it('gets filtered shows', async () => {
      const store = useShowsStore()

      // mock fetch response
      global.fetch = vi.fn().mockImplementationOnce(() =>
        mockFetch([
          { score: 0.9, show: show1 },
          { score: 0.7, show: show2 }
        ])
      )

      await store.getFilteredShows('testing')

      expect(store.filteredShows).toHaveLength(2)
      expect(store.shows[1].id).toEqual(show1.id)
      expect(store.showsByGenre['Action']).toHaveLength(2)
    })

    it('calls the get shows by page action', () => {
      const store = useShowsStore()
      store.page = 2
      const spy = vi.spyOn(store, 'getShowsByPage')
      store.getNextShows()

      expect(spy).toHaveBeenCalledWith(3)
    })

    it('gets show details', async () => {
      const store = useShowsStore()
      const spy = vi.spyOn(console, 'error')
      global.fetch = vi.fn().mockRejectedValueOnce('error')

      // 404
      const response = await store.getShow(1)
      expect(response).toBeFalsy()
      expect(spy).toHaveBeenCalledOnce()

      // success
      spy.mockClear()
      global.fetch = vi
        .fn()
        .mockImplementationOnce(() => mockFetch(show1))
        .mockImplementationOnce(() => mockFetch([showImage1]))
      await store.getShow(1)
      const show = store.showById(show1.id)

      expect(spy).toHaveBeenCalledTimes(0)
      expect(store.shows[1].id).toBe(show1.id)
      expect(store.showsByGenre['Action']).toHaveLength(1)
      expect(show?.banner?.id).toEqual(showImage1.id)
    })

    it('gets shows by page', async () => {
      const store = useShowsStore()

      // mock fetch response
      global.fetch = vi.fn().mockImplementationOnce(() => mockFetch([show1, show2]))

      await store.getShowsByPage(2)

      expect(store.page).toBe(2)
      expect(store.isLoading).toBe(false)
      expect(store.shows[1].id).toBe(1)
      expect(store.showsByGenre['Action']).toHaveLength(2)
    })

    it('save show and map to genre object', () => {
      const store = useShowsStore()
      store.saveShowAndMap(show1)

      expect(store.shows[1]).toEqual(show1)
      expect(store.showsByGenre['Action']).toContain(1)

      store.saveShowAndMap(show2)
      expect(store.showsByGenre['Action']).toHaveLength(2)
    })
  })

  describe('Getters', () => {
    it('returns 5 popular shows by average rating', () => {
      const store = useShowsStore()
      store.shows = {
        1: show1,
        2: show2,
        3: show3
      }
      store.showsByGenre = {
        Action: [4, 2, 1, 3]
      }

      expect(store.mostPopularShows('Drama')).toHaveLength(0)
      expect(store.mostPopularShows('Action')).toHaveLength(3)
    })

    it('returns filtered shows', () => {
      const store = useShowsStore()
      store.shows = { 1: show1 }
      store.filteredShows = [1, 2]

      expect(store.queriedShows).toHaveLength(1)
    })

    it('returns show by ID', () => {
      const store = useShowsStore()
      store.shows = { 1: show1 }

      expect(store.showById(1)).toBeTruthy()
      expect(store.showById(1)?.id).toBe(1)
      expect(store.showById(2)).toBeFalsy()
    })
  })
})
