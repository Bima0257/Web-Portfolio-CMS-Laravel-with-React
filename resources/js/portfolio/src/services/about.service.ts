import http from '@portfolio/helpers/http'

export const getAbout = () => {
  return http.get('/about')
}
