// divisionApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const divisionApi = createApi({
  reducerPath: 'divisionApi',
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
    })
  })
})

export const {
  useGetDivisionsQuery,
  useGetDivisionQuery,
  useCreateDivisionMutation,
  useUpdateDivisionMutation,
  useDeleteDivisionMutation
} = divisionApi
