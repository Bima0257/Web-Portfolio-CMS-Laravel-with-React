import { useEffect, useState } from 'react'
import { Row, Col, Spinner, Button } from 'react-bootstrap'
import PageBreadcrumb from '@/components/layout/PageBreadcrumb'
import PageMetaData from '@/components/PageTitle'
import ExperienceTable from './components/ExperienceTable'
import ExperienceModal from './components/ExperienceModal'
import httpClient from '@/helpers/httpClient'

const Experience = () => {
  const [experiences, setExperience] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchExperience = async () => {
    try {
      const res = await httpClient.get('admin/experiences')
      setExperience(res.data.data ?? [])
    } catch (error) {
      console.error('FETCH PROJECT ERROR:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExperience()
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
      <PageBreadcrumb title="Experience" subName="Admin" />
      <PageMetaData title="Experience" />

      {/* 🔹 ACTION BAR */}
      <Row className="mb-3">
        <Col className="text-end">
          <Button onClick={openCreate} variant="primary">
            + Create Exeperience
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
              <ExperienceTable data={experiences} onEdit={openEdit} onReload={fetchExperience} />

              <ExperienceModal show={showModal} onHide={() => setShowModal(false)} selected={selected} onSuccess={fetchExperience} />
            </>
          )}
        </Col>
      </Row>
    </>
  )
}

export default Experience
