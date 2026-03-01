import WorkGirl from '@portfolio/assets/images/work-girl-2.png'
import Topbar from '@portfolio/components/layout/Topbar'
import { getAbout } from '@portfolio/services/about.service'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

type AboutType = {
  name: string
  expertise: string
  description: string
  photo: string
  cv_url: string
}

const Index = () => {
  const [home, setHome] = useState<AboutType | null>(null)
  const [loadingData, setLoadingData] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const location = useLocation()

  const isReady = !loadingData && imageLoaded

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location])

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await getAbout()
        setHome(res.data.data)
      } catch (error) {
        console.log('Gagal mengambil data About')
      } finally {
        setLoadingData(false)
      }
    }
    fetchAbout()
  }, [])

  if (!isReady) {
    return (
      <>
        <Topbar />

        {/* Skeleton */}
        <section className="hero-section bg-img-7 pb-0 z-1">
          <Container>
            <Row className="align-items-center justify-content-between">
              <Col lg={5}>
                <Skeleton height={350} borderRadius={12} />
              </Col>

              <Col lg={5}>
                <Skeleton height={42} width="70%" />
                <Skeleton height={36} width="85%" className="mt-2" />
                <Skeleton height={80} className="mt-4" />
                <div className="mt-4">
                  <Skeleton width={160} height={42} className="me-3" />
                  <Skeleton width={120} height={42} />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* preload image (silent) */}
        {home?.photo && <img src={home.photo} alt="preload" style={{ display: 'none' }} onLoad={() => setImageLoaded(true)} />}
      </>
    )
  }

  return (
    <>
      <Topbar />

      <section className="hero-section bg-img-7 pb-0 z-1" id="home">
        <Container>
          <Row className="align-items-center justify-content-between">
            {/* FOTO */}
            <Col lg={5}>
              <AnimatePresence mode="wait">
                {!isReady ? (
                  <motion.div key="photo-skeleton" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                    <Skeleton height={350} borderRadius={12} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="photo"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="hand-phone z-1">
                    <img src={home?.photo || WorkGirl} alt={home?.name || 'Profile Photo'} className="img-fluid phone-img" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Col>

            {/* TEXT */}
            <Col lg={5}>
              <AnimatePresence mode="wait">
                {!isReady ? (
                  <motion.div key="text-skeleton" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                    <Skeleton height={42} width="70%" />
                    <Skeleton height={36} width="85%" className="mt-2" />
                    <Skeleton height={80} className="mt-4" />
                    <div className="mt-4">
                      <Skeleton width={160} height={42} className="me-3" />
                      <Skeleton width={120} height={42} />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="text"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: {
                        transition: { staggerChildren: 0.2 },
                      },
                    }}>
                    <motion.h2
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 },
                      }}
                      className="display-5 fw-semibold lh-base hero-title">
                      Hi, I'm {home?.name} <br />
                      <span className="span-title text-line">{home?.expertise}</span>
                    </motion.h2>

                    <motion.p
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 },
                      }}
                      className="hero-desc-glass">
                      {home?.description}
                    </motion.p>

                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 },
                      }}
                      className="main-btn mt-4">
                      <a href={home?.cv_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary my-2 me-3">
                        Download CV
                      </a>
                      <Link to="/home#contact" className="btn btn-orange shadow-none">
                        Contact Me
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Index
