import { DataTableWrapper } from '@/components/datatable'
import { Badge } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

const SkillTable = ({ data = [], onReload, onEdit, onDelete }) => {
  if (!Array.isArray(data)) return null

  const levelVariant = {
    Beginner: 'secondary',
    Intermediate: 'info',
    Advanced: 'warning',
    Expert: 'success',
  }

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
      name: 'Skill Name',
      selector: (row) => row.name,
      sortable: true,
      grow: 2,
    },
    {
      name: 'Level',
      cell: (row) => <Badge bg={levelVariant[row.level] || 'secondary'}>{row.level}</Badge>,
      center: true,
      width: '130px',
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

  return <DataTableWrapper title="Skills" data={data} columns={columns} onReload={onReload} reorderRequest="admin/skills/reorder" />
}

export default SkillTable
