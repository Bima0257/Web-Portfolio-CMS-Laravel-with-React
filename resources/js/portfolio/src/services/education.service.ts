import http from '@portfolio/helpers/http'

export const getEducation = () => {
  return http.get('/educations')
}
