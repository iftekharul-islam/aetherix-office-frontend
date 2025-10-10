'use client'

import { useRouter } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'

import useFetchUser from '@/hooks/useFetchUser'
import FullPageLoader from '@/components/full-page-loader'
import { clearUser } from '@/lib/redux-rtk/slices/userSlice'

const ProtectedRoutes = ({ children }) => {
  const router = useRouter()
  const { user: apiUser, isLoading, isFetching } = useFetchUser()

  const reduxUser = useSelector(state => state.userSlice.user)

  const dispatch = useDispatch()

  const currentUser = reduxUser || apiUser

 
  if (isLoading || isFetching) {
    return <FullPageLoader />
  }


  if (!currentUser) {

    router.replace('/login')

    return null
  }


  return children
}

export default ProtectedRoutes
