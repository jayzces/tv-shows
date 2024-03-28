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
    [key: string]: Set<number>
  }
  activeSearch: boolean
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
    page: 0,
    shows: {}, // list of all shows
    showsByGenre: {}, // list of shows by genre
    activeSearch: false
  }),
  actions: {
    async clearSearch() {
      this.filteredShows = []
      this.activeSearch = false
    },
    async getFilteredShows(query: string) {
      this.activeSearch = true
      this.isLoading = true
      return fetch(`${baseUrl}/search/shows?q=${query}`)
        .then((response) => response.json())
        .then((data: SearchResult[]) => {
          this.filteredShows = []
          // save all shows regardless of score
          data.forEach((sr) => {
            this.filteredShows.push(sr.show.id)
            this.saveShowAndMap(sr.show)
          })

          this.isLoading = false
          return data
        })
    },
    async getNextShows() {
      return this.getShowsByPage(this.page + 1)
    },
    async getShow(id: number | string) {
      // check if we already have the show
      const show = this.showById(id)

      if (show) return this.getShowImages(id)

      return fetch(`${baseUrl}/shows/${id}`)
        .then((response) => response.json())
        .then(async (show: Show) => {
          this.saveShowAndMap(show)
          return this.getShowImages(id)
        })
        .catch(errorHandler)
    },
    async getShowsByPage(page = 1) {
      if (page === this.page) return Promise.resolve([])

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
    async getShowImages(id: number | string) {
      // check if show already has saved images
      const show = this.showById(id)
      if (!show || show.banner) return Promise.resolve(undefined)

      return fetch(`${baseUrl}/shows/${id}/images`)
        .then((response) => response.json())
        .then((data: ShowImage[]) => {
          // find first banner
          const banner = data.find((d) => d.type === 'background')
          if (banner) this.shows[id].banner = banner
          return this.shows[id]
        })
    },
    saveShowAndMap(show: Show) {
      // save show details to store
      this.shows[show.id] = show

      // map show genre to store
      for (const genre of show.genres) {
        // instead of checking if list has id, just use a set
        if (this.showsByGenre[genre]) this.showsByGenre[genre].add(show.id)
        else this.showsByGenre[genre] = new Set([show.id])
      }
    }
  },
  getters: {
    genresList(): string[] {
      return Object.keys(this.showsByGenre)
    },
    sortedShowsByRating() {
      return (genre: string) => {
        if (!this.showsByGenre[genre]) return []

        const shows = Array.from(this.showsByGenre[genre])
          .map((id) => this.showById(id))
          .filter((s) => !!s) as Show[]
        return shows.sort((a, b) => {
          if (a.rating.average > b.rating.average) return -1
          if (a.rating.average < b.rating.average) return 1
          return 0
        })
      }
    },
    // get 5 most popular shows by average rating
    mostPopularShows() {
      return (genre: string) => this.sortedShowsByRating(genre).slice(0, 5)
    },
    queriedShows(): Show[] {
      return this.filteredShows.map((s) => this.showById(s)).filter((s) => !!s) as Show[]
    },
    showById() {
      return (id: number | string): Show | undefined => this.shows[id]
    }
  }
})
