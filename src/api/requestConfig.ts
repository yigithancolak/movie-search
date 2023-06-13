import axios, { AxiosRequestConfig } from 'axios'
import {
  moviedbAccessToken,
  moviedbBaseUrl
} from '../utils/constants/envVariables'

const api = axios.create({
  baseURL: moviedbBaseUrl,
  timeout: 2000
})

export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  api.defaults.headers.common['Authorization'] = `Bearer ${moviedbAccessToken}`
  api.defaults.headers.common['Accept'] = 'application/json'

  try {
    const response = await api(config)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
