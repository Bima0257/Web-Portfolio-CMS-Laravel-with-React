export const getDataTableStyles = (isDarkMode = false) => ({
  table: {
    style: {
      backgroundColor: isDarkMode ? 'var(--bs-body-bg)' : '#fff',
      color: isDarkMode ? 'var(--bs-body-color)' : '#212529',
    },
  },

  headRow: {
    style: {
      backgroundColor: isDarkMode ? 'var(--bs-dark-bg-subtle)' : '#f8f9fa',
      borderBottom: isDarkMode ? '2px solid var(--bs-border-color)' : '2px solid #dee2e6',
      fontWeight: 'bold',
      color: isDarkMode ? 'var(--bs-body-color)' : '#212529',
      minHeight: '52px',
    },
  },

  headCells: {
    style: {
      paddingLeft: '16px',
      paddingRight: '16px',
      color: isDarkMode ? 'var(--bs-body-color)' : '#6c757d',
      fontSize: '0.875rem',
    },
  },

  rows: {
    style: {
      minHeight: '60px',
      backgroundColor: isDarkMode ? 'var(--bs-body-bg)' : '#fff',
      borderBottom: isDarkMode ? '1px solid var(--bs-border-color)' : '1px solid #e3e6ea',
      color: isDarkMode ? 'var(--bs-body-color)' : '#212529',
      '&:hover': {
        backgroundColor: isDarkMode ? 'var(--bs-dark-bg-subtle)' : '#f8f9fa',
      },
    },
  },

  cells: {
    style: {
      paddingLeft: '16px',
      paddingRight: '16px',
      fontSize: '0.875rem',
    },
  },

  pagination: {
    style: {
      backgroundColor: isDarkMode ? 'var(--bs-body-bg)' : '#fff',
      borderTop: isDarkMode ? '1px solid var(--bs-border-color)' : '1px solid #e3e6ea',
      color: isDarkMode ? 'var(--bs-body-color)' : '#212529',
      minHeight: '56px',
    },
    pageButtonsStyle: {
      borderRadius: '4px',
      height: '32px',
      width: '32px',
      padding: '4px',
      margin: '0 4px',
      cursor: 'pointer',
      transition: '0.3s',
      color: isDarkMode ? 'var(--bs-body-color)' : '#6c757d',
      fill: isDarkMode ? 'var(--bs-body-color)' : '#6c757d',
      backgroundColor: 'transparent',

      '&:disabled': {
        cursor: 'not-allowed',
        color: isDarkMode ? 'var(--bs-secondary-color)' : '#dee2e6',
        fill: isDarkMode ? 'var(--bs-secondary-color)' : '#dee2e6',
      },

      '&:hover:not(:disabled)': {
        backgroundColor: isDarkMode ? 'var(--bs-dark-bg-subtle)' : '#e9ecef',
      },
    },
  },
})

/**
 * SortableJS styles
 * Dipakai via <style>{getSortableStyles(isDarkMode)}</style>
 */
export const getSortableStyles = (isDarkMode = false) => `
  .datatable-body-wrapper {
    position: relative;
  }

  /* overlay tepat di area row */
  .datatable-row-overlay {
    position: absolute;
    top: 52px; /* tinggi header table */
    left: 0;
    right: 0;
    bottom: 56px; /* pagination */
    z-index: 10;

    background: ${isDarkMode ? 'rgba(33,37,41,0.85)' : 'rgba(255,255,255,0.85)'};

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;

    font-size: 0.9rem;
    font-weight: 500;
  }

  .drag-handle {
    cursor: grab;
    user-select: none;
  }

  .drag-handle:active {
    cursor: grabbing !important;
  }

  .sortable-ghost {
    opacity: 0.4;
    background: ${isDarkMode ? 'var(--bs-dark-bg-subtle)' : '#f0f0f0'};
  }

  .sortable-drag {
    background: ${isDarkMode ? 'var(--bs-body-bg)' : '#fff'};
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }
`
