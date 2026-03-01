import { useEffect, useState } from 'react'
import { Card, CardBody, Col, Container, Row, Badge } from 'react-bootstrap'
import { RiBriefcaseLine } from 'react-icons/ri'
import { getExperience } from '@portfolio/services/experiences.service'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import experienceAnimation from '@portfolio/assets/images/Web Design.json'
import Lottie from 'lottie-react'

type Experience = {
  id: number
  position: string
  company: string
  start_date: string
  end_date: string | null
  is_current: boolean
  description: string | null
  url: string | null
  sort_order: number
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  })
}

const Experiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getExperience().then((res) => {
      const sorted = res.data.data.sort((a: Experience, b: Experience) => a.sort_order - b.sort_order)
      setExperiences(sorted)
    })
  }, [])

  useEffect(() => {
    getExperience().then((res) => {
      const sorted = res.data.data.sort((a: Experience, b: Experience) => a.sort_order - b.sort_order)
      setExperiences(sorted)
      setIsLoading(false)
    })
  }, [])

  const skeletonCards = Array.from({ length: 6 })

  useEffect(() => {
    if (isLoading) return

    const elements = document.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [isLoading])

  return (
    <section className="section" id="experience">
      <Container>
        <Row className="align-items-center justify-content-start g-lg-4 g-3">
          <Col lg={6}>
            <div className="title-sm">
              <span>MY EXPERIENCE</span>
            </div>
            <div className="main-title mt-3">
              <h2 className="main-title">
                Professional <span className="span-title text-line">Journey</span>
              </h2>
            </div>
          </Col>
        </Row>

        <Row className="mt-4 g-4">
          {/* Skeleton */}
          {experiences.length === 0 &&
            skeletonCards.map((_, i) => (
              <Col key={i} md={6} lg={4}>
                <Card className="experience-card h-100 border-0 rounded-2">
                  <CardBody className="p-4">
                    <Skeleton width="60%" height={20} />
                    <Skeleton width="40%" className="mt-2" />
                    <Skeleton width={120} height={24} className="mt-3" />
                    <Skeleton count={3} className="mt-3" />
                  </CardBody>
                </Card>
              </Col>
            ))}

          {!isLoading && experiences.length > 0 && (
            <Col lg={4} className="d-flex justify-content-center align-self-start order-1 order-lg-2">
              <div className="experience-illustration reveal">
                <Lottie animationData={experienceAnimation} loop autoplay />
              </div>
            </Col>
          )}

          {/* EXPERIENCE DATA */}
          <Col lg={8} className="order-2 order-lg-1">
            <Row className="g-4">
              {experiences.map((exp) => (
                <Col key={exp.id} sm={6} className="order-2 order-lg-1">
                  <Card className="experience-card reveal h-100">
                    <CardBody className="p-4">
                      <div className="d-flex align-items-center mb-3">
                        <RiBriefcaseLine className="color-text fs-4 me-2" />
                        <h5 className="color-text fw-bold m-0">{exp.position}</h5>
                      </div>

                      <h6 className="color-text">{exp.company}</h6>

                      <div className="my-3">
                        <Badge bg="light" className="date-badge" text="dark">
                          {formatDate(exp.start_date)} — {exp.is_current ? 'Present' : formatDate(exp.end_date!)}
                        </Badge>
                      </div>

                      {exp.description && <p className="exp-description mb-0">{exp.description}</p>}
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Experiences
