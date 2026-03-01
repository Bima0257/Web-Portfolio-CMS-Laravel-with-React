import http from '@portfolio/helpers/http'

export const getProjectCategories = () => {
  return http.get('/project-categories')
}
