import { Col, Row } from 'react-bootstrap'
import PageBreadcrumb from '@/components/layout/PageBreadcrumb'
import PageMetaData from '@/components/PageTitle'
import ProjectForm from '../components/ProjectForm'

const CreateProjectPage = () => {
  return (
    <>
      <PageBreadcrumb subName="Projects" title="Create Project" />
      <PageMetaData title="Create Project" />

      <Row>
        <Col xl={12}>
          <ProjectForm />
        </Col>
      </Row>
    </>
  )
}

export default CreateProjectPage
