import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProjectForm from '../components/ProjectForm'
import httpClient from '@/helpers/httpClient'
import { Spinner } from 'react-bootstrap'

const EditProject = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProject()
  }, [id])

  const fetchProject = async () => {
    try {
      const res = await httpClient.get(`admin/projects/${id}`)
      setProject(res.data.data)
    } catch (error) {
      console.error('FETCH PROJECT ERROR:', error)
      alert('Gagal mengambil data project')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    )
  }

  return <ProjectForm mode="edit" project={project} />
}

export default EditProject
