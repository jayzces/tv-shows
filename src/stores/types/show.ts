export interface Show {
  id: number
  name: string
  genres: string[]
  rating: {
    average: any
  }
  image: {
    medium: string
  }
  summary: string // html
}
