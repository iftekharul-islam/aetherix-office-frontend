import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Swal from 'sweetalert2'

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

       Swal.fire({
        icon: 'error',
        title: response.status === 401 ? 'Unauthorized' : 'Forbidden',
        text: response.status === 401 
          ? 'Your session has expired. Please login again.' 
          : 'You do not have permission to access this resource.',
        confirmButtonText: 'Go to Login',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed && typeof window !== 'undefined') {
          window.location.replace('/login')
        }
      })

      if (typeof window !== 'undefined') {
        window.location.replace('/login') 
      }

      return false
    }

    return response.status >= 200 && response.status < 300
  }
})

export default baseQuery
