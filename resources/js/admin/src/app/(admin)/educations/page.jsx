import { useEffect, useState } from 'react'
import { Row, Col, Spinner, Button } from 'react-bootstrap'
import PageBreadcrumb from '@/components/layout/PageBreadcrumb'
import PageMetaData from '@/components/PageTitle'
import EducationTable from './components/EducationTable'
import EducationModal from './components/EducationModal'
import httpClient from '@/helpers/httpClient'

const ProjectCategory = () => {
  const [categories, setCategories] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchEducation = async () => {
    try {
      const res = await httpClient.get('admin/educations')
      setCategories(res.data.data ?? [])
    } catch (error) {
      console.error('FETCH PROJECT ERROR:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEducation()
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
              <EducationTable data={categories} onEdit={openEdit} onReload={fetchEducation} />

              <EducationModal show={showModal} onHide={() => setShowModal(false)} selected={selected} onSuccess={fetchEducation} />
            </>
          )}
        </Col>
      </Row>
    </>
  )
}

export default ProjectCategory
