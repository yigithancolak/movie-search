import { AxiosRequestConfig } from 'axios'
import { apiRequest } from './requestConfig'

export interface MoviesResultsData {
  adult: boolean
  backdrop_path: string | null
  genre_ids: string[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface MoviesResponseData {
  page: number
  results: MoviesResultsData[]
  total_pages: number
  total_results: number
}

export const searchMovies = (
  searchTerm: string,
  page: number
): Promise<MoviesResponseData> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: `/search/movie?query=${searchTerm}&language=en-US&page=${page.toString()}`
  }

  return apiRequest<MoviesResponseData>(config)
}
