import Swal from 'sweetalert2'

export const swalConfirm = (text = 'Data akan dihapus permanen!') => {
  return Swal.fire({
    title: 'Apakah kamu yakin?',
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Ya',
    cancelButtonText: 'Batal',
  })
}

export const swalSuccess = (title = 'Berhasil', text = '') => {
  return Swal.fire({
    icon: 'success',
    title,
    text,
    timer: 1500,
    showConfirmButton: false,
  })
}

export const swalError = (title = 'Gagal', text = '') => {
  return Swal.fire({
    icon: 'error',
    title,
    text,
  })
}

export const swalValidationError = (errors, title = 'Validasi Gagal') => {
  let html = '<ul style="text-align:left; padding-left:18px;">'

  Object.values(errors).forEach((messages) => {
    messages.forEach((msg) => {
      html += `<li>${msg}</li>`
    })
  })

  html += '</ul>'

  return Swal.fire({
    icon: 'error',
    title,
    html,
  })
}
