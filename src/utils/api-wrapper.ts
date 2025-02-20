import axios from 'axios'
import { getApiBaseUrl } from './api-get-base-url'

const apiBaseUrl = getApiBaseUrl()

const API = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: false,
  timeout: 30000,
})

export default API
