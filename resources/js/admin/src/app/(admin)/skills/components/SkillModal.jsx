import httpClient from '@/helpers/httpClient'
import { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { swalConfirm, swalSuccess, swalError, swalValidationError } from '@/helpers/swal'

const SkillModal = ({ show, onHide, selected, onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    level: 'Beginner',
    icon: '',
  })

  useEffect(() => {
    if (selected) {
      setForm({
        name: selected.name ?? '',
        level: selected.level ?? 'Beginner',
        icon: selected.icon ?? '',
      })
    } else {
      setForm({
        name: '',
        level: 'Beginner',
        icon: '',
      })
    }
  }, [selected, show])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const confirm = await swalConfirm(selected ? 'Perubahan data skill akan disimpan' : 'Data skill akan ditambahkan')

    if (!confirm.isConfirmed) return

    try {
      if (selected) {
        await httpClient.put(`admin/skills/${selected.id}`, form)
        swalSuccess('Berhasil', 'Skill berhasil diperbarui')
      } else {
        await httpClient.post('admin/skills', form)
        swalSuccess('Berhasil', 'Skill berhasil ditambahkan')
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
        <Modal.Title>{selected ? 'Edit Skill' : 'Create Skill'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* NAME */}
          <Form.Group className="mb-3">
            <Form.Label>Skill Name</Form.Label>
            <Form.Control name="name" value={form.name} onChange={handleChange} placeholder="Contoh: Laravel, React, MySQL" />
          </Form.Group>

          {/* LEVEL */}
          <Form.Group className="mb-3">
            <Form.Label>Level</Form.Label>
            <Form.Select name="level" value={form.level} onChange={handleChange}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </Form.Select>
          </Form.Group>

          {/* ICON */}
          <Form.Group className="mb-3">
            <Form.Label>Icon (optional)</Form.Label>
            <Form.Control name="icon" value={form.icon} onChange={handleChange} placeholder="fa-brands fa-laravel / devicon-react-original" />
            <small className="text-muted">Bisa class FontAwesome / Devicon</small>
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
