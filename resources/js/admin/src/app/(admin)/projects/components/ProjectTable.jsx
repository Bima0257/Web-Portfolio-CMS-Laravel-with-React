import { DataTableWrapper } from '@/components/datatable'

const ProjectTable = ({ data = [], onReload, onDelete }) => {
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
      name: 'Thumbnail',
      cell: (row) => {
        const thumbnailUrl = row.thumbnail ? `/storage/${row.thumbnail}` : null
        return thumbnailUrl ? (
          <img src={thumbnailUrl} width="60" height="60" style={{ borderRadius: '6px', objectFit: 'cover', margin: '5px 0' }} alt={row.title} />
        ) : (
          <span style={{ color: '#999' }}>-</span>
        )
      },
      width: '100px',
    },
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true,
      grow: 2,
    },
    {
      name: 'Category',
      cell: (row) =>
        row.category?.name ? <span className="badge bg-info">{row.category.name}</span> : <span className="badge bg-secondary">No Category</span>,
      width: '130px',
    },
    {
      name: 'Tools',
      cell: (row) => {
        if (!row.skills || row.skills.length === 0) {
          return <span style={{ color: '#999' }}>-</span>
        }

        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {row.skills.map((skill) => (
              <span key={skill.id} className="badge bg-secondary" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {skill.name}
              </span>
            ))}
          </div>
        )
      },
      grow: 2,
    },
    {
      name: 'Demo URL',
      cell: (row) =>
        row.demo_url ? (
          <a href={row.demo_url} target="_blank" rel="noopener noreferrer">
            View
          </a>
        ) : (
          <span style={{ color: '#999' }}>-</span>
        ),
      width: '100px',
    },
    {
      name: 'Action',
      cell: (row) => (
        <div style={{ display: 'flex', gap: '4px' }}>
          <a href={`/admin/projects/${row.id}/edit`} className="btn btn-sm btn-warning">
            Edit
          </a>
          <button className="btn btn-sm btn-danger" onClick={() => onDelete(row.id)} type="button">
            Delete
          </button>
        </div>
      ),
      width: '150px',
      right: true,
    },
  ]

  return <DataTableWrapper title="Project" data={data} columns={columns} onReload={onReload} reorderRequest="admin/projects/reorder" />
}

export default ProjectTable
