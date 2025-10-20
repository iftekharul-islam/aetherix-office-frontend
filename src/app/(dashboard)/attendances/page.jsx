'use client'

import { useSelector } from 'react-redux'
import { format } from 'date-fns'

import AttendanceListEnhanced from '@/components/attendances/AttendanceListEnhanced'
import { useGetAttendanceSummaryQuery } from '@/lib/redux-rtk/apis/attendanceApi'
import { useGetDepartmentsQuery } from '@/lib/redux-rtk/apis/departmentApi'
import { useGetDivisionsQuery } from '@/lib/redux-rtk/apis/divisionApi'

import { useGetUsersQuery } from '@/lib/redux-rtk/apis/userApi'
import DashboardPageSkeleton from '@/components/dashboard-page-skeleton'

const AttendanceListAppEnhanced = () => {
  // Fetch summary data
  const {
    selectedUser,
    selectedType,
    selectedDivision,
    selectedDepartment,
    dateRange,
    page,
    perPage,
    search,
    sortBy,
    sortOrder
  } = useSelector(state => state.attendanceSlice)

  const {
    data: attendancesData = [],
    isLoading,
    isError,
    error,
    refetch
  } = useGetAttendanceSummaryQuery({
    user_id: selectedUser || undefined,
    type: selectedType || undefined,
    division_id: selectedDivision || undefined,
    department_id: selectedDepartment || undefined,
    from: dateRange.start || undefined,
    to: dateRange.end || undefined,
    search: search || undefined,
    page,
    per_page: perPage,
    sortBy,
    sortOrder
  })

  const { data: userData = [], isLoading: userDataLoading } = useGetUsersQuery()
  const { data: departmentData = [], isLoading: departmentDataLoading } = useGetDepartmentsQuery()
  const { data: divisionData = [], isLoading: divisionDataLoading } = useGetDivisionsQuery()



  if (isLoading || userDataLoading || departmentDataLoading || divisionDataLoading) return <DashboardPageSkeleton />

  return (
    <>
      <AttendanceListEnhanced
        attendancesData={attendancesData.data || []}
        userData={userData}
        divisionData={divisionData}
        departmentData={departmentData}
        totalItems={attendancesData.total || 0}
        refetch={refetch}
      />
    </>
  )
}

export default AttendanceListAppEnhanced
