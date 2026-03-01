import { Col, Row } from 'react-bootstrap'
import PageBreadcrumb from '@/components/layout/PageBreadcrumb'
import PageMetaData from '@/components/PageTitle'
import AboutCard from './components/AboutCard'
import PersonalInfo from './components/PersonalInfo'
import Skill from './components/Skill'
const Profile = () => {
  return (
    <>
      <PageBreadcrumb subName="Pages" title="Profile" />
      <PageMetaData title="Profile" />

      <Row>
        <Col xxl={6}>
          <Row>
            <Col xs={12}>
              <AboutCard />
            </Col>
          </Row>
        </Col>
        <Col xxl={6}>
          <Row>
            <Col lg={12}>
              <PersonalInfo />
              <Skill />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}
export default Profile
