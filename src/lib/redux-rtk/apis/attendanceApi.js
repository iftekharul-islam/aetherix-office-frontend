import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseUrl } from '@/config'


export const attendanceApi = createApi({
  reducerPath: 'attendanceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: headers => {
      const token = localStorage.getItem('token')

      if (token) headers.set('Authorization', `Bearer ${token}`)

      return headers
    },
    credentials: 'include'
  }),
  endpoints: builder => ({
    getAttendances: builder.query({
      // Accept query params: page, per_page, search, type, user_id, from, to
      query: ({ page = 1, per_page = 10, search = '', type, user_id, from, to } = {}) => {
        const params = new URLSearchParams()

        params.append('page', page)
        params.append('per_page', per_page)
        if (search) params.append('search', search)
        if (type) params.append('type', type)
        if (user_id) params.append('user_id', user_id)

        if (from && to) {
          params.append('from', from)
          params.append('to', to)
        }

        return `machine-attendances?${params.toString()}`
      }
    }),
    getAttendanceSummary: builder.query({
      query: ({ page = 1, per_page = 10, search = '', type, user_id, department_id, division_id, from, to } = {}) => {
        const params = new URLSearchParams()

        params.append('page', page)
        params.append('per_page', per_page)
        if (search) params.append('search', search)
        if (type) params.append('type', type)
        if (user_id) params.append('user_id', user_id)
        if (department_id) params.append('department_id', department_id)
        if (division_id) params.append('division_id', division_id)

        if (from && to) {
          params.append('from', from)
          params.append('to', to)
        } else if (from) {
          params.append('date', from) 
        } else if (to) {
          params.append('date', to) 
        }

        return `machine-attendances/summary?${params.toString()}`
      }
    }),

    getAttendance: builder.query({
      query: id => `machine-attendances/${id}`
    }),
    createAttendance: builder.mutation({
      query: attendance => ({
        url: 'machine-attendances',
        method: 'POST',
        body: attendance
      })
    }),
    updateAttendance: builder.mutation({
      query: ({ id, ...attendance }) => ({
        url: `machine-attendances/${id}`,
        method: 'PUT',
        body: attendance
      })
    }),
    deleteAttendance: builder.mutation({
      query: id => ({
        url: `machine-attendances/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetAttendancesQuery,
  useGetAttendanceQuery,
  useCreateAttendanceMutation,
  useUpdateAttendanceMutation,
  useDeleteAttendanceMutation,
  useGetAttendanceSummaryQuery
} = attendanceApi
