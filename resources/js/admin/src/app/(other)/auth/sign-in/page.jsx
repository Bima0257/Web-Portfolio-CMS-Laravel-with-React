import { Card, CardBody, Col, Row } from 'react-bootstrap'
import PageMetaData from '@/components/PageTitle'
import LoginForm from './LoginForm'
import signInImg from '@/assets/images/sign-in.svg'
import Lottie from 'lottie-react'
import loginAnimation from '@/assets/images/login.json'
const SignIn = () => {
  return (
    <>
      <PageMetaData title="Sign In" />

      <Card className="auth-card">
        <CardBody className="p-0">
          <Row className="align-items-center g-0">
            <Col lg={6} className="d-none d-lg-inline-block border-end">
              <div className="auth-page-sidebar">
                <div style={{ width: 460, height: 460 }}>
                  <Lottie animationData={loginAnimation} loop autoplay style={{ width: '100%', height: '100%' }} />
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="p-4">
                <h2 className="fw-bold text-center fs-18">Login</h2>
                <Row className="justify-content-center">
                  <Col xs={12} md={8}>
                    <LoginForm />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  )
}
export default SignIn
