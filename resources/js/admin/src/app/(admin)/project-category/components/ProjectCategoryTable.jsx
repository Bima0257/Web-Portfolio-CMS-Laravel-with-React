import { DataTableWrapper } from '@/components/datatable'

const ProjectCategoryTable = ({ data = [], onReload, onEdit, onDelete }) => {
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
      name: 'Slug',
      selector: (row) => row.slug,
      sortable: true,
      grow: 2,
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

  return <DataTableWrapper title="Experience" data={data} columns={columns} onReload={onReload} reorderRequest="admin/projects-categories/reorder" />
}

export default ProjectCategoryTable
