'use client'

import { useState, useEffect, forwardRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

import { format, addDays, startOfDay } from 'date-fns'

import AppReactDatepicker from '../AppReactDatePicker'

import CustomTextField from '@core/components/mui/TextField'

import {
  setSelectedType,
  setSelectedUser,
  setSelectedDivision,
  setSelectedDepartment,
  setDateRange
} from '@/lib/redux-rtk/slices/attendanceSlice'
import CustomAvatar from '@/@core/components/mui/Avatar'
import { getInitials } from '@/utils/getInitials'
import { X } from 'lucide-react'

const AttendanceTableFiltersEnhanced = ({ userData, divisionData = [], departmentData = [] }) => {
  const dispatch = useDispatch()

  const { selectedUser, selectedType, selectedDivision, selectedDepartment, dateRange } = useSelector(
    state => state.attendanceSlice
  )

  console.log({ selectedUser, selectedType, selectedDivision, selectedDepartment, dateRange })



  const [startDateRange, setStartDateRange] = useState(new Date())

  const [endDateRange, setEndDateRange] = useState(null)

  // ! don't delete these two states
  // const [startDateRange, setStartDateRange] = useState(new Date())
  // const [endDateRange, setEndDateRange] = useState(addDays(new Date(), 45))

  // Sync Redux -> local state when Redux changes (e.g., resetFilters)
  // useEffect(() => {
  //   if (dateRange.start) {
  //     setStartDateRange(new Date(dateRange.start))
  //     setEndDateRange(dateRange.end ? new Date(dateRange.end) : null)
  //   }
  // }, [dateRange])

  // Sync Redux -> local state when Redux changes (e.g., resetFilters)
  useEffect(() => {
    if (dateRange.start) {
      setStartDateRange(new Date(dateRange.start))
      setEndDateRange(dateRange.end ? new Date(dateRange.end) : null)
    } else {
      // Handle reset case - clear the dates
      setStartDateRange(null)
      setEndDateRange(null)
    }
  }, [dateRange])

  const handleOnChangeRange = dates => {
    const [start, end] = dates

    setStartDateRange(start)
    setEndDateRange(end)

    // Dispatch to Redux
    dispatch(
      setDateRange({
        start: start ? format(start, 'yyyy-MM-dd') : '',
        end: end ? format(end, 'yyyy-MM-dd') : ''
      })
    )
  }

  // const CustomInput = forwardRef((props, ref) => {
  //   const { label, start, end, ...rest } = props
  //   const startDate = format(start, 'MM/dd/yyyy')
  //   const endDate = end !== null ? ` - ${format(end, 'MM/dd/yyyy')}` : null
  //   const value = `${startDate}${endDate !== null ? endDate : ''}`

  //   return <CustomTextField fullWidth inputRef={ref} {...rest} label={label} value={value} />
  // })

  const CustomInput = forwardRef((props, ref) => {
    const { label, start, end, ...rest } = props

    // Handle null dates properly
    const startDate = start ? format(start, 'MM/dd/yyyy') : ''
    const endDate = end ? ` - ${format(end, 'MM/dd/yyyy')}` : ''

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

  return (
    <CardContent>
      <Grid container spacing={6} alignItems='center'>
        {/* User Filter */}
        <Grid item xs={12} sm={3}>
          <CustomTextField
            select
            fullWidth
            value={selectedUser}
            label='Select User'
            onChange={e => dispatch(setSelectedUser(e.target.value))}

            // SelectProps={{ displayEmpty: true }}
            SelectProps={{
              // displayEmpty: true,
              renderValue: selected => {
                // if (!selected) return 'all employees'
                if (!selected) return null
                const user = userData.find(u => u.id === selected)

                return (
                  <Typography color='text.primary' className='flex items-center gap-2'>
                    <span>{user.name}</span>
                    <span className='px-1 py-0.5 bg-primaryLight text-xs rounded-md'>{user.employee_id}</span>
                  </Typography>
                )
              }
            }}
          >
            <MenuItem value=''>all employees</MenuItem>
            {userData.map(user => (
              <MenuItem key={user.id} value={user.id}>
                {getAvatar({ fullName: user.name })}
                <div>
                  <Typography>
                    {user.name}{' '}
                    <span className='px-1 py-0.5 bg-primaryLight text-xs rounded-md'>{user.employee_id}</span>
                  </Typography>
                  <Typography className='text-sm'>{user.email}</Typography>
                </div>
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>

        {/* Type Filter */}
        <Grid item xs={12} sm={3}>
          <CustomTextField
            select
            fullWidth
            value={selectedType}
            label='Select Type'
            onChange={e => dispatch(setSelectedType(e.target.value))}

            // SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>all types</MenuItem>
            <MenuItem value='checkin'>
              <Typography color='text.primary'>Check-In</Typography>
            </MenuItem>
            <MenuItem value='checkout'>
              <Typography color='text.primary'>Check-Out</Typography>
            </MenuItem>
          </CustomTextField>
        </Grid>

        {/* Division Filter */}
        <Grid item xs={12} sm={3}>
          <CustomTextField
            select
            fullWidth
            value={selectedDivision}
            label='Select Division'
            onChange={e => dispatch(setSelectedDivision(e.target.value))}

            // SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>all divisions</MenuItem>
            {divisionData.map(div => (
              <MenuItem key={div.id} value={div.id}>
                <Typography color='text.primary'> {div.name}</Typography>
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>

        {/* Department Filter */}
        <Grid item xs={12} sm={3}>
          <CustomTextField
            select
            fullWidth
            value={selectedDepartment}
            label='Select Department'
            onChange={e => dispatch(setSelectedDepartment(e.target.value))}

            // SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>all departments</MenuItem>
            {departmentData.map(dept => (
              <MenuItem key={dept.id} value={dept.id}>
                <Typography color='text.primary'>
                  {' '}
                  {dept.name} <span className='text-sm'>({dept.division?.name})</span>
                </Typography>
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>

        {/* Date Range Picker */}
        <Grid item xs={12} sm={3}>
          <AppReactDatepicker
            selectsRange
            isClearable
            monthsShown={1}
            dateFormat='dd-MM-yyyy'
            endDate={endDateRange}
            selected={startDateRange}
            startDate={startDateRange}
            shouldCloseOnSelect={false}
            id='date-range-picker-months'
            onChange={handleOnChangeRange}
            customInput={
              <CustomInput
                label='Select Date(s)'
                placeholder='Select Date Range'
                end={endDateRange}
                start={startDateRange}
              />
            }
          />
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default AttendanceTableFiltersEnhanced
