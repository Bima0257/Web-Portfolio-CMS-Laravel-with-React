import http from '@portfolio/helpers/http'

export const getExperience = () => {
  return http.get('/experiences')
}
