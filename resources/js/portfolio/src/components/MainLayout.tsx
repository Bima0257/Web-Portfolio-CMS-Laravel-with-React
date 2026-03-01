import type { ReactNode } from 'react'
import Experiences from './Experiences'
import Skill from './Skill'
import Footer from './layout/Footer'
import Project from './Project'
import Educations from './Educations'
import Contact from './Contact'
import ScrollToTop from './ScrollToTop'
import AnimatedBackground from './Background'

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <AnimatedBackground />
      <Skill />
      <Project />
      <Experiences />
      <Educations />
      <Contact />
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default MainLayout
