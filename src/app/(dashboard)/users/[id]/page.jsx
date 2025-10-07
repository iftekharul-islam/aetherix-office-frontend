'use client'

import { toast } from 'react-toastify'
import Grid from '@mui/material/Grid'

import { useGetUserQuery } from '@/lib/redux-rtk/apis/userApi'
import UserLeftOverview from '@/components/users/UserLeftOverview'

export default function Page({ params }) {
  const { id } = params

  const {
    data: user,
    isLoading,
    isError
  } = useGetUserQuery(id, {
    skip: !id
  })

  // Show toast immediately if no id
  if (!id) {
    toast.error('User ID is missing!')

    return <p>User ID is missing!</p>
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error fetching user</p>

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={4} md={5}>
        <UserLeftOverview user={user} />
      </Grid>
      <Grid item xs={12} lg={8} md={7}>
        {/* <UserRight tabContentList={tabContentList(data)} /> */}
      </Grid>
    </Grid>
  )
}
