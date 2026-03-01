import { DataTableWrapper } from '@/components/datatable'
import { Badge } from 'react-bootstrap'

const ExperienceTable = ({ data = [], onReload, onEdit, onDelete }) => {
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
    { name: 'Position', selector: (row) => row.position },
    { name: 'Company', selector: (row) => row.company },
    {
      name: 'Status',
      cell: (row) => (row.is_current ? <Badge bg="success">Current</Badge> : <Badge bg="secondary">Past</Badge>),
      center: true,
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

  return <DataTableWrapper title="Experience" data={data} columns={columns} onReload={onReload} reorderRequest="admin/experiences/reorder" />
}

export default ExperienceTable
