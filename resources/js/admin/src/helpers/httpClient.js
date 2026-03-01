import axios from 'axios'
import Cookies from 'js-cookie'

const httpClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    Accept: 'application/json',
  },
})

httpClient.interceptors.request.use((config) => {
  const session = Cookies.get('_REBACK_AUTH_KEY_')
  if (session) {
    const { token } = JSON.parse(session)
    config.headers.Authorization = `Bearer ${token}`
  }

  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
  }

  return config
})

export default httpClient
