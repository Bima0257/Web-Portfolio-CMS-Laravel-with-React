import { useEffect, useState } from 'react'
import { Card, CardBody, Col, Container, Row, Badge } from 'react-bootstrap'
import { RiGraduationCapLine } from 'react-icons/ri'
import { getEducation } from '@portfolio/services/education.service'
import Lottie from 'lottie-react'
import educationAnimation from '@portfolio/assets/images/Book loading.json'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type Education = {
  id: number
  institution: string
  degree: string
  field_of_study: string | null
  start_year: number
  end_year: number | null
  description: string | null
  sort_order: number
}

const Educations = () => {
  const [educations, setEducations] = useState<Education[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getEducation().then((res) => {
      const sorted = res.data.data.sort((a: Education, b: Education) => a.sort_order - b.sort_order)
      setEducations(sorted)
    })
  }, [])

  useEffect(() => {
    getEducation().then((res) => {
      const sorted = res.data.data.sort((a: Education, b: Education) => a.sort_order - b.sort_order)
      setEducations(sorted)
      setIsLoading(false)
    })
  }, [])

  const skeletonCards = Array.from({ length: 4 })

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
    <section className="section" id="education">
      <Container>
        <Row className="align-items-center justify-content-start g-lg-4 g-3">
          <Col lg={6}>
            <div className="title-sm">
              <span>EDUCATION</span>
            </div>
            <div className="main-title mt-3">
              <h2 className="main-title">
                Academic <span className="span-title text-line">Background</span>
              </h2>
            </div>
          </Col>
        </Row>

        <Row className="mt-4 g-4">
          {/* Skeleton */}
          {isLoading &&
            skeletonCards.map((_, i) => (
              <Col key={i} md={6} lg={6}>
                <Card className="education-card h-100">
                  <CardBody className="p-4">
                    <Skeleton width="60%" height={20} />
                    <Skeleton width="40%" className="mt-2" />
                    <Skeleton width="50%" className="mt-2" />
                    <Skeleton width={120} height={24} className="mt-3" />
                    <Skeleton count={2} className="mt-3" />
                  </CardBody>
                </Card>
              </Col>
            ))}

          {!isLoading && educations.length > 0 && (
            <Col lg={4} className="d-flex justify-content-center align-self-start order-1 order-lg-2">
              <div className="education-illustration reveal">
                <Lottie animationData={educationAnimation} loop autoplay />
              </div>
            </Col>
          )}

          {/* Data */}
          <Col lg={8} className="order-2 order-lg-1">
            <Row className="g-4">
              {educations.map((edu) => (
                <Col key={edu.id} md={6} lg={6}>
                  <Card className="education-card reveal h-100">
                    <CardBody className="p-4">
                      <div className="d-flex align-items-center mb-3">
                        <RiGraduationCapLine className="color-text fs-4 me-2" />
                        <h5 className="color-text fw-bold m-0">{edu.degree}</h5>
                      </div>

                      <h6 className="color-text">{edu.institution}</h6>

                      {edu.field_of_study && <p className="color-text mb-2">{edu.field_of_study}</p>}

                      <div className="my-3">
                        <Badge bg="light" className="date-badge" text="dark">
                          {edu.start_year} — {edu.end_year ?? 'Present'}
                        </Badge>
                      </div>

                      {edu.description && <p className="color-text mb-0">{edu.description}</p>}
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

export default Educations
