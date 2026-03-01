import httpClient from '@/helpers/httpClient'
import { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { swalConfirm, swalSuccess, swalError, swalValidationError } from '@/helpers/swal'

const SkillModal = ({ show, onHide, selected, onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    url: '',
    icon: '',
  })

  useEffect(() => {
    if (selected) {
      setForm({
        name: selected.name ?? '',
        url: selected.url ?? '',
        icon: selected.icon ?? '',
      })
    } else {
      setForm({
        name: '',
        url: '',
        icon: '',
      })
    }
  }, [selected, show])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const confirm = await swalConfirm(selected ? 'Perubahan social link akan disimpan' : 'Social link akan ditambahkan')

    if (!confirm.isConfirmed) return

    try {
      if (selected) {
        await httpClient.put(`admin/social-links/${selected.id}`, form)
        swalSuccess('Berhasil', 'Social link berhasil diperbarui')
      } else {
        await httpClient.post('admin/social-links', form)
        swalSuccess('Berhasil', 'Social link berhasil ditambahkan')
      }

      onHide()
      onSuccess?.()
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
    <Modal show={show} onHide={onHide} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{selected ? 'Edit Social Link' : 'Create Social Link'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* NAME */}
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={form.name} onChange={handleChange} placeholder="Contoh: GitHub, LinkedIn, Instagram" />
          </Form.Group>

          {/* URL */}
          <Form.Group className="mb-3">
            <Form.Label>URL</Form.Label>
            <Form.Control name="url" value={form.url} onChange={handleChange} placeholder="https://github.com/username" />
          </Form.Group>

          {/* ICON */}
          <Form.Group className="mb-3">
            <Form.Label>Icon (optional)</Form.Label>
            <Form.Control name="icon" value={form.icon} onChange={handleChange} placeholder="mdi:github / fa-brands:linkedin" />
            <small className="text-muted">Gunakan Iconify icon name (disarankan)</small>
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

export default SkillModal
