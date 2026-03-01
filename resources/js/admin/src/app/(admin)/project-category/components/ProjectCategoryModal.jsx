import httpClient from '@/helpers/httpClient'
import { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { swalConfirm, swalSuccess, swalError, swalValidationError } from '@/helpers/swal'

const ProjectCategoryModal = ({ show, onHide, selected, onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    slug: '',
  })

  useEffect(() => {
    if (selected) {
      setForm({
        name: selected.name,
        slug: selected.slug,
      })
    } else {
      setForm({ name: '', slug: '' })
    }
  }, [selected])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async () => {
    const confirm = await swalConfirm(selected ? 'Perubahan akan disimpan' : 'Category akan ditambahkan')

    if (!confirm.isConfirmed) return

    try {
      if (selected) {
        await httpClient.put(`admin/project-categories/${selected.id}`, form)
        swalSuccess('Berhasil', 'Category berhasil diperbarui')
      } else {
        await httpClient.post('admin/project-categories', form)
        swalSuccess('Berhasil', 'Category berhasil ditambahkan')
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
    <Modal show={show} onHide={onHide} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{selected ? 'Edit Category' : 'Create Category'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={form.name} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Slug</Form.Label>
            <Form.Control name="slug" value={form.slug} onChange={handleChange} />
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

export default ProjectCategoryModal
