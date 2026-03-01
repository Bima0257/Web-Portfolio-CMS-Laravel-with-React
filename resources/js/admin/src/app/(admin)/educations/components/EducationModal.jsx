import httpClient from '@/helpers/httpClient'
import { useState, useEffect } from 'react'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap'
import { swalConfirm, swalSuccess, swalError, swalValidationError } from '@/helpers/swal'

const EducationModel = ({ show, onHide, selected, onSuccess }) => {
  const [form, setForm] = useState({
    institution: '',
    degree: '',
    field_of_study: '',
    start_year: '',
    end_year: '',
    description: '',
  })

  useEffect(() => {
    if (selected) {
      setForm({
        institution: selected.institution,
        degree: selected.degree,
        field_of_study: selected.field_of_study ?? '',
        start_year: selected.start_year,
        end_year: selected.end_year ?? '',
        description: selected.description ?? '',
      })
    } else {
      setForm({ institution: '', degree: '', field_of_study: '', start_year: '', end_year: '', description: '' })
    }
  }, [selected, show])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async () => {
    const confirm = await swalConfirm(selected ? 'Perubahan data education akan disimpan' : 'Data education akan ditambahkan')

    if (!confirm.isConfirmed) return

    try {
      if (selected) {
        await httpClient.put(`admin/educations/${selected.id}`, form)
        swalSuccess('Berhasil', 'Education berhasil diperbarui')
      } else {
        await httpClient.post('admin/educations', form)
        swalSuccess('Berhasil', 'Education berhasil ditambahkan')
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
        <Modal.Title>{selected ? 'Edit Education' : 'Create Education'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Institution</Form.Label>
            <Form.Control name="institution" value={form.institution} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Degree</Form.Label>
            <Form.Control name="degree" value={form.degree} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Field of Study</Form.Label>
            <Form.Control name="field_of_study" value={form.field_of_study} onChange={handleChange} placeholder="Optional" />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Start Year</Form.Label>
                <Form.Control type="number" name="start_year" value={form.start_year} onChange={handleChange} />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>End Year</Form.Label>
                <Form.Control
                  type="number"
                  name="end_year"
                  value={form.end_year}
                  onChange={handleChange}
                  placeholder="Kosongkan jika masih berjalan"
                />
              </Form.Group>
            </Col>
          </Row>

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

export default EducationModel
