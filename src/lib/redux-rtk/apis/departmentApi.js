// src/lib/redux-rtk/apis/departmentApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import baseQuery from './baseQuery'

import { baseUrl } from '@/config'


export const departmentApi = createApi({
  reducerPath: 'departmentApi',
  
  // baseQuery: fetchBaseQuery({
  //   baseUrl: baseUrl,
  //   prepareHeaders: headers => {
  //     const token = localStorage.getItem('token')

  //     if (token) headers.set('Authorization', `Bearer ${token}`)

  //     return headers
  //   },
  //   credentials: 'include'
  // }),

  baseQuery,

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
    }),
     exportDepartments: builder.mutation({
      query: () => ({
        url: 'export/departments',
        method: 'GET',
        responseHandler: async res => await res.blob()
      })
    })
  })
})

export const {
  useGetDepartmentsQuery,
  useGetDepartmentQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useExportDepartmentsMutation
} = departmentApi
