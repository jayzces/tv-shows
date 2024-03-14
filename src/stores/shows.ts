import type { Show } from './types/show'
import { defineStore } from 'pinia'

const baseUrl = 'https://api.tvmaze.com'

interface ShowsState {
  shows: {
    [key: number | string]: Show | undefined
  }
  showsByGenre: {
    [key: string]: (number | string)[]
  }
  page: number
}

export const useShowsStore = defineStore('shows', {
  state: (): ShowsState => ({
    page: 1,
    shows: {}, // list of all shows
    showsByGenre: {} // list of shows by genre
  }),
  actions: {
    async getNextShowsByGenre() {
      this.getShowsByPage(this.page + 1)
    },
    async getShow(id: number | string) {
      return fetch(`${baseUrl}/shows/${id}`)
        .then((response) => response.json())
        .then((show: Show) => {
          this.saveShowAndMap(show)
          return show
        })
        .catch((err: any) => {
          console.error(err)
          return undefined
        })
    },
    async getShowsByPage(page = 1) {
      this.page = page
      return fetch(`${baseUrl}/shows?page=${page}`)
        .then((response) => response.json())
        .then((data: Show[]) => {
          for (const show of data) {
            this.saveShowAndMap(show)
          }
          return data
        })
    },
    saveShowAndMap(show: Show) {
      // save show details to store
      this.shows[show.id] = show

      // map show genre to store
      for (const genre of show.genres) {
        if (this.showsByGenre[genre] && !this.showsByGenre[genre].includes(show.id)) {
          this.showsByGenre[genre].push(show.id)
        } else if (!this.showsByGenre[genre]) {
          this.showsByGenre[genre] = [show.id]
        }
      }
    }
  },
  getters: {
    // get 5 most popular shows by average rating
    mostPopularShows() {
      return (genre: string) => {
        if (!this.showsByGenre[genre]) return []

        const shows = this.showsByGenre[genre]
          .map((id) => this.showById(id))
          .filter((s) => !!s) as Show[]
        return shows
          .sort((a, b) => {
            if (a.rating.average > b.rating.average) return -1
            if (a.rating.average < b.rating.average) return 1
            return 0
          })
          .slice(0, 5)
      }
    },
    showById() {
      return (id: number | string): Show | undefined => this.shows[id]
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
