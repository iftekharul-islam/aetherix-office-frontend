'use client'

import { useSearchParams } from 'next/navigation'

import { toast } from 'react-toastify'
import Grid from '@mui/material/Grid'

import AttendanceUserDetails from '@/components/attendances/AttendanceUserDetails'
import { useGetUserQuery } from '@/lib/redux-rtk/apis/userApi'
import AttendanceDetails from '@/components/attendances/AttendanceDetails'
import { useGetAttendanceSummaryQuery } from '@/lib/redux-rtk/apis/attendanceApi'

export default function AttendanceDetailsPage({ params }) {
  const { id } = params
  const searchParams = useSearchParams()
  const date = searchParams.get('date')

  const { data: user, isLoading, isError } = useGetUserQuery(id, { skip: !id })

  const { data: attendanceDetails, refetch } = useGetAttendanceSummaryQuery({
    user_id: id,
    from: date,
    to: date
  })

  
  console.log('attendanceDetails data in attendance details page:', attendanceDetails)



  if (!id) {
    toast.error('User ID is missing!')

    return <p>User ID is missing!</p>
  }

  if (isLoading) return <p>Loading user...</p>
  if (isError || !user) return <p>Unable to load user</p>

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={4} md={5}>
        <AttendanceUserDetails user={user} date={date} />
      </Grid>
      <Grid item xs={12} lg={8} md={7}>
        <AttendanceDetails userID={id} date={date} attendanceDetailsData={attendanceDetails?.data[0] || []}  refetch={refetch}/>
      </Grid>
    </Grid>
  )
}
