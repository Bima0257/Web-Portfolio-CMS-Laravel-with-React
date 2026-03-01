import { useEffect, useState, useRef } from 'react'
import DataTable from 'react-data-table-component'
import { Card, CardBody, CardTitle, Spinner } from 'react-bootstrap'
import Sortable from 'sortablejs'
import httpClient from '@/helpers/httpClient'
import { swalSuccess, swalError } from '@/helpers/swal'
import { getDataTableStyles, getSortableStyles } from '@/helpers/dataTableStyles'

const DataTableWrapper = ({ title, data = [], columns, onReload, reorderRequest, pagination = true, perPage = 5, noDataText = 'No data found' }) => {
  const [rows, setRows] = useState([])
  const [isReordering, setIsReordering] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const sortableRef = useRef(null)

  /** =========================
   * Dark mode detector
   ========================= */
  useEffect(() => {
    const check = () => {
      const html = document.documentElement
      setIsDarkMode(html.getAttribute('data-bs-theme') === 'dark' || document.body.classList.contains('dark-mode'))
    }

    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true })
    observer.observe(document.body, { attributes: true })

    return () => observer.disconnect()
  }, [])

  /** =========================
   * Sync data
   ========================= */
  useEffect(() => {
    const sorted = [...data].sort((a, b) => a.sort_order - b.sort_order)
    setRows(sorted)
  }, [data])

  /** =========================
   * Init Sortable (FIX)
   ========================= */
  useEffect(() => {
    if (!reorderRequest) return

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

          const newRows = [...rows]
          const [moved] = newRows.splice(oldIndex, 1)
          newRows.splice(newIndex, 0, moved)
          setRows(newRows)

          const orders = newRows.map((item, index) => ({
            id: item.id,
            sort_order: index + 1,
          }))

          setIsReordering(true)

          try {
            await httpClient.post(reorderRequest, { orders })
            swalSuccess('Berhasil', 'Urutan berhasil diperbarui')
            onReload?.()
          } catch (err) {
            swalError('Gagal', 'Gagal memperbarui urutan')
            setRows([...data].sort((a, b) => a.sort_order - b.sort_order))
          } finally {
            setIsReordering(false)
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
  }, [rows, reorderRequest, data, onReload])

  return (
    <Card>
      <CardBody>
        {title && <CardTitle className="mb-3 text-center">{title}</CardTitle>}

        <div className="datatable-body-wrapper">
          {isReordering && (
            <div className="datatable-row-overlay">
              <Spinner animation="border" size="sm" />
              <span>Menyimpan urutan...</span>
            </div>
          )}

          <DataTable
            columns={columns}
            data={rows}
            pagination={pagination}
            paginationPerPage={perPage}
            highlightOnHover
            customStyles={getDataTableStyles(isDarkMode)}
            noDataComponent={<div className="p-4 text-center">{noDataText}</div>}
          />
        </div>
      </CardBody>

      <style>{getSortableStyles(isDarkMode)}</style>
    </Card>
  )
}

export default DataTableWrapper
