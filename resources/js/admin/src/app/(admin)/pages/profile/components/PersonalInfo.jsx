import { Card, CardBody, CardHeader, CardTitle, Spinner, Button } from 'react-bootstrap'
import httpClient from '@/helpers/httpClient'
import { useEffect, useState } from 'react'

const PersonalInfo = () => {
  const [about, setAbout] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const fetchAbout = async () => {
    try {
      const res = await httpClient.get('admin/abouts')
      setAbout(res.data.data)
    } catch (error) {
      console.error('Failed to load about data', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAbout()
  }, [])

  useEffect(() => {
    if (about) {
      setForm(about)
    }
  }, [about])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    try {
      setSaving(true)

      const payload = {
        name: form.name,
        expertise: form.expertise,
        age: Number(form.age),
        experience: Number(form.experience),
      }

      const res = await httpClient.put('admin/about/update', payload)

      setAbout(res.data.data)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update data', error.response?.data)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setForm(about)
    setIsEditing(false)
  }

  const renderRow = (label, name, type = 'text', unit = '') => (
    <li className="list-group-item border-0 border-bottom px-0">
      <div className="d-flex align-items-center">
        <div className="fw-medium" style={{ width: 120 }}>
          {label}
        </div>
        <div className="me-2">:</div>

        <div className="flex-grow-1">
          {isEditing ? (
            <input
              type={type}
              name={name}
              value={form[name] ?? ''}
              onChange={handleChange}
              className={`form-control form-control-sm ${type === 'number' ? 'w-25' : 'w-50'}`}
            />
          ) : (
            <span className="fs-14 text-muted">
              {about[name]} {unit}
            </span>
          )}
        </div>
      </div>
    </li>
  )

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle as="h5" className="mb-0">
          Personal Info
        </CardTitle>

        {!loading && about && (
          <Button size="sm" variant={isEditing ? 'secondary' : 'outline-primary'} onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}>
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        )}
      </CardHeader>

      <CardBody>
        {loading && (
          <div className="text-center py-3">
            <Spinner animation="border" size="sm" />
          </div>
        )}

        {!loading && about && (
          <>
            <ul className="list-group">
              {renderRow('Name', 'name')}
              {renderRow('Expertise', 'expertise')}
              {renderRow('Age', 'age', 'number', 'Year')}
              {renderRow('Experience', 'experience', 'number', 'Years')}
            </ul>

            {isEditing && (
              <div className="mt-3 d-flex gap-2">
                <Button size="sm" variant="primary" onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : 'Save'}
                </Button>
                <Button size="sm" variant="light" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            )}
          </>
        )}
      </CardBody>
    </Card>
  )
}
export default PersonalInfo
