'use client'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import baseQuery from './baseQuery'



export const userApi = createApi({
  reducerPath: 'userApi',
  
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
    // Authentication
    login: builder.mutation({
      query: data => ({
        url: 'login',
        method: 'POST',
        body: data
      }),
       validateStatus: () => true,
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
    }),
    exportUsers: builder.mutation({
      query: () => ({
        url: 'export/users',
        method: 'GET',
        responseHandler: async res => await res.blob()
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
  useDeleteUserMutation,
  useExportUsersMutation
} = userApi
