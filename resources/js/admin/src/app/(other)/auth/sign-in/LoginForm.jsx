import PasswordFormInput from '@/components/form/PasswordFormInput'
import TextFormInput from '@/components/form/TextFormInput'
import { Button } from 'react-bootstrap'
import useSignIn from './useSignIn'

const LoginForm = () => {
  const { loading, login, control } = useSignIn()

  return (
    <form onSubmit={login} className="authentication-form">
      {/* Username */}
      <TextFormInput
        control={control}
        name="username"
        containerClassName="mb-3"
        label="Username"
        id="username-id"
        placeholder="Enter your username"
      />

      {/* Password */}
      <PasswordFormInput
        control={control}
        name="password"
        containerClassName="mb-3"
        id="password-id"
        placeholder="Enter your password"
        label={
          <>
            <label className="form-label" htmlFor="password-id">
              Password
            </label>
          </>
        }
      />

      {/* Submit */}
      <div className="mb-1 text-center d-grid">
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
