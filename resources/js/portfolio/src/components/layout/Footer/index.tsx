import { currentYear } from '@portfolio/components/CurrentYear'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="footer-simple">
      <Container>
        <div className="footer-bottom">
          © {currentYear} Bima — Created by{' '}
          <Link to="" className="creator">
            bimabtw_
          </Link>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
