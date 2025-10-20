import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'


import { baseUrl } from '@/config'


const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: headers => {
    const token = localStorage.getItem('token')

    if (token) headers.set('Authorization', `Bearer ${token}`)
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')

    return headers
  },
  credentials: 'include',
  validateStatus: (response, result) => {
    if (response.status === 401 || response.status === 403) {
      localStorage.clear()

      

      if (typeof window !== 'undefined') {
        window.location.replace('/login') 
      }

      return false
    }

    return response.status >= 200 && response.status < 300
  }
})

export default baseQuery
