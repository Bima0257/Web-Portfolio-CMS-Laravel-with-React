import { useEffect, useState } from 'react'
import { Row, Col, Spinner, Button } from 'react-bootstrap'
import PageBreadcrumb from '@/components/layout/PageBreadcrumb'
import PageMetaData from '@/components/PageTitle'
import SocialTable from './components/SocialTable'
import SocialModal from './components/SocialModal'
import httpClient from '@/helpers/httpClient'

const Social = () => {
  const [socials, setSocial] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchSocial = async () => {
    try {
      const res = await httpClient.get('admin/social-links')
      setSocial(res.data.data ?? [])
    } catch (error) {
      console.error('FETCH PROJECT ERROR:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSocial()
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
      <PageBreadcrumb title="Social Link" subName="Admin" />
      <PageMetaData title="Social Link" />

      {/* 🔹 ACTION BAR */}
      <Row className="mb-3">
        <Col className="text-end">
          <Button onClick={openCreate} variant="primary">
            + Create Social
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
              <SocialTable data={socials} onEdit={openEdit} onReload={fetchSocial} />

              <SocialModal show={showModal} onHide={() => setShowModal(false)} selected={selected} onSuccess={fetchSocial} />
            </>
          )}
        </Col>
      </Row>
    </>
  )
}

export default Social
