import { useEffect } from 'react'
import { bootstrapApp } from '../helpers/bootstrapApp'
import { useAppLoader } from '../context/AppLoaderContext'

export const useAppBootstrap = () => {
  const { hideLoader } = useAppLoader()

  useEffect(() => {
    const init = async () => {
      try {
        await bootstrapApp()
      } finally {
        hideLoader()
      }
    }

    init()
  }, [])
}
