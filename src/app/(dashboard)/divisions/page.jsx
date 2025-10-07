'use client'

import DivisionList from '@/components/divisions/DivisionList'
import { useGetDivisionsQuery } from '@/lib/redux-rtk/apis/divisionApi'
import DashboardPageSkeleton from '@/components/dashboard-page-skeleton'
import { useGetUsersQuery } from '@/lib/redux-rtk/apis/userApi'

const DivisionListApp = () => {
  const { data: divisionData = [], isLoading } = useGetDivisionsQuery()
  const { data: users = [], isLoading: usersLoading } = useGetUsersQuery()

  // console.log({ users })

  console.log({ divisionData })

  if (isLoading | usersLoading) return <DashboardPageSkeleton />

  return <DivisionList divisionData={divisionData} employeeData={users} />
}

export default DivisionListApp
