import { Card, CardBody, CardHeader, CardTitle, Col, Badge, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import httpClient from '@/helpers/httpClient'

const Skill = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSkill = async () => {
    try {
      const res = await httpClient.get('admin/skills')
      setSkills(res.data.data)
    } catch (error) {
      console.error('Failed to load skills data', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSkill()
  }, [])

  const getLevelVariant = (level) => {
    switch (level) {
      case 'Beginner':
        return 'secondary'
      case 'Intermediate':
        return 'info'
      case 'Advanced':
        return 'primary'
      case 'Expert':
        return 'success'
      default:
        return 'dark'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle as={'h5'}>Skill</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          {loading ? (
            <Col xs={12}>
              <p>Loading...</p>
            </Col>
          ) : (
            skills.map((skill) => (
              <Col key={skill.id} xs={12} md={4} className="mb-3">
                <div className="border rounded p-2 h-100">
                  <div className="fw-semibold">{skill.name}</div>
                  <Badge bg={getLevelVariant(skill.level)}>{skill.level}</Badge>
                </div>
              </Col>
            ))
          )}
        </Row>
      </CardBody>
    </Card>
  )
}
export default Skill
