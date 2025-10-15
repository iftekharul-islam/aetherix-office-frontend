import { createApi } from '@reduxjs/toolkit/query/react'

import baseQuery from './baseQuery'

export const attendanceApi = createApi({
  reducerPath: 'attendanceApi',
  baseQuery,
  endpoints: builder => ({
    getAttendances: builder.query({
      query: ({ page = 1, per_page = 10, search = '', type, user_id, from, to, sortBy = '', sortOrder = '' } = {}) => {
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

        if (sortBy) params.append('sort_by', sortBy)
        if (sortOrder) params.append('sort_order', sortOrder)

        return `machine-attendances?${params.toString()}`
      }
    }),
    getAttendanceSummary: builder.query({
      query: ({
        page = 1,
        per_page = 10,
        search = '',
        type,
        user_id,
        department_id,
        division_id,
        from,
        to,
        sortBy = '',
        sortOrder = ''
      } = {}) => {
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

        if (sortBy) params.append('sort_by', sortBy)
        if (sortOrder) params.append('sort_order', sortOrder)

        return `machine-attendances/summary?${params.toString()}`
      }
    }),
    getAttendance: builder.query({ query: id => `machine-attendances/${id}` }),
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
      query: id => ({ url: `machine-attendances/${id}`, method: 'DELETE' })
    }),
    softDeleteAttendance: builder.mutation({
      query: id => ({ url: `attendance/${id}/soft-delete`, method: 'PATCH' })
    }),
    exportAttendances: builder.mutation({
      query: ({ user_id, type, division_id, department_id, from, to, search , sortBy = '',
        sortOrder = '' } = {}) => {
        const params = new URLSearchParams()

        if (user_id) params.append('user_id', user_id)
        if (type) params.append('type', type)
        if (division_id) params.append('division_id', division_id)
        if (department_id) params.append('department_id', department_id)
        if (from) params.append('from', from)
        if (to) params.append('to', to)
        if (search) params.append('search', search)

        if (sortBy) params.append('sort_by', sortBy)
        if (sortOrder) params.append('sort_order', sortOrder)

        return {
          url: `export/attendances?${params.toString()}`,
          method: 'GET',
          responseHandler: async res => await res.blob()
        }
      }
    }),
    exportAttendanceDetails: builder.mutation({
      query: ({ user_id, date } = {}) => {
        const params = new URLSearchParams()

        if (user_id) params.append('user_id', user_id)

        if (date) {
          params.append('from', date)
          params.append('to', date)
        }

        return {
          url: `export/attendance-details?${params.toString()}`,
          method: 'GET',
          responseHandler: async res => await res.blob()
        }
      }
    })
  })
})

export const {
  useGetAttendancesQuery,
  useGetAttendanceQuery,
  useCreateAttendanceMutation,
  useUpdateAttendanceMutation,
  useDeleteAttendanceMutation,
  useSoftDeleteAttendanceMutation,
  useGetAttendanceSummaryQuery,
  useExportAttendancesMutation,
  useExportAttendanceDetailsMutation
} = attendanceApi





