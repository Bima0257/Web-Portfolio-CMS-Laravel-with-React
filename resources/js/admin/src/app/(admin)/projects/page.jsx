import { useEffect, useState } from 'react'
import { Row, Col, Spinner, Button } from 'react-bootstrap'
import PageBreadcrumb from '@/components/layout/PageBreadcrumb'
import PageMetaData from '@/components/PageTitle'
import ProjectTable from './components/ProjectTable'
import httpClient from '@/helpers/httpClient'
import { Link } from 'react-router-dom'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await httpClient.get('admin/projects')
      setProjects(res.data.data ?? [])
    } catch (error) {
      console.error('FETCH PROJECT ERROR:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageBreadcrumb title="Projects" subName="Admin" />
      <PageMetaData title="Projects" />

      {/* 🔹 ACTION BAR */}
      <Row className="mb-3">
        <Col className="text-end">
          <Button as={Link} to="/admin/projects/create" variant="primary">
            + Create Project
          </Button>
        </Col>
      </Row>

      <Row>
        <Col xl={12}>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
            </div>
          ) : (
            <ProjectTable data={projects} onDeleted={fetchProjects} />
          )}
        </Col>
      </Row>
    </>
  )
}

export default Projects
