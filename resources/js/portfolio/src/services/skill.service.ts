import http from '@portfolio/helpers/http'

export const getSkills = () => {
  return http.get('/skills')
}
