import { useEffect, useState } from 'react'

const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150

      for (let id of sectionIds) {
        const section = document.getElementById(id)
        if (section) {
          const top = section.offsetTop
          const height = section.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds])

  return activeSection
}

export default useActiveSection
