import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { useMeQuery } from '@/lib/redux-rtk/apis/userApi'
import { setUser } from '@/lib/redux-rtk/slices/userSlice'

const useFetchUser = () => {
  const dispatch = useDispatch()

  const {
    data: user,
    error,
    isLoading,
    isFetching
  } = useMeQuery(undefined, {
    refetchOnMountOrArgChange: true
  })


  useEffect(() => {
    if (!isLoading && user) {
      dispatch(setUser(user))
    } else if (!isLoading && error) {
      dispatch(setUser(null))
    }
  }, [user, error, isLoading, dispatch])

  return { user, error, isLoading, isFetching }
}

export default useFetchUser
