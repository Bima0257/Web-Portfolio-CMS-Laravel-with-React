import { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button className={`scroll-top ${visible ? 'show' : ''}`} onClick={scrollToTop} aria-label="Scroll to top">
      <FaArrowUp size={16} />
    </button>
  )
}

export default ScrollToTop
