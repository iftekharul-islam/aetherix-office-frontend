// // 'use client'

// // import { useState, useEffect, forwardRef } from 'react'

// // import { useSelector, useDispatch } from 'react-redux'
// // import Grid from '@mui/material/Grid'
// // import Typography from '@mui/material/Typography'
// // import CardContent from '@mui/material/CardContent'
// // import MenuItem from '@mui/material/MenuItem'
// // import { format } from 'date-fns'

// // import CustomTextField from '@core/components/mui/TextField'
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

// //   // Track the calendar's viewed month/year (independent of selected dates)
// //   const [openToDate, setOpenToDate] = useState(new Date())

// //   // Sync Redux -> local state when Redux changes (e.g., resetFilters)
// //   useEffect(() => {
// //     if (dateRange.start) {
// //       const startDate = new Date(dateRange.start)

// //       setStartDateRange(startDate)

// //       setEndDateRange(dateRange.end ? new Date(dateRange.end) : null)

// //       // Keep the current openToDate - don't change the viewed month when dates change from Redux
// //     } else {
// //       // Handle reset case - clear the dates
// //       setStartDateRange(null)
// //       setEndDateRange(null)

// //       // Reset to current date when filters are reset
// //       setOpenToDate(new Date())
// //     }
// //   }, [dateRange])

// //   const handleOnChangeRange = dates => {
// //     const [start, end] = dates

// //     setStartDateRange(start)
// //     setEndDateRange(end)

// //     // Only update openToDate when a date is actually selected
// //     // This preserves the viewed month when just navigating
// //     if (start) {
// //       setOpenToDate(start)
// //     }

// //     // Dispatch to Redux
// //     dispatch(
// //       setDateRange({
// //         start: start ? format(start, 'yyyy-MM-dd') : '',
// //         end: end ? format(end, 'yyyy-MM-dd') : ''
// //       })
// //     )
// //   }

// //   const CustomInput = forwardRef((props, ref) => {
// //     const { label, start, end, ...rest } = props

// //     // Handle null dates properly
// //     const startDate = start ? format(start, 'MM/dd/yyyy') : ''
// //     const endDate = end ? ` - ${format(end, 'MM/dd/yyyy')}` : ''

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

// //   return (
// //     <CardContent>
// //       <Grid container spacing={6} alignItems='center'>
// //         {/* User Filter */}
// //         <Grid item xs={12} sm={3}>
// //           <CustomTextField
// //             select
// //             fullWidth
// //             value={selectedUser}
// //             label='Select User'
// //             onChange={e => dispatch(setSelectedUser(e.target.value))}
// //             SelectProps={{
// //               renderValue: selected => {
// //                 if (!selected) return null
// //                 const user = userData.find(u => u.id === selected)

// //                 return (
// //                   <Typography color='text.primary' className='flex items-center gap-2'>
// //                     <span>{user.name}</span>
// //                     <span className='px-1 py-0.5 bg-primaryLight text-xs rounded-md'>{user.employee_id}</span>
// //                   </Typography>
// //                 )
// //               }
// //             }}
// //           >
// //             <MenuItem value=''>all employees</MenuItem>
// //             {userData.map(user => (
// //               <MenuItem key={user.id} value={user.id}>
// //                 {getAvatar({ fullName: user.name })}
// //                 <div>
// //                   <Typography>
// //                     {user.name}{' '}
// //                     <span className='px-1 py-0.5 bg-primaryLight text-xs rounded-md'>{user.employee_id}</span>
// //                   </Typography>
// //                   <Typography className='text-sm'>{user.email}</Typography>
// //                 </div>
// //               </MenuItem>
// //             ))}
// //           </CustomTextField>
// //         </Grid>

// //         {/* Type Filter */}
// //         <Grid item xs={12} sm={3}>
// //           <CustomTextField
// //             select
// //             fullWidth
// //             value={selectedType}
// //             label='Select Type'
// //             onChange={e => dispatch(setSelectedType(e.target.value))}
// //           >
// //             <MenuItem value=''>all types</MenuItem>
// //             <MenuItem value='checkin'>
// //               <Typography color='text.primary'>Check-In</Typography>
// //             </MenuItem>
// //             <MenuItem value='checkout'>
// //               <Typography color='text.primary'>Check-Out</Typography>
// //             </MenuItem>
// //           </CustomTextField>
// //         </Grid>

// //         {/* Division Filter */}
// //         <Grid item xs={12} sm={3}>
// //           <CustomTextField
// //             select
// //             fullWidth
// //             value={selectedDivision}
// //             label='Select Division'
// //             onChange={e => dispatch(setSelectedDivision(e.target.value))}
// //           >
// //             <MenuItem value=''>all divisions</MenuItem>
// //             {divisionData.map(div => (
// //               <MenuItem key={div.id} value={div.id}>
// //                 <Typography color='text.primary'> {div.name}</Typography>
// //               </MenuItem>
// //             ))}
// //           </CustomTextField>
// //         </Grid>

// //         {/* Department Filter */}
// //         <Grid item xs={12} sm={3}>
// //           <CustomTextField
// //             select
// //             fullWidth
// //             value={selectedDepartment}
// //             label='Select Department'
// //             onChange={e => dispatch(setSelectedDepartment(e.target.value))}
// //           >
// //             <MenuItem value=''>all departments</MenuItem>
// //             {departmentData.map(dept => (
// //               <MenuItem key={dept.id} value={dept.id}>
// //                 <Typography color='text.primary'>
// //                   {' '}
// //                   {dept.name} <span className='text-sm'>({dept.division?.name})</span>
// //                 </Typography>
// //               </MenuItem>
// //             ))}
// //           </CustomTextField>
// //         </Grid>

// //         {/* Date Range Picker - Maintains viewed month/year */}
// //         <Grid item xs={12} sm={3}>
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
// //             onChange={handleOnChangeRange}
// //             customInput={
// //               <CustomInput
// //                 label='Select Date(s)'
// //                 placeholder='Select Date Range'
// //                 end={endDateRange}
// //                 start={startDateRange}
// //               />
// //             }
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
// import MenuItem from '@mui/material/MenuItem'
// import { format } from 'date-fns'

// import CustomTextField from '@core/components/mui/TextField'
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

//   const [startDateRange, setStartDateRange] = useState(new Date())
//   const [endDateRange, setEndDateRange] = useState(null)

//   // Track the calendar's viewed month/year (independent of selected dates)
//   const [openToDate, setOpenToDate] = useState(new Date())

//   // Sync Redux -> local state when Redux changes (e.g., resetFilters)
//   useEffect(() => {
//     if (dateRange.start) {
//       const startDate = new Date(dateRange.start)

//       setStartDateRange(startDate)
//       setEndDateRange(dateRange.end ? new Date(dateRange.end) : null)

//       // Keep the current openToDate - don't change the viewed month when dates change from Redux
//     } else {
//       // Handle reset case - clear the dates
//       setStartDateRange(null)
//       setEndDateRange(null)

//       // Reset to current date when filters are reset
//       setOpenToDate(new Date())
//     }
//   }, [dateRange])

//   const handleOnChangeRange = dates => {
//     const [start, end] = dates

//     setStartDateRange(start)
//     setEndDateRange(end)

//     // Only update openToDate when a date is actually selected
//     // This preserves the viewed month when just navigating
//     if (start) {
//       setOpenToDate(start)
//     }

//     // Dispatch to Redux
//     dispatch(
//       setDateRange({
//         start: start ? format(start, 'yyyy-MM-dd') : '',
//         end: end ? format(end, 'yyyy-MM-dd') : ''
//       })
//     )
//   }

//   const CustomInput = forwardRef((props, ref) => {
//     const { label, start, end, ...rest } = props

//     // Handle null dates properly and format as dd-MM-yyyy
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

//   return (
//     <CardContent>
//       <Grid container spacing={6} alignItems='center'>
//         {/* User Filter */}
//         <Grid item xs={12} sm={3}>
//           <CustomTextField
//             select
//             fullWidth
//             value={selectedUser}
//             label='Select User'
//             onChange={e => dispatch(setSelectedUser(e.target.value))}
//             SelectProps={{
//               renderValue: selected => {
//                 if (!selected) return null
//                 const user = userData.find(u => u.id === selected)

//                 return (
//                   <Typography color='text.primary' className='flex items-center gap-2'>
//                     <span>{user.name}</span>
//                     <span className='px-1 py-0.5 bg-primaryLight text-xs rounded-md'>{user.employee_id}</span>
//                   </Typography>
//                 )
//               }
//             }}
//           >
//             <MenuItem value=''>all employees</MenuItem>
//             {userData.map(user => (
//               <MenuItem key={user.id} value={user.id}>
//                 {getAvatar({ fullName: user.name })}
//                 <div>
//                   <Typography>
//                     {user.name}{' '}
//                     <span className='px-1 py-0.5 bg-primaryLight text-xs rounded-md'>{user.employee_id}</span>
//                   </Typography>
//                   <Typography className='text-sm'>{user.email}</Typography>
//                 </div>
//               </MenuItem>
//             ))}
//           </CustomTextField>
//         </Grid>

//         {/* Type Filter */}
//         <Grid item xs={12} sm={3}>
//           <CustomTextField
//             select
//             fullWidth
//             value={selectedType}
//             label='Select Type'
//             onChange={e => dispatch(setSelectedType(e.target.value))}
//           >
//             <MenuItem value=''>all types</MenuItem>
//             <MenuItem value='checkin'>
//               <Typography color='text.primary'>Check-In</Typography>
//             </MenuItem>
//             <MenuItem value='checkout'>
//               <Typography color='text.primary'>Check-Out</Typography>
//             </MenuItem>
//           </CustomTextField>
//         </Grid>

//         {/* Division Filter */}
//         <Grid item xs={12} sm={3}>
//           <CustomTextField
//             select
//             fullWidth
//             value={selectedDivision}
//             label='Select Division'
//             onChange={e => dispatch(setSelectedDivision(e.target.value))}
//           >
//             <MenuItem value=''>all divisions</MenuItem>
//             {divisionData.map(div => (
//               <MenuItem key={div.id} value={div.id}>
//                 <Typography color='text.primary'> {div.name}</Typography>
//               </MenuItem>
//             ))}
//           </CustomTextField>
//         </Grid>

//         {/* Department Filter */}
//         <Grid item xs={12} sm={3}>
//           <CustomTextField
//             select
//             fullWidth
//             value={selectedDepartment}
//             label='Select Department'
//             onChange={e => dispatch(setSelectedDepartment(e.target.value))}
//           >
//             <MenuItem value=''>all departments</MenuItem>
//             {departmentData.map(dept => (
//               <MenuItem key={dept.id} value={dept.id}>
//                 <Typography color='text.primary'>
//                   {' '}
//                   {dept.name} <span className='text-sm'>({dept.division?.name})</span>
//                 </Typography>
//               </MenuItem>
//             ))}
//           </CustomTextField>
//         </Grid>

//         {/* Date Range Picker - Maintains viewed month/year */}
//         <Grid item xs={12} sm={6} md={3}>
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
//             onChange={handleOnChangeRange}
//             customInput={
//               <CustomInput
//                 label='Select Date(s)'
//                 placeholder='Select Date Range'
//                 end={endDateRange}
//                 start={startDateRange}
//               />
//             }
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
  setDateRange
} from '@/lib/redux-rtk/slices/attendanceSlice'
import CustomAvatar from '@/@core/components/mui/Avatar'
import { getInitials } from '@/utils/getInitials'
import AppReactDatepicker from '../AppReactDatepicker'

const AttendanceTableFiltersEnhanced = ({ userData, divisionData = [], departmentData = [] }) => {
  const dispatch = useDispatch()

  const { selectedUser, selectedType, selectedDivision, selectedDepartment, dateRange } = useSelector(
    state => state.attendanceSlice
  )

  const [startDateRange, setStartDateRange] = useState(new Date())
  const [endDateRange, setEndDateRange] = useState(null)
  const [openToDate, setOpenToDate] = useState(new Date())

  // Type options
  const typeOptions = [
    { id: 'checkin', name: 'Check-In' },
    { id: 'checkout', name: 'Check-Out' }
  ]

  // Sync Redux -> local state when Redux changes (e.g., resetFilters)
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
    }

    dispatch(
      setDateRange({
        start: start ? format(start, 'yyyy-MM-dd') : '',
        end: end ? format(end, 'yyyy-MM-dd') : ''
      })
    )
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

  // Get selected objects for Autocomplete values
  const selectedUserObject = userData.find(u => u.id === selectedUser) || null
  const selectedTypeObject = typeOptions.find(t => t.id === selectedType) || null
  const selectedDivisionObject = divisionData.find(d => d.id === selectedDivision) || null
  const selectedDepartmentObject = departmentData.find(d => d.id === selectedDepartment) || null

  return (
    <CardContent>
      <Grid container spacing={6} alignItems='center'>
        {/* User Autocomplete Filter */}
        <Grid item xs={12} sm={6} md={4}>
          <CustomAutocomplete
            fullWidth
            options={userData}
            value={selectedUserObject}
            onChange={(e, newValue) => {
              dispatch(setSelectedUser(newValue?.id || ''))
            }}
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
            onChange={(e, newValue) => {
              dispatch(setSelectedType(newValue?.id || ''))
            }}
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
            onChange={(e, newValue) => {
              dispatch(setSelectedDivision(newValue?.id || ''))
            }}
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
            onChange={(e, newValue) => {
              dispatch(setSelectedDepartment(newValue?.id || ''))
            }}
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
            customInput={<CustomInput  end={endDateRange} start={startDateRange} />}
          />
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default AttendanceTableFiltersEnhanced
