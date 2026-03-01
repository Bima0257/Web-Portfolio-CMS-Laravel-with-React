import { useEffect, useState } from 'react'
import { Row, Col, Spinner, Button } from 'react-bootstrap'
import PageBreadcrumb from '@/components/layout/PageBreadcrumb'
import PageMetaData from '@/components/PageTitle'
import SkillTable from './components/SkillTable'
import SkillModal from './components/SkillModal'
import httpClient from '@/helpers/httpClient'

const Skill = () => {
  const [skills, setSkill] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchSkill = async () => {
    try {
      const res = await httpClient.get('admin/skills')
      setSkill(res.data.data ?? [])
    } catch (error) {
      console.error('FETCH PROJECT ERROR:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSkill()
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
      <PageBreadcrumb title="Skill" subName="Admin" />
      <PageMetaData title="Skill" />

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
              <SkillTable data={skills} onEdit={openEdit} onReload={fetchSkill} />

              <SkillModal show={showModal} onHide={() => setShowModal(false)} selected={selected} onSuccess={fetchSkill} />
            </>
          )}
        </Col>
      </Row>
    </>
  )
}

export default Skill
