import { useEffect, useRef } from 'react'
import Sortable from 'sortablejs'
import httpClient from '@/helpers/httpClient'

const useSortableTable = ({ data, setData, reorderUrl, onReload, onSuccess, onError }) => {
  const sortableRef = useRef(null)

  useEffect(() => {
    if (!reorderUrl) return

    const timer = setTimeout(() => {
      const tbody = document.querySelector('.rdt_TableBody')
      if (!tbody || sortableRef.current) return

      sortableRef.current = new Sortable(tbody, {
        animation: 150,
        handle: '.drag-handle',
        ghostClass: 'sortable-ghost',
        dragClass: 'sortable-drag',

        onEnd: async ({ oldIndex, newIndex }) => {
          if (oldIndex === newIndex) return

          setData((prev) => {
            const updated = [...prev]
            const [moved] = updated.splice(oldIndex, 1)
            updated.splice(newIndex, 0, moved)
            return updated
          })

          const orders = data.map((item, index) => ({
            id: item.id,
            sort_order: index + 1,
          }))

          try {
            await httpClient.post(reorderUrl, { orders })
            onSuccess?.()
            onReload?.()
          } catch (err) {
            onError?.(err)
            onReload?.() // fallback reload dari server
          }
        },
      })
    }, 300)

    return () => {
      clearTimeout(timer)
      if (sortableRef.current) {
        sortableRef.current.destroy()
        sortableRef.current = null
      }
    }
  }, [data, reorderUrl, onReload, onSuccess, onError, setData])
}

export default useSortableTable
