'use client'

import DashboardPageSkeleton from '@/components/dashboard-page-skeleton'

// Component Imports
// import UserList from '@views/apps/user/list'

import UserList from '@/components/users/UserList'
import { useGetDepartmentsQuery } from '@/lib/redux-rtk/apis/departmentApi'
import { useGetUsersQuery } from '@/lib/redux-rtk/apis/userApi'

// Data Imports
// import { getUserData } from '@/app/server/actions'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/user-list` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */
/* const getUserData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/user-list`)

  if (!res.ok) {
    throw new Error('Failed to fetch userData')
  }

  return res.json()
} */
const UserListApp = () => {
  const { data: userData = [], isLoading } = useGetUsersQuery()

  const { data: departmentsData = [] } = useGetDepartmentsQuery()
  const { data: usersData = [] } = useGetUsersQuery()



  if (isLoading) return <DashboardPageSkeleton />

  return <UserList userData={userData} departmentsData={departmentsData} usersData={usersData} />
}

export default UserListApp
