import type { ShowImage } from './showImage'

export interface Show {
  id: number
  name: string
  genres: string[]
  rating: {
    average: any
  }
  image?: {
    medium: string
    original: string
  }
  summary: string // html
  premiered: string // date
  language: string
  banner?: ShowImage
}
