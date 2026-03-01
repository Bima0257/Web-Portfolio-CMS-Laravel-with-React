import { useEffect, useState } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { RiMailLine, RiUserLine, RiMessage2Line } from 'react-icons/ri'
import { getSocialLinks } from '@portfolio/services/social-links.service'
import IconifyIcon from '@portfolio/components/wrappers/IconifyIcon'

type ContactForm = {
  name: string
  email: string
  message: string
}

type SocialType = {
  id: number
  name: string
  url: string
  icon?: string
  sort_order: number
}

const Contact = () => {
  const [socials, setSocials] = useState<SocialType[]>([])
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
  })

  useEffect(() => {
    getSocialLinks()
      .then((res) => setSocials(res.data.data ?? res.data ?? []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  /* SCROLL REVEAL */
  useEffect(() => {
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
  }, [loading])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await axios.post('/api/contact', form)
    setForm({ name: '', email: '', message: '' })
    alert('Message sent successfully!')
  }

  return (
    <section className="section" id="contact">
      <Container>
        <Row className="align-items-stretch g-4">
          {/* FORM */}
          <Col xs={12} lg={6} className="reveal d-flex">
            <div className="contact-form-card w-100">
              <div className="contact-header">
                <div className="title-sm">
                  <span>CONTACT ME</span>
                </div>

                <div className="main-title mt-3">
                  <h2>Let’s Work Together</h2>
                  <p className="contact-subtitle my-3">Punya project atau ingin diskusi? Kirim pesan saja.</p>
                </div>
              </div>

              {loading ? (
                <>
                  <Skeleton height={20} width={120} />
                  <Skeleton height={42} className="mb-3" />
                  <Skeleton height={20} width={120} />
                  <Skeleton height={42} className="mb-3" />
                  <Skeleton height={20} width={120} />
                  <Skeleton height={120} className="mb-3" />
                  <Skeleton width={140} height={42} />
                </>
              ) : (
                <Form onSubmit={handleSubmit} className="contact-form">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <RiUserLine className="me-2" />
                      Name
                    </Form.Label>
                    <Form.Control name="name" value={form.name} onChange={handleChange} required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      <RiMailLine className="me-2" />
                      Email
                    </Form.Label>
                    <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>
                      <RiMessage2Line className="me-2" />
                      Message
                    </Form.Label>
                    <Form.Control as="textarea" rows={5} name="message" value={form.message} onChange={handleChange} required />
                  </Form.Group>

                  <div className="d-flex justify-content-end">
                    <Button type="submit" className="contact-submit">
                      Send Message
                    </Button>
                  </div>
                </Form>
              )}
            </div>
          </Col>

          <Col xs={12} lg={5} className="reveal d-flex">
            <div className="contact-social-card w-100">
              <div className="contact-header">
                <div className="title-sm title-social">
                  <span>CONNECT WITH ME</span>
                </div>
              </div>

              <Row className="mt-3 g-3">
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <Col xs={6} key={i}>
                        <div className="social-item">
                          <Skeleton width={28} height={28} />
                          <Skeleton width={80} height={16} />
                        </div>
                      </Col>
                    ))
                  : socials.map((item) => (
                      <Col xs={6} key={item.id}>
                        <a href={item.url} target="_blank" rel="noreferrer" className="social-item">
                          <IconifyIcon icon={item.icon} width={28} height={28} />
                          <span className="social-text">{item.name}</span>
                        </a>
                      </Col>
                    ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Contact
