import { useEffect, useState } from 'react'

/**
 * @param {string|null} initialImageUrl  url gambar lama (edit mode)
 */
const useImagePreview = (initialImageUrl = null) => {
  const [preview, setPreview] = useState(initialImageUrl)

  const onChangeImage = (file) => {
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const resetPreview = () => {
    setPreview(initialImageUrl)
  }

  useEffect(() => {
    setPreview(initialImageUrl)
  }, [initialImageUrl])

  return {
    preview,
    onChangeImage,
    resetPreview,
  }
}

export default useImagePreview
