import type { Project } from '@portfolio/types/project'
import { Modal, Badge } from 'react-bootstrap'

type Props = {
  show: boolean
  onHide: () => void
  project: Project | null
}

const ProjectModal = ({ show, onHide, project }: Props) => {
  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="project-modal">
      <Modal.Header closeButton>
        <Modal.Title>{project?.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {project?.thumbnail_url && <img src={project.thumbnail_url} alt={project.title} className="img-fluid rounded mb-3" />}

        <p className="mb-2">
          <strong>Category :</strong> {project?.category?.name ?? 'Uncategorized'}
        </p>

        <p className="mb-3">{project?.description}</p>

        <div className="mb-3">
          <strong>Tools:</strong>
          <div className="d-flex flex-wrap gap-2 mt-2">
            {project?.skills?.length ? (
              project.skills.map((skill) => (
                <Badge bg="secondary" key={skill.id}>
                  {skill.name}
                </Badge>
              ))
            ) : (
              <span className="text-muted">No tools</span>
            )}
          </div>
        </div>

        {project?.demo_url && (
          <div className="d-flex justify-content-end">
            <a href={project.demo_url} target="_blank" className="btn btn-primary">
              Visit Demo
            </a>
          </div>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default ProjectModal
