'use client'

import { useSearchParams } from 'next/navigation'

import { toast } from 'react-toastify'
import Grid from '@mui/material/Grid'

import AttendanceUserDetails from '@/components/attendances/AttendanceUserDetails'
import { useGetUserQuery } from '@/lib/redux-rtk/apis/userApi'
import AttendanceDetails from '@/components/attendances/AttendanceDetails'
import { useGetAttendanceSummaryQuery } from '@/lib/redux-rtk/apis/attendanceApi'
import AttendanceDetailsSkeleton from '@/components/attendance-details-skeleton'

export default function AttendanceDetailsPage({ params }) {
  const { id } = params
  const searchParams = useSearchParams()
  const date = searchParams.get('date')


const { data: userData, isLoading: userLoading } = useGetUserQuery(id);

  const { data: attendanceDetails, isLoading, refetch } = useGetAttendanceSummaryQuery({
    user_id: id,
    from: date,
    to: date
  })

  



  if (!id) {
    toast.error('User ID is missing!')

    return <p>User ID is missing!</p>
  }

  if (isLoading || userLoading) return <AttendanceDetailsSkeleton />



  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={4} md={5}>
       
        <AttendanceUserDetails user={attendanceDetails?.data[0]?.user} date={date} />
      </Grid>
      <Grid item xs={12} lg={8} md={7}>
        <AttendanceDetails  userData={userData}  date={date} attendanceDetailsData={attendanceDetails?.data[0] || []}  refetch={refetch}/>
      </Grid>
    </Grid>
  )
}
