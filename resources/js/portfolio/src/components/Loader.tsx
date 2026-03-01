import React from 'react'
import Lottie from 'lottie-react'
import loadingAnimation from '@portfolio/assets/images/Loading-blue.json'
import '@portfolio/assets/scss/_loader.scss'

type LoaderProps = {
  fullscreen?: boolean
  size?: number
}

const Loader: React.FC<LoaderProps> = ({ fullscreen = false, size = 140 }) => {
  return (
    <div className={`loader ${fullscreen ? 'loader--fullscreen' : ''}`} style={!fullscreen ? { width: size, height: size } : undefined}>
      <Lottie animationData={loadingAnimation} loop className="loader__animation" />
    </div>
  )
}

export default Loader
