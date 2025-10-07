'use client'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
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
    // Authentication
    login: builder.mutation({
      query: data => ({
        url: 'login',
        method: 'POST',
        body: data
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST'
      })
    }),
    me: builder.query({
      query: () => 'user'
    }),

    // Users CRUD
    getUsers: builder.query({
      query: () => 'users'
    }),
    getUser: builder.query({
      query: id => `users/${id}`
    }),
    addUser: builder.mutation({
      query: user => ({
        url: 'users',
        method: 'POST',
        body: user
      })
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: data
      })
    }),
    deleteUser: builder.mutation({
      query: id => ({
        url: `users/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = userApi
