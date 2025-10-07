import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://demo-attendance-management.test/api/' }),
  endpoints: builder => ({
    getEmployees: builder.query({
      query: () => 'employees'
    }),
    getEmployee: builder.query({
      query: id => `employees/${id}`
    }),
    addEmployee: builder.mutation({
      query: employee => ({
        url: 'employees',
        method: 'POST',
        body: employee
      })
    }),
    updateEmployee: builder.mutation({
      query: ({ id, ...employee }) => ({
        url: `employees/${id}`,
        method: 'PUT',
        body: employee
      })
    }),
    deleteEmployee: builder.mutation({
      query: id => ({
        url: `employees/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation
} = employeeApi
