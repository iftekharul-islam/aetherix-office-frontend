'use client'

import { useRouter } from 'next/navigation'

import { useSelector } from 'react-redux'

import useFetchUser from '@/hooks/useFetchUser'
import FullPageLoader from '@/components/full-page-loader'

const ProtectedRoutes = ({ children }) => {
  const router = useRouter()
  const { user: apiUser, isLoading, isFetching } = useFetchUser()

  const reduxUser = useSelector(state => state.userSlice.user)

  const currentUser = reduxUser || apiUser

  // Still loading → show spinner
  if (isLoading || isFetching) {
    return <FullPageLoader />
  }

  // If finished loading and no user → redirect
  if (!currentUser) {
    router.replace('/login')

    return null
  }

  // Authenticated → render children
  return children
}

export default ProtectedRoutes
