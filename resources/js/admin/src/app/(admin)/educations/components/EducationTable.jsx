import { DataTableWrapper } from '@/components/datatable'

const EducationTable = ({ data = [], onReload, onEdit, onDelete }) => {
  if (!Array.isArray(data)) return null

  const columns = [
    {
      name: '⋮⋮',
      cell: () => <span className="drag-handle">☰</span>,
      width: '60px',
      center: true,
    },
    { name: '#', selector: (row, index) => index + 1, width: '60px', center: true },
    { name: 'Institution', selector: (row) => row.institution, sortable: true, grow: 2 },
    { name: 'Degree', selector: (row) => row.degree, sortable: true, grow: 2 },
    { name: 'Field of Study', selector: (row) => row.field_of_study || '-', sortable: true },
    {
      name: 'Periode',
      selector: (row) => `${row.start_year} - ${row.end_year || 'Sekarang'}`,
      sortable: true,
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

  return <DataTableWrapper title="Education" data={data} columns={columns} onReload={onReload} reorderRequest="admin/educations/reorder" />
}

export default EducationTable
