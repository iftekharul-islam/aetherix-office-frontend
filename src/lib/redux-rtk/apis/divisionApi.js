
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import baseQuery from './baseQuery'
import { baseUrl } from '@/config'


export const divisionApi = createApi({
  reducerPath: 'divisionApi',

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
    getDivisions: builder.query({
      query: () => 'divisions'
    }),
    getDivision: builder.query({
      query: id => `divisions/${id}`
    }),
    createDivision: builder.mutation({
      query: division => ({
        url: 'divisions',
        method: 'POST',
        body: division
      })
    }),
    updateDivision: builder.mutation({
      query: ({ id, ...division }) => ({
        url: `divisions/${id}`,
        method: 'PUT',
        body: division
      })
    }),
    deleteDivision: builder.mutation({
      query: id => ({
        url: `divisions/${id}`,
        method: 'DELETE'
      })
    }),
     exportDivisions: builder.mutation({
      query: () => ({
        url: 'export/divisions',
        method: 'GET',
        responseHandler: async res => await res.blob()
      })
    })
  })
})

export const {
  useGetDivisionsQuery,
  useGetDivisionQuery,
  useCreateDivisionMutation,
  useUpdateDivisionMutation,
  useDeleteDivisionMutation,
  useExportDivisionsMutation
} = divisionApi
