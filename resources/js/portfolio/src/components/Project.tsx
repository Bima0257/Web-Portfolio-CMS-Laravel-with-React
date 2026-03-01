import arrowIcon from '@portfolio/assets/images/arrow-1.png'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getProjectCategories } from '@portfolio/services/project-category.service'
import { getProjects } from '@portfolio/services/projects.service'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ProjectModal from './ProjectModal'
import type { Project, ProjectCategory } from '@portfolio/types/project'

const Project = () => {
  const [categories, setCategories] = useState<ProjectCategory[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({})

  const truncate = (text: string, max = 100) => (text.length > max ? text.slice(0, max) + '...' : text)

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }))
  }

  const handleImageError = (id: number) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }))
  }

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedProject(null)
  }

  useEffect(() => {
    const fetchData = async () => {
      const [catRes, projRes] = await Promise.all([getProjectCategories(), getProjects()])

      setCategories(catRes.data.data)
      setProjects(projRes.data.data)
    }

    fetchData()
  }, [])

  useEffect(() => {
    setLoadedImages({})
  }, [projects])

  const filteredProjects = activeCategory === 'all' ? projects : projects.filter((p) => p.category?.slug === activeCategory)

  const skeletonCards = Array.from({ length: 6 })

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px',
      },
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [filteredProjects])

  return (
    <section className="section about-section pt-5 z-1" id="projects">
      <Container>
        {/* ===== Section Title ===== */}
        <Row className="mb-5">
          <Col xl={6}>
            <div className="title-sm">
              <span>PORTFOLIO</span>
            </div>
            <div className="about-title main-title mt-3">
              <h2 className="main-title mt-3">
                Selected <span className="span-title text-line p-0">Projects</span>
              </h2>
              <p className="project-desc mt-3">Beberapa project yang saya kembangkan, mencakup frontend, backend, serta integrasi sistem.</p>
            </div>
          </Col>
        </Row>

        {/* ===== Filter ===== */}
        <Row className="mb-4">
          <Col>
            <div className="project-filter d-flex flex-wrap gap-2">
              <button className={`btn-theme btn-sm ${activeCategory === 'all' ? '' : 'btn-theme-outline'}`} onClick={() => setActiveCategory('all')}>
                All
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`btn-theme btn-sm ${activeCategory === cat.slug ? '' : 'btn-theme-outline'}`}
                  onClick={() => setActiveCategory(cat.slug)}>
                  {cat.name}
                </button>
              ))}
            </div>
          </Col>
        </Row>

        {/* ===== Project Cards ===== */}
        <Row className="g-lg-4 g-3">
          {/* Skeleton ketika data belum ada */}
          {projects.length === 0 &&
            skeletonCards.map((_, i) => (
              <Col xl={4} lg={6} md={6} key={i}>
                <div className="project-card">
                  <Skeleton height={180} borderRadius={8} className="mb-3" />
                  <Skeleton width="70%" height={22} />
                  <Skeleton count={2} />
                  <div className="mt-3">
                    <Skeleton width={80} height={24} borderRadius={999} />
                  </div>
                </div>
              </Col>
            ))}

          {/* Data nyata */}
          {filteredProjects.map((item, index) => (
            <Col xl={4} lg={6} md={6} key={item.id}>
              <div className="project-card reveal d-flex flex-column" style={{ transitionDelay: `${index * 0.08}s` }} onClick={() => openModal(item)}>
                {/* Thumbnail */}
                <div className="project-thumbnail mb-3">
                  {!loadedImages[item.id] && <Skeleton height={180} borderRadius={8} />}

                  {item.thumbnail_url && (
                    <img
                      src={item.thumbnail_url}
                      alt={item.title}
                      className="img-fluid rounded"
                      style={{
                        display: loadedImages[item.id] ? 'block' : 'none',
                        width: '100%',
                      }}
                      onLoad={() => handleImageLoad(item.id)}
                      onError={() => handleImageError(item.id)}
                    />
                  )}

                  {!item.thumbnail_url && <div className="thumbnail-placeholder">No Image</div>}
                </div>

                {/* Title */}
                {loadedImages[item.id] ? <h3 className="mb-2">{item.title}</h3> : <Skeleton width="70%" height={22} />}

                {/* Description */}
                {loadedImages[item.id] ? <p className="small mb-3">{truncate(item.description)}</p> : <Skeleton count={2} />}

                <div className="project-card__bottom mt-auto d-flex justify-content-between align-items-center">
                  {loadedImages[item.id] ? (
                    <span className="project-badge">{item.category?.name ?? 'Uncategorized'}</span>
                  ) : (
                    <Skeleton width={80} height={24} borderRadius={999} />
                  )}

                  {item.demo_url &&
                    (loadedImages[item.id] ? (
                      <Link to={item.demo_url} target="_blank" className="project-demo-btn">
                        <img className="arrow-demo" src={arrowIcon} alt="Demo" />
                      </Link>
                    ) : (
                      <Skeleton width={38} height={38} borderRadius={10} />
                    ))}
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <ProjectModal show={showModal} onHide={closeModal} project={selectedProject} />
      </Container>
    </section>
  )
}

export default Project
