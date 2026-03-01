import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button, Row, Col, FormSelect } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import useImagePreview from '@/helpers/useImagePreview'
import ImagePreviewInput from '@/components/form/ImagePreviewInput'

import ComponentContainerCard from '@/components/ComponentContainerCard'
import TextFormInput from '@/components/form/TextFormInput'
import TextAreaFormInput from '@/components/form/TextAreaFormInput'
import httpClient from '@/helpers/httpClient'

import { swalConfirm, swalSuccess, swalError, swalValidationError } from '@/helpers/swal'
import Select from 'react-select'

/**
 * @param {string} mode  'create' | 'edit'
 * @param {object} project  data project (khusus edit)
 */
const ProjectForm = ({ mode = 'create', project = null }) => {
  const [skills, setSkills] = useState([])
  const [loadingSkill, setLoadingSkill] = useState(true)
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [loadingCategory, setLoadingCategory] = useState(true)

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      thumbnail: null,
      demo_url: '',
      project_category_id: '',
      skill_ids: [],
    },
  })

  const skillOptions = skills.map((skill) => ({
    value: skill.id,
    label: skill.name,
  }))

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'var(--bs-body-bg)',
      borderColor: state.isFocused ? 'var(--bs-primary)' : 'var(--bs-border-color)',
      color: 'var(--bs-body-color)',
    }),

    menu: (base) => ({
      ...base,
      backgroundColor: 'var(--bs-body-bg)',
      color: 'var(--bs-body-color)',
      border: '1px solid var(--bs-border-color)',
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? 'var(--bs-tertiary-bg)' : 'var(--bs-body-bg)',
      color: 'var(--bs-body-color)',
    }),

    multiValue: (base) => ({
      ...base,
      backgroundColor: 'var(--bs-tertiary-bg)',
    }),

    multiValueLabel: (base) => ({
      ...base,
      color: 'var(--bs-body-color)',
    }),

    input: (base) => ({
      ...base,
      color: 'var(--bs-body-color)',
    }),

    singleValue: (base) => ({
      ...base,
      color: 'var(--bs-body-color)',
    }),
  }

  /* ==============================
   * FETCH CATEGORIES & Skill
   * ============================== */

  useEffect(() => {
    fetchCategories()
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const res = await httpClient.get('admin/skills')
      setSkills(res.data?.data ?? [])
    } catch (error) {
      swalError('Error', 'Gagal mengambil data skill')
    } finally {
      setLoadingSkill(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await httpClient.get('admin/project-categories')
      setCategories(res.data?.data ?? [])
    } catch (error) {
      swalError('Error', 'Gagal mengambil data kategori')
    } finally {
      setLoadingCategory(false)
    }
  }

  /* ==============================
   * SET DATA FOR EDIT
   * ============================== */

  const thumbnailUrl = mode === 'edit' && project?.thumbnail ? `/storage/${project.thumbnail}` : null

  const { preview, onChangeImage, resetPreview } = useImagePreview(thumbnailUrl)

  useEffect(() => {
    if (mode === 'edit' && project) {
      reset({
        title: project.title ?? '',
        description: project.description ?? '',
        demo_url: project.demo_url ?? '',
        project_category_id: project.project_category_id ?? '',
        skill_ids: project.skills?.map((s) => Number(s.id)) ?? [],
        thumbnail: null,
      })

      // panggil manual tanpa dependency
      resetPreview()
    }
  }, [project?.id])

  /* ==============================
   * SUBMIT FORM
   * ============================== */
  const onSubmit = async (data) => {
    // 🔔 CONFIRM
    const confirm = await swalConfirm(mode === 'edit' ? 'Perubahan akan disimpan' : 'Project baru akan ditambahkan')

    if (!confirm.isConfirmed) return

    try {
      const formData = new FormData()

      formData.append('title', data.title)
      formData.append('description', data.description)

      if (data.demo_url) formData.append('demo_url', data.demo_url)
      if (data.project_category_id) formData.append('project_category_id', data.project_category_id)
      if (data.thumbnail) formData.append('thumbnail', data.thumbnail)
      data.skill_ids?.forEach((id) => {
        formData.append('skill_ids[]', id)
      })

      if (mode === 'edit' && project) {
        formData.append('_method', 'PUT')
        await httpClient.post(`admin/projects/${project.id}`, formData)
        await swalSuccess('Berhasil', 'Project berhasil diperbarui')
      } else {
        await httpClient.post('admin/projects', formData)
        await swalSuccess('Berhasil', 'Project berhasil ditambahkan')
      }

      reset()
      navigate('/admin/projects')
    } catch (error) {
      if (error.response?.status === 422) {
        swalValidationError(error.response.data.errors)
      } else {
        swalError('Gagal', 'Terjadi kesalahan pada server')
      }
    }
  }

  return (
    <ComponentContainerCard id="project-form" title={mode === 'edit' ? 'Edit Project' : 'Create Project'} description="Form manajemen project">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          {/* TITLE */}
          <Col md={12}>
            <TextFormInput name="title" label="Project Title" control={control} containerClassName="mb-3" rules={{ required: 'Title wajib diisi' }} />
          </Col>

          {/* DESCRIPTION */}
          <Col md={12}>
            <TextAreaFormInput
              name="description"
              label="Description"
              control={control}
              rows={4}
              containerClassName="mb-3"
              rules={{ required: 'Description wajib diisi' }}
            />
          </Col>

          {/* DEMO URL */}
          <Col md={6}>
            <TextFormInput name="demo_url" label="Demo URL" control={control} placeholder="https://demo-project.test" containerClassName="mb-3" />
          </Col>

          {/* CATEGORY */}
          <Col md={6}>
            <Controller
              name="project_category_id"
              control={control}
              render={({ field }) => (
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <FormSelect {...field} disabled={loadingCategory}>
                    <option value="">-- Pilih Category --</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </FormSelect>
                </div>
              )}
            />
          </Col>

          <Col md={6}>
            <Controller
              name="skill_ids"
              control={control}
              render={({ field }) => (
                <div className="mb-3">
                  <label className="form-label">Tools</label>

                  <Select
                    isMulti
                    options={skillOptions}
                    styles={customSelectStyles}
                    classNamePrefix="react-select"
                    isLoading={loadingSkill}
                    value={skillOptions.filter((opt) => (field.value ?? []).map(Number).includes(opt.value))}
                    onChange={(selected) => field.onChange(selected ? selected.map((item) => item.value) : [])}
                  />
                </div>
              )}
            />
          </Col>

          {/* THUMBNAIL */}
          <Col md={6}>
            <ImagePreviewInput name="thumbnail" control={control} label="Thumbnail" preview={preview} onChangePreview={onChangeImage} />
          </Col>

          {/* ACTION */}
          <Col md={12} className="text-end">
            <Link to="/admin/projects" className="btn btn-secondary me-2">
              Back
            </Link>

            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : mode === 'edit' ? 'Update Project' : 'Save Project'}
            </Button>
          </Col>
        </Row>
      </form>
    </ComponentContainerCard>
  )
}

export default ProjectForm
