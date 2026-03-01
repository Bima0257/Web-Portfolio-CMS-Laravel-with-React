import useActiveSection from '@portfolio/hook/useActiveSection'
import useScrollEvent from '@portfolio/hook/useScrollEvent'
import { useContext, useState } from 'react'
import { Container } from 'react-bootstrap'
import { RiMenu5Line, RiMoonLine, RiSunLine } from 'react-icons/ri'
import { ThemeContext } from '@portfolio/context/ThemeContext'
import { Link } from 'react-router-dom'

type TopBarType = {
  isLightHeader?: boolean
}

type SectionType = {
  name: string
  href: string
}

const sectionIds: SectionType[] = [
  { name: 'Home', href: 'home' },
  { name: 'Skills', href: 'skills' },
  { name: 'Projects', href: 'projects' },
  { name: 'Experience', href: 'experience' },
  { name: 'Education', href: 'education' },
]

const Topbar = ({ isLightHeader }: TopBarType) => {
  const activeSection = useActiveSection(sectionIds.map((item) => item.href))
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { scrollY } = useScrollEvent()
  return (
    <>
      <header>
        <nav
          className={`navbar navbar-expand-lg fixed-top navbar-custom sticky sticky-light ${isLightHeader ? 'navbar-light' : 'nav-light'}  ${scrollY > 100 ? 'nav-sticky' : ''}`}
          id="navbar">
          <Container className="d-flex align-items-center">
            {/* LOGO */}
            <div className="navbar-brand logo">
              <Link className="navbar-caption fs-4 ls-1 fw-bold d-flex align-items-center" to="/">
                <span>Bima Tri Wiyono</span>
              </Link>
            </div>

            {/* MOBILE ACTIONS */}
            <div className="nav-actions d-lg-none ms-auto">
              <button className="navbar-toggler" type="button" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-expanded={isMenuOpen}>
                <span className="fw-bold fs-4">
                  <RiMenu5Line />
                </span>
              </button>

              <button onClick={toggleTheme} className="theme-toggle btn btn-sm" aria-label="Toggle theme">
                {theme === 'dark' ? <RiSunLine size={20} /> : <RiMoonLine size={20} />}
              </button>
            </div>

            {/* MENU */}
            <div className={`collapse navbar-collapse justify-content-center ${isMenuOpen ? 'show' : ''}`}>
              <ul className="navbar-nav">
                {sectionIds.map((item, idx) => (
                  <li key={idx} className="nav-item">
                    <a href={`#${item.href}`} className={`nav-link ${activeSection === item.href ? 'active' : ''}`}>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* DESKTOP THEME BUTTON */}
            <div className="nav-actions d-none d-lg-flex ms-auto">
              <button onClick={toggleTheme} className="theme-toggle btn btn-sm" aria-label="Toggle theme">
                {theme === 'dark' ? <RiSunLine size={20} /> : <RiMoonLine size={20} />}
              </button>
            </div>
          </Container>
        </nav>
      </header>
    </>
  )
}

export default Topbar
