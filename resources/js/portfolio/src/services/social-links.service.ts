import http from '@portfolio/helpers/http'

export const getSocialLinks = () => {
  return http.get('/social-links')
}
