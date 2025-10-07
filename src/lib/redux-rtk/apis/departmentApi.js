// src/lib/redux-rtk/apis/departmentApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const departmentApi = createApi({
  reducerPath: 'departmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://demo-attendance-management.test/api/',
    prepareHeaders: headers => {
      const token = localStorage.getItem('token')

      if (token) headers.set('Authorization', `Bearer ${token}`)

      return headers
    },
    credentials: 'include'
  }),

  endpoints: builder => ({
    getDepartments: builder.query({
      query: () => 'departments'
    }),
    getDepartment: builder.query({
      query: id => `departments/${id}`
    }),
    createDepartment: builder.mutation({
      query: department => ({
        url: 'departments',
        method: 'POST',
        body: department
      })
    }),
    updateDepartment: builder.mutation({
      query: ({ id, ...department }) => ({
        url: `departments/${id}`,
        method: 'PUT',
        body: department
      })
    }),
    deleteDepartment: builder.mutation({
      query: id => ({
        url: `departments/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetDepartmentsQuery,
  useGetDepartmentQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation
} = departmentApi
