import type { Show } from './types/show'
import type { ShowImage } from './types/showImage'
import { defineStore } from 'pinia'

const baseUrl = 'https://api.tvmaze.com'

interface ShowsState {
  isLoading: boolean
  filteredShows: (number | string)[]
  page: number
  shows: {
    [key: number | string]: Show
  }
  showsByGenre: {
    [key: string]: (number | string)[]
  }
}

interface SearchResult {
  score: number
  show: Show
}

function errorHandler(err: any) {
  console.error(err)
  return undefined
}

export const useShowsStore = defineStore('shows', {
  state: (): ShowsState => ({
    isLoading: false,
    filteredShows: [],
    page: 1,
    shows: {}, // list of all shows
    showsByGenre: {} // list of shows by genre
  }),
  actions: {
    clearSearch() {
      this.filteredShows = []
    },
    async getFilteredShows(query: string) {
      return fetch(`${baseUrl}/search/shows?q=${query}`)
        .then((response) => response.json())
        .then((data: SearchResult[]) => {
          // save all shows regardless of score
          const shows = data.map((d) => d.show)
          this.filteredShows = shows.map((show) => show.id)
          shows.forEach((show) => this.saveShowAndMap(show))
          return data
        })
    },
    async getNextShows() {
      return this.getShowsByPage(this.page + 1)
    },
    async getShow(id: number | string) {
      return fetch(`${baseUrl}/shows/${id}`)
        .then((response) => response.json())
        .then(async (show: Show) => {
          this.saveShowAndMap(show)
          return fetch(`${baseUrl}/shows/${id}/images`)
            .then((response) => response.json())
            .then((data: ShowImage[]) => {
              // find first banner
              const banner = data.find((d) => d.type === 'background')
              if (banner) {
                this.shows[show.id].banner = banner
                show.banner = banner
              }
              return show
            })
        })
        .catch(errorHandler)
    },
    async getShowsByPage(page = 1) {
      this.page = page
      this.isLoading = true
      return fetch(`${baseUrl}/shows?page=${page}`)
        .then((response) => response.json())
        .then((data: Show[]) => {
          data.forEach((show) => this.saveShowAndMap(show))
          this.isLoading = false
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
    queriedShows(): Show[] {
      return this.filteredShows.map((s) => this.showById(s)).filter((s) => !!s) as Show[]
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
 *     - possibility to be endlessly querying for no shows
 * - error handling?
 */
