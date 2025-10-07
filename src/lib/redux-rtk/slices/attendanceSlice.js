import { createSlice } from '@reduxjs/toolkit'
import { format } from 'date-fns'


const today = format(new Date(), 'yyyy-MM-dd')

const initialState = {
  search: '',
  selectedUser: '',
  selectedType: '',
  selectedDivision: '',
  selectedDepartment: '',

  dateRange: { start: today, end: '' }, 
  page: 1,
  perPage: 10
}

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload
    },
    setSelectedDivision: (state, action) => {
      state.selectedDivision = action.payload
    },
    setSelectedDepartment: (state, action) => {
      state.selectedDepartment = action.payload
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload // { start: 'YYYY-MM-DD', end: 'YYYY-MM-DD' }
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload
    },
    resetFilters: state => {
      state.search = ''
      state.selectedUser = ''
      state.selectedType = ''
      state.selectedDivision = ''
      state.selectedDepartment = ''

      state.dateRange = { start: '', end: '' }

    
      state.page = 1
      state.perPage = 10
    }
  }
})

export const {
  setSearch,
  setSelectedUser,
  setSelectedType,
  setSelectedDivision,
  setSelectedDepartment,
  setDateRange,
  setPage,
  setPerPage,
  resetFilters
} = attendanceSlice.actions

export default attendanceSlice.reducer
