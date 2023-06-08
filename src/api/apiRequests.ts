import { AxiosRequestConfig } from 'axios'
import { apiRequest } from './requestConfig'

export const searchMovies = (
  searchTerm: string,
  page: string
): Promise<any> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: `/search/movie?query=${searchTerm}&language=en-US&page=${page}`
  }

  return apiRequest<any>(config)
}
