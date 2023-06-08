import { AxiosRequestConfig } from 'axios'
import { apiRequest } from './requestConfig'

export const searchMovies = (
  searchTerm: string,
  page: string
): Promise<any> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: `/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=${page}&sort_by=vote_average.desc`
  }

  return apiRequest<any>(config)
}
