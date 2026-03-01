import { useEffect, useState, useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { getSkills } from '@portfolio/services/skill.service'
import IconifyIcon from '@portfolio/components/wrappers/IconifyIcon'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'

type SkillType = {
  id: number
  name: string
  icon: string
}

const Skill = () => {
  const [skills, setSkills] = useState<SkillType[]>([])
  const [loading, setLoading] = useState(true)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  useEffect(() => {
    getSkills()
      .then((res) => setSkills(res.data.data ?? res.data ?? []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  // Trigger animasi hanya sekali ketika loading selesai DAN in view
  useEffect(() => {
    if (!loading && isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [loading, isInView, hasAnimated])

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.7,
      y: 50,
    },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 18,
      },
    },
  }

  return (
    <section className="section pt-5 mt-5" id="skills">
      <Container>
        <Row className="mb-5">
          <Col lg={6}>
            <div className="title-sm">
              <span>SKILLS</span>
            </div>
            <div className="about-title main-title mt-3">
              <h2 className="sub-title mt-3">
                Technologies <span className="span-title text-line p-0"> I Work With</span>
              </h2>
              <p className="skill-desc mt-3">Tools dan teknologi yang saya gunakan dalam pengembangan web application dan backend system.</p>
            </div>
          </Col>
        </Row>

        <motion.div 
          ref={ref} 
          variants={containerVariants} 
          initial="hidden" 
          animate={hasAnimated ? 'show' : 'hidden'}
        >
          <Row className="g-4 justify-content-center">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <Col key={i} xl={2} lg={3} md={4} sm={6} xs={6}>
                    <div className="skill-card text-center h-100">
                      <div className="mb-3">
                        <Skeleton circle width={48} height={48} />
                      </div>
                      <Skeleton height={16} width={80} style={{ margin: '0 auto' }} />
                    </div>
                  </Col>
                ))
              : skills.map((item) => (
                  <Col key={item.id} xl={2} lg={3} md={4} sm={6} xs={6}>
                    <motion.div 
                      variants={itemVariants} 
                      whileHover={{ scale: 1.06, y: -4 }} 
                      className="skill-card text-center h-100"
                    >
                      <div className="skill-icon mb-3">
                        <IconifyIcon icon={item.icon} width={48} height={48} />
                      </div>
                      <h6 className="skill-name mb-2">{item.name}</h6>
                    </motion.div>
                  </Col>
                ))}
          </Row>
        </motion.div>
      </Container>
    </section>
  )
}

export default Skill