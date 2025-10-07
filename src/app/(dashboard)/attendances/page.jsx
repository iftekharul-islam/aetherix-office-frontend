'use client'
import { useSelector } from 'react-redux'

import AttendanceList from '@/components/attendances/AttendanceList'
import DashboardPageSkeleton from '@/components/dashboard-page-skeleton'

import { useGetAttendancesQuery } from '@/lib/redux-rtk/apis/attendanceApi'
import { useGetUsersQuery } from '@/lib/redux-rtk/apis/userApi'

const AttendanceListApp = () => {
const { selectedUser, selectedType, dateRange, page, perPage, search } = useSelector(
  state => state.attendanceSlice
)

const { data: attendancesData = [], isLoading } = useGetAttendancesQuery({
  user_id: selectedUser || undefined,
  type: selectedType || undefined,
  from: dateRange.start || undefined,
  to: dateRange.end || undefined,
  search: search || undefined,
  page,
  per_page: perPage
})




  const demoData = []

  const { data: userData = [] } = useGetUsersQuery()

  if (isLoading) return <DashboardPageSkeleton />

  return <AttendanceList attendancesData={attendancesData.data || []} userData={userData} totalItems={attendancesData.total || 0} />
}

export default AttendanceListApp
