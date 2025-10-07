// Component Imports
// import UserList from '@views/apps/user/list'
'use client'

import DashboardPageSkeleton from '@/components/dashboard-page-skeleton'
import DepartmentList from '@/components/departments/DepartmentList'
import { useGetDepartmentsQuery } from '@/lib/redux-rtk/apis/departmentApi'
import { useGetDivisionsQuery } from '@/lib/redux-rtk/apis/divisionApi'

import { useGetUsersQuery } from '@/lib/redux-rtk/apis/userApi'

const DepartmentListApp = () => {
  const { data: departmentsData = [], isLoading } = useGetDepartmentsQuery()
  const { data: users = [], isLoading: usersLoading } = useGetUsersQuery()
  const { data: divisionData = [] } = useGetDivisionsQuery()

  console.log({ departmentsData })

  if (isLoading) return <DashboardPageSkeleton />

  return <DepartmentList departmentsData={departmentsData} employeeData={users} divisionData={divisionData} />
}

export default DepartmentListApp
