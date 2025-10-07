// Component Imports
import Register from '@/views/Register'

// Server Action Imports

import { getServerMode } from '@core/utils/serverHelpers'

export const metadata = {
  title: 'register',
  description: 'Create an account'
}

const LoginPage = () => {
  // Vars
  const mode = getServerMode()

  return <Register mode={mode} />
}

export default LoginPage
