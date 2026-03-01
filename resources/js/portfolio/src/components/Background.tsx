import Lottie from 'lottie-react'
import bgAnimation from '@portfolio/assets/images/Background-animation.json'

const AnimatedBackground = () => {
  return (
    <div className="lottie-bg">
      <Lottie animationData={bgAnimation} loop autoplay />
    </div>
  )
}

export default AnimatedBackground
