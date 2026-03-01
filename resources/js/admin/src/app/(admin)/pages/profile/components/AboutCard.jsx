import IconifyIcon from '@/components/wrappers/IconifyIcon'
import small6 from '@/assets/images/small/img-6.jpg'
import avatar1 from '@/assets/images/users/avatar-1.jpg'
import { Card, CardBody, CardTitle, Col, Row, Spinner, Button, Form } from 'react-bootstrap'
import httpClient from '@/helpers/httpClient'
import { useEffect, useState } from 'react'

const AboutCard = () => {
  const [about, setAbout] = useState(null)
  const [form, setForm] = useState({
    description: '',
    photo: null,
    cv_file: null,
  })
  const [skills, setSkill] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [preview, setPreview] = useState(null)

  const fetchAbout = async () => {
    try {
      const res = await httpClient.get('admin/abouts')
      setAbout(res.data.data)
      setForm({
        description: res.data.data.description || '',
        photo: null,
        cv_file: null,
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSkill = async () => {
    try {
      const res = await httpClient.get('admin/skills')
      setSkill(res.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAbout()
    fetchSkill()
  }, [])

  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (files) {
      setForm({ ...form, [name]: files[0] })

      if (name === 'photo') {
        setPreview(URL.createObjectURL(files[0]))
      }
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = async () => {
    setSaving(true)

    try {
      const fd = new FormData()
      fd.append('description', form.description)
      fd.append('_method', 'PUT')

      if (form.photo) fd.append('photo', form.photo)
      if (form.cv_file) fd.append('cv_file', form.cv_file)

      const res = await httpClient.post('admin/about/update', fd)

      await fetchAbout()
      
      setIsEdit(false)
      setPreview(null)
    } catch (error) {
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  // loading state
  if (loading) {
    return (
      <Card>
        <div className="text-center py-4">
          <Spinner animation="border" />
        </div>
      </Card>
    )
  }

  // safety guard
  if (!about) return null

  return (
    <Card>
      {/* HEADER */}
      <div className="position-relative">
        <img src={small6} className="card-img rounded-bottom-0" height={200} />
        <img
          src={preview || about.photo_url || avatar1}
          className="avatar-lg rounded-circle position-absolute top-100 start-0 translate-middle-y ms-3 border border-light border-3"
        />
      </div>

      <CardBody className="mt-4">
        {/* TITLE */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h4 className="mb-1">{about.name}</h4>
            <p className="mb-0 text-muted">{about.expertise}</p>
          </div>

          {!isEdit ? (
            <Button size="sm" variant="outline-primary" onClick={() => setIsEdit(true)}>
              <IconifyIcon icon="mdi:pencil" className="me-1" />
              Edit
            </Button>
          ) : (
            <div className="d-flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => setIsEdit(false)}>
                Cancel
              </Button>
              <Button size="sm" variant="primary" onClick={handleSubmit} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          )}
        </div>

        {/* CONTENT */}
        {!isEdit ? (
          <>
            <CardTitle as="h5" className="badge bg-light text-secondary mb-2">
              About Me
            </CardTitle>

            <p className="text-muted">
              Hi I&apos;m {about.name}. {about.description}
            </p>

            <div className="d-flex gap-2 flex-wrap mt-2">
              {skills.map((skill) => (
                <span key={skill.id} className="badge border text-secondary">
                  {skill.name}
                </span>
              ))}
            </div>

            <div className="mt-3">
              {about.cv_url_full && (
                <a href={about.cv_url_full} rel="noopener noreferrer" className="text-primary text-decoration-underline">
                  Download CV
                </a>
              )}
            </div>
          </>
        ) : (
          <Form>
            <Row className="g-3">
              <Col md={12}>
                <Form.Label>About</Form.Label>
                <Form.Control as="textarea" rows={4} name="description" value={form.description} onChange={handleChange} />
              </Col>

              <Col md={6}>
                <Form.Label>Upload Photo</Form.Label>
                <Form.Control type="file" name="photo" accept="image/*" onChange={handleChange} />
              </Col>

              <Col md={6}>
                <Form.Label>Upload CV</Form.Label>
                <Form.Control type="file" name="cv_file" accept=".pdf,.doc,.docx" onChange={handleChange} />
              </Col>
            </Row>
          </Form>
        )}
      </CardBody>
    </Card>
  )
}
export default AboutCard
