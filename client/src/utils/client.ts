import axios, { AxiosInstance } from 'axios'
import { getDataFromLocalStorage } from '../helpers'

export const client: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  withCredentials: true
})

client.interceptors.request.use((config) => {
  const token = getDataFromLocalStorage('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
},
  (error) => {
    return Promise.reject(error)
  }
)
