import http from '@portfolio/helpers/http'

export const getProjects = () => {
  return http.get('/projects')
}
