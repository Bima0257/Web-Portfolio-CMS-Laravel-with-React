import { DataTableWrapper } from '@/components/datatable'
import { Badge } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

const SocialTable = ({ data = [], onReload, onEdit, onDelete }) => {
  if (!Array.isArray(data)) return null

  const columns = [
    {
      name: '⋮⋮',
      cell: () => <span className="drag-handle">☰</span>,
      width: '60px',
      center: true,
    },
    {
      name: '#',
      selector: (row, index) => index + 1,
      width: '60px',
      center: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      grow: 2,
    },
    {
      name: 'URL',
      cell: (row) => (
        <a href={row.url} target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none">
          {row.url}
        </a>
      ),
      grow: 3,
    },
    {
      name: 'Icon',
      cell: (row) => (row.icon ? <IconifyIcon icon={row.icon} width={22} height={22} /> : <span className="text-muted">-</span>),
      center: true,
      width: '100px',
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="d-flex gap-1">
          <button className="btn btn-sm btn-warning" onClick={() => onEdit(row)}>
            Edit
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => onDelete(row.id)}>
            Delete
          </button>
        </div>
      ),
      width: '150px',
      right: true,
    },
  ]

  return <DataTableWrapper title="Social Links" data={data} columns={columns} onReload={onReload} reorderRequest="admin/social-links/reorder" />
}

export default SocialTable
