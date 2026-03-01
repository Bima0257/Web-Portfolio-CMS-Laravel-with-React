import httpClient from '@/helpers/httpClient'
import { useState, useEffect } from 'react'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap'
import { swalConfirm, swalSuccess, swalError, swalValidationError } from '@/helpers/swal'

const ExperienceModal = ({ show, onHide, selected, onSuccess }) => {
  const [form, setForm] = useState({
    position: '',
    company: '',
    start_date: '',
    end_date: '',
    is_current: false,
    description: '',
    url: '',
  })

  useEffect(() => {
    if (selected) {
      setForm({
        position: selected.position ?? '',
        company: selected.company ?? '',
        start_date: selected.start_date ?? '',
        end_date: selected.end_date ?? '',
        is_current: selected.is_current ?? false,
        description: selected.description ?? '',
        url: selected.url ?? '',
      })
    } else {
      setForm({
        position: '',
        company: '',
        start_date: '',
        end_date: '',
        is_current: false,
        description: '',
        url: '',
      })
    }
  }, [selected, show])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async () => {
    const confirm = await swalConfirm(selected ? 'Perubahan data experience akan disimpan' : 'Data experience akan ditambahkan')

    if (!confirm.isConfirmed) return

    try {
      if (selected) {
        await httpClient.put(`admin/experiences/${selected.id}`, form)
        swalSuccess('Berhasil', 'Experience berhasil diperbarui')
      } else {
        await httpClient.post('admin/experiences', form)
        swalSuccess('Berhasil', 'Experience berhasil ditambahkan')
      }

      onHide()
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error(error)

      if (error.response?.status === 422) {
        swalValidationError(error.response.data.errors)
        return
      }

      swalError('Gagal', error.response?.data?.message || 'Terjadi kesalahan')
    }
  }

  return (
    <Modal show={show} onHide={onHide} backdrop="static" size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{selected ? 'Edit Experience' : 'Create Experience'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Position</Form.Label>
            <Form.Control name="position" value={form.position} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Company</Form.Label>
            <Form.Control name="company" value={form.company} onChange={handleChange} />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" name="start_date" value={form.start_date} onChange={handleChange} />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" name="end_date" value={form.end_date} onChange={handleChange} disabled={form.is_current} />
              </Form.Group>
            </Col>
          </Row>

          {/* DEMO URL */}
          <Form.Group className="mb-3">
            <Form.Label>URL</Form.Label>
            <Form.Control name="url" value={form.url} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Position</Form.Label>
            <Form.Check type="checkbox" label="Masih bekerja di sini" name="is_current" checked={form.is_current} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ExperienceModal
