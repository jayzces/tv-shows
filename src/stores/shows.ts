import type { Show } from './types/show'
import { defineStore } from 'pinia'

const baseUrl = 'https://api.tvmaze.com'

interface ShowsState {
  shows: {
    [key: string]: Show | {}
  }
  page: number
}

export const useShowsStore = defineStore('shows', {
  state: (): ShowsState => ({
    page: 1,
    shows: {}
  }),
  actions: {
    async getNextShowsByGenre() {
      this.getShowsByPage(this.page + 1)
    },
    async getShowsByPage(page = 1) {
      this.page = page
      fetch(`${baseUrl}/shows?page=${page}`)
        .then((response) => response.json())
        .then((data: Show[]) => {
          for (const show of data) {
            for (const genre of show.genres) {
              this.shows[genre] = {
                ...this.shows[genre],
                [show.id]: show
              }
            }
          }
        })
    }
  },
  getters: {
    // get 5 most popular shows by average rating
    mostPopularShows() {
      return (genre: string) => {
        const shows: Show[] = Object.values(this.shows[genre] || {})
        return shows
          .sort((a, b) => {
            if (a.rating.average > b.rating.average) return -1
            if (a.rating.average < b.rating.average) return 1
            return 0
          })
          .slice(0, 5)
      }
    }
  }
})

/**
 * Notes
 * - API does not have a genre filter,
 *   - get initial data of shows, map to an object by genre
 *   - if user scrolls to genre with no shows, less than 5? shows, query more shows? remap
 *     - continue querying
 */
