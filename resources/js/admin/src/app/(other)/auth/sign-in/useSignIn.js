import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import * as yup from 'yup'

import { useAuthContext } from '@/context/useAuthContext'
import { useNotificationContext } from '@/context/useNotificationContext'
import httpClient from '@/helpers/httpClient'

const useSignIn = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { saveSession } = useAuthContext()
  const [searchParams] = useSearchParams()
  const { showNotification } = useNotificationContext()

  // Schema login username + password
  const loginFormSchema = yup.object({
    username: yup.string().required('Please enter your username'),
    password: yup.string().required('Please enter your password'),
  })

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  // Redirect user setelah login
  const redirectUser = () => {
    const redirectLink = searchParams.get('redirectTo')

    if (redirectLink && redirectLink !== '*' && redirectLink !== '/auth/sign-in') {
      navigate(redirectLink, { replace: true })
    } else {
      navigate('/admin/dashboard', { replace: true })
    }
  }

  // Submit login
  const login = handleSubmit(async (values) => {
    setLoading(true)
    try {
      const res = await httpClient.post('/auth/login', {
        username: values.username.trim(),
        password: values.password,
      })

      if (res.data?.token) {
        // Simpan session
        saveSession({
          user: res.data.user,
          token: res.data.token,
        })

        showNotification({
          message: res.data.message || 'Login berhasil',
          variant: 'success',
        })

        redirectUser()
      }
    } catch (e) {
      showNotification({
        message: e.response?.data?.message || 'Username atau password salah',
        variant: 'danger',
      })
    } finally {
      setLoading(false)
    }
  })

  return {
    loading,
    login,
    control,
  }
}

export default useSignIn
