



// // 'use client'

// // import { useState, useEffect, forwardRef } from 'react'

// // import { useSelector, useDispatch } from 'react-redux'
// // import Grid from '@mui/material/Grid'
// // import Typography from '@mui/material/Typography'
// // import CardContent from '@mui/material/CardContent'
// // import { format } from 'date-fns'

// // import CustomTextField from '@core/components/mui/TextField'
// // import CustomAutocomplete from '@core/components/mui/Autocomplete'
// // import {
// //   setSelectedType,
// //   setSelectedUser,
// //   setSelectedDivision,
// //   setSelectedDepartment,
// //   setDateRange
// // } from '@/lib/redux-rtk/slices/attendanceSlice'
// // import CustomAvatar from '@/@core/components/mui/Avatar'
// // import { getInitials } from '@/utils/getInitials'
// // import AppReactDatepicker from '../AppReactDatepicker'

// // const AttendanceTableFiltersEnhanced = ({ userData, divisionData = [], departmentData = [] }) => {
// //   const dispatch = useDispatch()

// //   const { selectedUser, selectedType, selectedDivision, selectedDepartment, dateRange } = useSelector(
// //     state => state.attendanceSlice
// //   )

// //   const [startDateRange, setStartDateRange] = useState(new Date())
// //   const [endDateRange, setEndDateRange] = useState(null)
// //   const [openToDate, setOpenToDate] = useState(new Date())

// //   // Type options
// //   const typeOptions = [
// //     { id: 'checkin', name: 'Check-In' },
// //     { id: 'checkout', name: 'Check-Out' }
// //   ]

// //   // Sync Redux -> local state when Redux changes (e.g., resetFilters)
// //   useEffect(() => {
// //     if (dateRange.start) {
// //       const startDate = new Date(dateRange.start)

// //       setStartDateRange(startDate)
// //       setEndDateRange(dateRange.end ? new Date(dateRange.end) : null)
// //     } else {
// //       setStartDateRange(null)
// //       setEndDateRange(null)
// //       setOpenToDate(new Date())
// //     }
// //   }, [dateRange])

// //   const handleOnChangeRange = dates => {
// //     const [start, end] = dates

// //     setStartDateRange(start)
// //     setEndDateRange(end)

// //     if (start) {
// //       setOpenToDate(start)
// //     }

// //     dispatch(
// //       setDateRange({
// //         start: start ? format(start, 'yyyy-MM-dd') : '',
// //         end: end ? format(end, 'yyyy-MM-dd') : ''
// //       })
// //     )
// //   }

// //   const CustomInput = forwardRef((props, ref) => {
// //     const { label, start, end, ...rest } = props
// //     const startDate = start ? format(start, 'dd-MM-yyyy') : ''
// //     const endDate = end ? ` - ${format(end, 'dd-MM-yyyy')}` : ''
// //     const value = `${startDate}${endDate}`

// //     return <CustomTextField fullWidth inputRef={ref} {...rest} label={label} value={value} />
// //   })

// //   const getAvatar = params => {
// //     const { avatar, fullName } = params

// //     if (avatar) {
// //       return <CustomAvatar src={avatar} size={34} />
// //     } else {
// //       return <CustomAvatar size={34}>{getInitials(fullName)}</CustomAvatar>
// //     }
// //   }

// //   // Get selected objects for Autocomplete values
// //   const selectedUserObject = userData.find(u => u.id === selectedUser) || null
// //   const selectedTypeObject = typeOptions.find(t => t.id === selectedType) || null
// //   const selectedDivisionObject = divisionData.find(d => d.id === selectedDivision) || null
// //   const selectedDepartmentObject = departmentData.find(d => d.id === selectedDepartment) || null

// //   return (
// //     <CardContent>
// //       <Grid container spacing={6} alignItems='center'>
// //         {/* User Autocomplete Filter */}
// //         <Grid item xs={12} sm={6} md={4}>
// //           <CustomAutocomplete
// //             fullWidth
// //             options={userData}
// //             value={selectedUserObject}
// //             onChange={(e, newValue) => {
// //               dispatch(setSelectedUser(newValue?.id || ''))
// //             }}
// //             getOptionLabel={option => option.name || ''}
// //             isOptionEqualToValue={(option, value) => option.id === value.id}
// //             renderInput={params => <CustomTextField {...params} placeholder='Search users...' />}
// //             renderOption={(props, option) => (
// //               <li {...props} key={option.id}>
// //                 <div className='flex items-center gap-3 w-full'>
// //                   {getAvatar({ fullName: option.name })}
// //                   <div className='flex flex-col flex-1'>
// //                     <Typography>
// //                       {option.name}{' '}
// //                       <span className='px-1 py-0.5 bg-primaryLight text-xs rounded-md'>{option.employee_id}</span>
// //                     </Typography>
// //                     <Typography variant='body2' className='text-sm'>
// //                       {option.email}
// //                     </Typography>
// //                   </div>
// //                 </div>
// //               </li>
// //             )}
// //             noOptionsText='No users found'
// //           />
// //         </Grid>

// //         {/* Type Autocomplete Filter */}
// //         <Grid item xs={12} sm={6} md={4}>
// //           <CustomAutocomplete
// //             fullWidth
// //             options={typeOptions}
// //             value={selectedTypeObject}
// //             onChange={(e, newValue) => {
// //               dispatch(setSelectedType(newValue?.id || ''))
// //             }}
// //             getOptionLabel={option => option.name || ''}
// //             isOptionEqualToValue={(option, value) => option.id === value.id}
// //             renderInput={params => <CustomTextField {...params} placeholder='Search type...' />}
// //             renderOption={(props, option) => (
// //               <li {...props} key={option.id}>
// //                 <Typography color='text.primary'>{option.name}</Typography>
// //               </li>
// //             )}
// //             noOptionsText='No types found'
// //           />
// //         </Grid>

// //         {/* Division Autocomplete Filter */}
// //         <Grid item xs={12} sm={6} md={4}>
// //           <CustomAutocomplete
// //             fullWidth
// //             options={divisionData}
// //             value={selectedDivisionObject}
// //             onChange={(e, newValue) => {
// //               dispatch(setSelectedDivision(newValue?.id || ''))
// //             }}
// //             getOptionLabel={option => option.name || ''}
// //             isOptionEqualToValue={(option, value) => option.id === value.id}
// //             renderInput={params => <CustomTextField {...params} placeholder='Search division...' />}
// //             renderOption={(props, option) => (
// //               <li {...props} key={option.id}>
// //                 <Typography color='text.primary'>{option.name}</Typography>
// //               </li>
// //             )}
// //             noOptionsText='No divisions found'
// //           />
// //         </Grid>

// //         {/* Department Autocomplete Filter */}
// //         <Grid item xs={12} sm={6} md={4}>
// //           <CustomAutocomplete
// //             fullWidth
// //             options={departmentData}
// //             value={selectedDepartmentObject}
// //             onChange={(e, newValue) => {
// //               dispatch(setSelectedDepartment(newValue?.id || ''))
// //             }}
// //             getOptionLabel={option => option.name || ''}
// //             isOptionEqualToValue={(option, value) => option.id === value.id}
// //             renderInput={params => <CustomTextField {...params} placeholder='Search department...' />}
// //             renderOption={(props, option) => (
// //               <li {...props} key={option.id}>
// //                 <Typography color='text.primary'>
// //                   {option.name} <span className='text-sm'>({option.division?.name || 'N/A'})</span>
// //                 </Typography>
// //               </li>
// //             )}
// //             noOptionsText='No departments found'
// //           />
// //         </Grid>

// //         {/* Date Range Picker */}
// //         <Grid item xs={12} sm={6} md={4} >
       
// //           <AppReactDatepicker
        
// //             selectsRange
// //             isClearable
// //             monthsShown={1}
// //             dateFormat='dd-MM-yyyy'
// //             endDate={endDateRange}
// //             selected={startDateRange}
// //             startDate={startDateRange}
// //             openToDate={openToDate}
// //             onMonthChange={date => setOpenToDate(date)}
// //             onYearChange={date => setOpenToDate(date)}
// //             shouldCloseOnSelect={false}
// //             id='date-range-picker-months'
// //             placeholderText='Select Date Range...'
// //             onChange={handleOnChangeRange}
// //             customInput={<CustomInput  end={endDateRange} start={startDateRange} fullWidth/>}
// //           />
// //         </Grid>
// //       </Grid>
// //     </CardContent>
// //   )
// // }

// // export default AttendanceTableFiltersEnhanced




// 'use client'

// import { useState, useEffect, forwardRef } from 'react'

// import { useSelector, useDispatch } from 'react-redux'
// import Grid from '@mui/material/Grid'
// import Typography from '@mui/material/Typography'
// import CardContent from '@mui/material/CardContent'
// import { format } from 'date-fns'

// import CustomTextField from '@core/components/mui/TextField'
// import CustomAutocomplete from '@core/components/mui/Autocomplete'
// import {
//   setSelectedType,
//   setSelectedUser,
//   setSelectedDivision,
//   setSelectedDepartment,
//   setDateRange
// } from '@/lib/redux-rtk/slices/attendanceSlice'
// import CustomAvatar from '@/@core/components/mui/Avatar'
// import { getInitials } from '@/utils/getInitials'
// import AppReactDatepicker from '../AppReactDatepicker'

// const AttendanceTableFiltersEnhanced = ({ userData, divisionData = [], departmentData = [] }) => {
//   const dispatch = useDispatch()

//   const { selectedUser, selectedType, selectedDivision, selectedDepartment, dateRange } = useSelector(
//     state => state.attendanceSlice
//   )

//   const [startDateRange, setStartDateRange] = useState(null)
//   const [endDateRange, setEndDateRange] = useState(null)
//   const [openToDate, setOpenToDate] = useState(new Date())

//   const typeOptions = [
//     { id: 'checkin', name: 'Check-In' },
//     { id: 'checkout', name: 'Check-Out' }
//   ]

//   useEffect(() => {
//     if (dateRange.start) {
//       const startDate = new Date(dateRange.start)

//       setStartDateRange(startDate)
//       setEndDateRange(dateRange.end ? new Date(dateRange.end) : null)
//     } else {
//       setStartDateRange(null)
//       setEndDateRange(null)
//       setOpenToDate(new Date())
//     }
//   }, [dateRange])

//   const handleOnChangeRange = dates => {
//     const [start, end] = dates

//     setStartDateRange(start)
//     setEndDateRange(end)

//     if (start) {
//       setOpenToDate(start)
      
//       // Only dispatch date range when a date is actually selected
//       dispatch(
//         setDateRange({
//           start: format(start, 'yyyy-MM-dd'),
//           end: end ? format(end, 'yyyy-MM-dd') : ''
//         })
//       )
//     } else {
//       // Clear date range when no date is selected
//       dispatch(
//         setDateRange({
//           start: '',
//           end: ''
//         })
//       )
//     }
//   }

//   const CustomInput = forwardRef((props, ref) => {
//     const { label, start, end, ...rest } = props
//     const startDate = start ? format(start, 'dd-MM-yyyy') : ''
//     const endDate = end ? ` - ${format(end, 'dd-MM-yyyy')}` : ''
//     const value = `${startDate}${endDate}`

//     return <CustomTextField fullWidth inputRef={ref} {...rest} label={label} value={value} />
//   })

//   const getAvatar = params => {
//     const { avatar, fullName } = params

//     if (avatar) {
//       return <CustomAvatar src={avatar} size={34} />
//     } else {
//       return <CustomAvatar size={34}>{getInitials(fullName)}</CustomAvatar>
//     }
//   }

//   const selectedUserObject = userData.find(u => u.id === selectedUser) || null
//   const selectedTypeObject = typeOptions.find(t => t.id === selectedType) || null
//   const selectedDivisionObject = divisionData.find(d => d.id === selectedDivision) || null
//   const selectedDepartmentObject = departmentData.find(d => d.id === selectedDepartment) || null

//   const handleAutocompleteChange = (dispatchAction) => (event, newValue) => {
//     // Only dispatch if newValue has an id, otherwise dispatch empty string
//     dispatch(dispatchAction(newValue?.id ? newValue.id : ''))
//   }

//   return (
//     <CardContent>
//       <Grid container spacing={6} alignItems='center'>
//         {/* User Autocomplete Filter */}
//         <Grid item xs={12} sm={6} md={4}>
//           <CustomAutocomplete
//             fullWidth
//             options={userData}
//             value={selectedUserObject}
//             onChange={handleAutocompleteChange(setSelectedUser)}
//             getOptionLabel={option => option.name || ''}
//             isOptionEqualToValue={(option, value) => option.id === value.id}
//             renderInput={params => <CustomTextField {...params} placeholder='Search users...' />}
//             renderOption={(props, option) => (
//               <li {...props} key={option.id}>
//                 <div className='flex items-center gap-3 w-full'>
//                   {getAvatar({ fullName: option.name })}
//                   <div className='flex flex-col flex-1'>
//                     <Typography>
//                       {option.name}{' '}
//                       <span className='px-1 py-0.5 bg-primaryLight text-xs rounded-md'>{option.employee_id}</span>
//                     </Typography>
//                     <Typography variant='body2' className='text-sm'>
//                       {option.email}
//                     </Typography>
//                   </div>
//                 </div>
//               </li>
//             )}
//             noOptionsText='No users found'
//           />
//         </Grid>

//         {/* Type Autocomplete Filter */}
//         <Grid item xs={12} sm={6} md={4}>
//           <CustomAutocomplete
//             fullWidth
//             options={typeOptions}
//             value={selectedTypeObject}
//             onChange={handleAutocompleteChange(setSelectedType)}
//             getOptionLabel={option => option.name || ''}
//             isOptionEqualToValue={(option, value) => option.id === value.id}
//             renderInput={params => <CustomTextField {...params} placeholder='Search type...' />}
//             renderOption={(props, option) => (
//               <li {...props} key={option.id}>
//                 <Typography color='text.primary'>{option.name}</Typography>
//               </li>
//             )}
//             noOptionsText='No types found'
//           />
//         </Grid>

//         {/* Division Autocomplete Filter */}
//         <Grid item xs={12} sm={6} md={4}>
//           <CustomAutocomplete
//             fullWidth
//             options={divisionData}
//             value={selectedDivisionObject}
//             onChange={handleAutocompleteChange(setSelectedDivision)}
//             getOptionLabel={option => option.name || ''}
//             isOptionEqualToValue={(option, value) => option.id === value.id}
//             renderInput={params => <CustomTextField {...params} placeholder='Search division...' />}
//             renderOption={(props, option) => (
//               <li {...props} key={option.id}>
//                 <Typography color='text.primary'>{option.name}</Typography>
//               </li>
//             )}
//             noOptionsText='No divisions found'
//           />
//         </Grid>

//         {/* Department Autocomplete Filter */}
//         <Grid item xs={12} sm={6} md={4}>
//           <CustomAutocomplete
//             fullWidth
//             options={departmentData}
//             value={selectedDepartmentObject}
//             onChange={handleAutocompleteChange(setSelectedDepartment)}
//             getOptionLabel={option => option.name || ''}
//             isOptionEqualToValue={(option, value) => option.id === value.id}
//             renderInput={params => <CustomTextField {...params} placeholder='Search department...' />}
//             renderOption={(props, option) => (
//               <li {...props} key={option.id}>
//                 <Typography color='text.primary'>
//                   {option.name} <span className='text-sm'>({option.division?.name || 'N/A'})</span>
//                 </Typography>
//               </li>
//             )}
//             noOptionsText='No departments found'
//           />
//         </Grid>

//         {/* Date Range Picker */}
//         <Grid item xs={12} sm={6} md={4}>
//           <AppReactDatepicker
//             selectsRange
//             isClearable
//             monthsShown={1}
//             dateFormat='dd-MM-yyyy'
//             endDate={endDateRange}
//             selected={startDateRange}
//             startDate={startDateRange}
//             openToDate={openToDate}
//             onMonthChange={date => setOpenToDate(date)}
//             onYearChange={date => setOpenToDate(date)}
//             shouldCloseOnSelect={false}
//             id='date-range-picker-months'
//             placeholderText='Select Date Range...'
//             onChange={handleOnChangeRange}
//             customInput={<CustomInput end={endDateRange} start={startDateRange} fullWidth />}
//           />
//         </Grid>
//       </Grid>
//     </CardContent>
//   )
// }

// export default AttendanceTableFiltersEnhanced




'use client'

import { useState, useEffect, forwardRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { format } from 'date-fns'

import CustomTextField from '@core/components/mui/TextField'
import CustomAutocomplete from '@core/components/mui/Autocomplete'
import {
  setSelectedType,
  setSelectedUser,
  setSelectedDivision,
  setSelectedDepartment,
  setDateRange,
  setPage
} from '@/lib/redux-rtk/slices/attendanceSlice'
import CustomAvatar from '@/@core/components/mui/Avatar'
import { getInitials } from '@/utils/getInitials'
import AppReactDatepicker from '../AppReactDatepicker'

const AttendanceTableFiltersEnhanced = ({ userData, divisionData = [], departmentData = [] }) => {
  const dispatch = useDispatch()

  const { selectedUser, selectedType, selectedDivision, selectedDepartment, dateRange } = useSelector(
    state => state.attendanceSlice
  )

  const [startDateRange, setStartDateRange] = useState(null)
  const [endDateRange, setEndDateRange] = useState(null)
  const [openToDate, setOpenToDate] = useState(new Date())

  const typeOptions = [
    { id: 'checkin', name: 'Check-In' },
    { id: 'checkout', name: 'Check-Out' }
  ]

  useEffect(() => {
    if (dateRange.start) {
      const startDate = new Date(dateRange.start)

      setStartDateRange(startDate)
      setEndDateRange(dateRange.end ? new Date(dateRange.end) : null)
    } else {
      setStartDateRange(null)
      setEndDateRange(null)
      setOpenToDate(new Date())
    }
  }, [dateRange])

  const handleOnChangeRange = dates => {
    const [start, end] = dates

    setStartDateRange(start)
    setEndDateRange(end)

    if (start) {
      setOpenToDate(start)
      
      // Only dispatch date range when a date is actually selected
      dispatch(setPage(1)) // Reset to page 1
      dispatch(
        setDateRange({
          start: format(start, 'yyyy-MM-dd'),
          end: end ? format(end, 'yyyy-MM-dd') : ''
        })
      )
    } else {
      // Clear date range when no date is selected
      dispatch(setPage(1)) // Reset to page 1
      dispatch(
        setDateRange({
          start: '',
          end: ''
        })
      )
    }
  }

  const CustomInput = forwardRef((props, ref) => {
    const { label, start, end, ...rest } = props
    const startDate = start ? format(start, 'dd-MM-yyyy') : ''
    const endDate = end ? ` - ${format(end, 'dd-MM-yyyy')}` : ''
    const value = `${startDate}${endDate}`

    return <CustomTextField fullWidth inputRef={ref} {...rest} label={label} value={value} />
  })

  const getAvatar = params => {
    const { avatar, fullName } = params

    if (avatar) {
      return <CustomAvatar src={avatar} size={34} />
    } else {
      return <CustomAvatar size={34}>{getInitials(fullName)}</CustomAvatar>
    }
  }

  const selectedUserObject = userData.find(u => u.id === selectedUser) || null
  const selectedTypeObject = typeOptions.find(t => t.id === selectedType) || null
  const selectedDivisionObject = divisionData.find(d => d.id === selectedDivision) || null
  const selectedDepartmentObject = departmentData.find(d => d.id === selectedDepartment) || null

  const handleAutocompleteChange = (dispatchAction) => (event, newValue) => {
    // Reset to page 1 when filter changes
    dispatch(setPage(1))
    
    // Only dispatch if newValue has an id, otherwise dispatch empty string

    dispatch(dispatchAction(newValue?.id ? newValue.id : ''))
  }

  return (
    <CardContent>
      <Grid container spacing={6} alignItems='center'>
        {/* User Autocomplete Filter */}
        <Grid item xs={12} sm={6} md={4}>
          <CustomAutocomplete
            fullWidth
            options={userData}
            value={selectedUserObject}
            onChange={handleAutocompleteChange(setSelectedUser)}
            getOptionLabel={option => option.name || ''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={params => <CustomTextField {...params} placeholder='Search users...' />}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                <div className='flex items-center gap-3 w-full'>
                  {getAvatar({ fullName: option.name })}
                  <div className='flex flex-col flex-1'>
                    <Typography>
                      {option.name}{' '}
                      <span className='px-1 py-0.5 bg-primaryLight text-xs rounded-md'>{option.employee_id}</span>
                    </Typography>
                    <Typography variant='body2' className='text-sm'>
                      {option.email}
                    </Typography>
                  </div>
                </div>
              </li>
            )}
            noOptionsText='No users found'
          />
        </Grid>

        {/* Type Autocomplete Filter */}

      
        <Grid item xs={12} sm={6} md={4}>
          <CustomAutocomplete
            fullWidth
            options={typeOptions}
            value={selectedTypeObject}
            onChange={handleAutocompleteChange(setSelectedType)}
            getOptionLabel={option => option.name || ''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={params => <CustomTextField {...params} placeholder='Search type...' />}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                <Typography color='text.primary'>{option.name}</Typography>
              </li>
            )}
            noOptionsText='No types found'
          />
        </Grid>

        {/* Division Autocomplete Filter */}
        <Grid item xs={12} sm={6} md={4}>
          <CustomAutocomplete
            fullWidth
            options={divisionData}
            value={selectedDivisionObject}
            onChange={handleAutocompleteChange(setSelectedDivision)}
            getOptionLabel={option => option.name || ''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={params => <CustomTextField {...params} placeholder='Search division...' />}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                <Typography color='text.primary'>{option.name}</Typography>
              </li>
            )}
            noOptionsText='No divisions found'
          />
        </Grid>

        {/* Department Autocomplete Filter */}
        <Grid item xs={12} sm={6} md={4}>
          <CustomAutocomplete
            fullWidth
            options={departmentData}
            value={selectedDepartmentObject}
            onChange={handleAutocompleteChange(setSelectedDepartment)}
            getOptionLabel={option => option.name || ''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={params => <CustomTextField {...params} placeholder='Search department...' />}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                <Typography color='text.primary'>
                  {option.name} <span className='text-sm'>({option.division?.name || 'N/A'})</span>
                </Typography>
              </li>
            )}
            noOptionsText='No departments found'
          />
        </Grid>

        {/* Date Range Picker */}
        <Grid item xs={12} sm={6} md={4}>
          <AppReactDatepicker
            selectsRange
            isClearable
            monthsShown={1}
            dateFormat='dd-MM-yyyy'
            endDate={endDateRange}
            selected={startDateRange}
            startDate={startDateRange}
            openToDate={openToDate}
            onMonthChange={date => setOpenToDate(date)}
            onYearChange={date => setOpenToDate(date)}
            shouldCloseOnSelect={false}
            id='date-range-picker-months'
            placeholderText='Select Date Range...'
            onChange={handleOnChangeRange}
            customInput={<CustomInput end={endDateRange} start={startDateRange} fullWidth />}
          />
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default AttendanceTableFiltersEnhanced
