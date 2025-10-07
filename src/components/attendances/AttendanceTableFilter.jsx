// 'use client'

// import { useDispatch, useSelector } from 'react-redux'
// import CardContent from '@mui/material/CardContent'
// import Grid from '@mui/material/Grid'
// import MenuItem from '@mui/material/MenuItem'

// import CustomTextField from '@core/components/mui/TextField'
// import AppReactDatepicker from '../AppReactDatePicker'

// import { setSelectedType, setSelectedUser, setFrom, setTo, resetFilters } from '@/lib/redux-rtk/slices/attendanceSlice'

// const AttendanceTableFilters = ({ userData}) => {
//   const dispatch = useDispatch()
//   const { selectedUser, selectedType, from, to } = useSelector(state => state.attendanceSlice)

//   const fromDate = from ? new Date(from) : null
//   const toDate = to ? new Date(to) : null

//   return (
//     <>
//      <CardContent>
//       <Grid container spacing={6} alignItems='center'>
//         {/* User Filter */}
//         <Grid item xs={12} sm={3}>
//           <CustomTextField
//             select
//             fullWidth
//             value={selectedUser}
//             label='Select User'
//             onChange={e => dispatch(setSelectedUser(e.target.value))}
//             SelectProps={{ displayEmpty: true }}
//           >
//             <MenuItem value=''>All Users</MenuItem>
//             {userData.map(user => (
//               <MenuItem key={user.id} value={user.id}>
//                 {user.name} ({user.employee_id})
//               </MenuItem>
//             ))}
//           </CustomTextField>
//         </Grid>

//         {/* Type Filter */}
//         <Grid item xs={12} sm={3}>
//           <CustomTextField
//             select
//             fullWidth
//              label='Select Type'
//             value={selectedType}
//             onChange={e => dispatch(setSelectedType(e.target.value))}
//             SelectProps={{ displayEmpty: true }}
//           >
//             <MenuItem value=''>All Types</MenuItem>
//             <MenuItem value='checkin'>Check-In</MenuItem>
//             <MenuItem value='checkout'>Check-Out</MenuItem>
//           </CustomTextField>
//         </Grid>

//         {/* From Date */}
//         <Grid item xs={12} sm={3}>
//           <AppReactDatepicker
//             boxProps={{ className: 'is-full' }}
//             selected={fromDate}
//             placeholderText='From Date'
//             dateFormat='dd/MM/yyyy'
//             onChange={date => dispatch(setFrom(date ? date.toISOString().split('T')[0] : ''))}
//             customInput={<CustomTextField fullWidth  label="From Date"/>}
//           />
//         </Grid>

//         {/* To Date */}

//         <Grid item xs={12} sm={3}>
//           <AppReactDatepicker
          
//             boxProps={{ className: 'is-full' }}
//             id='picker-clear'
//             selected={toDate}
//             placeholderText='To Date'
//             dateFormat='dd/MM/yyyy'
//             onChange={date => dispatch(setTo(date ? date.toISOString().split('T')[0] : ''))}
//             customInput={
//               <CustomTextField
//                 fullWidth
//                  label="To Date"
//               />
//             }
//           />
//         </Grid>
//       </Grid>
//      </CardContent> 

//     </>
//   )
// }

// export default AttendanceTableFilters



'use client'




const AttendanceTableFilters = ({ userData}) => {



  return (
    <>
    

    </>
  )
}

export default AttendanceTableFilters

