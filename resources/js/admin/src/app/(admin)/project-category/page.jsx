import { useEffect, useState } from 'react'
import { Row, Col, Spinner, Button } from 'react-bootstrap'
import PageBreadcrumb from '@/components/layout/PageBreadcrumb'
import PageMetaData from '@/components/PageTitle'
import ProjectCategoryTable from './components/ProjectCategoryTable'
import ProjectCategoryModal from './components/ProjectCategoryModal'
import httpClient from '@/helpers/httpClient'

const ProjectCategory = () => {
  const [categories, setCategories] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchCategories = async () => {
    try {
      const res = await httpClient.get('admin/project-categories')
      setCategories(res.data.data ?? [])
    } catch (error) {
      console.error('FETCH PROJECT ERROR:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const openCreate = () => {
    setSelected(null)
    setShowModal(true)
  }

  const openEdit = (data) => {
    setSelected(data)
    setShowModal(true)
  }

  return (
    <>
      <PageBreadcrumb title="Projects" subName="Admin" />
      <PageMetaData title="Projects" />

      {/* 🔹 ACTION BAR */}
      <Row className="mb-3">
        <Col className="text-end">
          <Button onClick={openCreate} variant="primary">
            + Create Category
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
            <>
              <ProjectCategoryTable data={categories} onEdit={openEdit} onReload={fetchCategories} />

              <ProjectCategoryModal show={showModal} onHide={() => setShowModal(false)} selected={selected} onSuccess={fetchCategories} />
            </>
          )}
        </Col>
      </Row>
    </>
  )
}

export default ProjectCategory
