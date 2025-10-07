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
const { selectedUser, selectedType, selectedDivision, selectedDepartment, dateRange, page, perPage, search } = useSelector(
  state => state.attendanceSlice
)



const { data: attendancesData = [], isLoading, isError } = useGetAttendanceSummaryQuery({
  user_id: selectedUser || undefined,
  type: selectedType || undefined,
  division_id: selectedDivision || undefined,
  department_id: selectedDepartment || undefined,
  from: dateRange.start || undefined,
  to: dateRange.end || undefined,
  search: search || undefined,
  page,
  per_page: perPage
})



  const { data: userData = [] } = useGetUsersQuery()
  const { data: departmentData = [] } = useGetDepartmentsQuery()
  const { data: divisionData = [] } = useGetDivisionsQuery()


  console.log('attendance data from attendance enhanced', attendancesData)

  // console.log('department data from attendance enhanced', departmentData)

  // console.log('user data from attendance enhanced', userData)

  // console.log('division data from attendance enhanced', divisionData)

  if (isLoading) return <DashboardPageSkeleton />
  if (isError) return <div>Error fetching data</div>

  return (
    <>
      <AttendanceListEnhanced
        attendancesData={attendancesData.data || []}
        userData={userData}
        divisionData={divisionData}
        departmentData={departmentData}
        totalItems={attendancesData.total || 0}
      />

      
    
    </>
  )
}

export default AttendanceListAppEnhanced
