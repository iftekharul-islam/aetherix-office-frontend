'use client'

import { useState } from 'react'

import { format } from 'date-fns'

import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { toast } from 'react-toastify'
import { Controller, useForm } from 'react-hook-form'

import CustomTextField from '@core/components/mui/TextField'
import AppReactDatepicker from '../AppReactDatepicker'
import { useCreateAttendanceMutation } from '@/lib/redux-rtk/apis/attendanceApi'

const AddAttendanceDrawer = ({ open, handleClose, usersData, refetch, date }) => {
  console.log({usersData}, "from drawer");
  const [createAttendance, { isLoading }] = useCreateAttendanceMutation()
  const [time, setTime] = useState(new Date())

  const nameWithEmployeeID = `${usersData?.name} (${usersData?.employee_id})`
 
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      user_id: usersData?.id || '',
      type: 'checkin'
    }
  })

  const onSubmit = async data => {
    // Combine the date (from props) with the selected time
    const combinedDateTime = new Date(date)

    combinedDateTime.setHours(time.getHours())

    combinedDateTime.setMinutes(time.getMinutes())
    combinedDateTime.setSeconds(time.getSeconds())

    // Format to MySQL datetime format
    const formattedDatetime = format(combinedDateTime, 'yyyy-MM-dd HH:mm:ss')

    const payload = {
      user_id: data.user_id,
      type: data.type,
      datetime: formattedDatetime
    }

    console.log({ payload }, 'payload for createAttendance')

    try {
      const result = await createAttendance(payload).unwrap()

      console.log({ result }, 'attendance created')

      refetch()
      toast.success('Attendance added successfully!')
      reset()
      setTime(new Date())
      handleClose()
    } catch (error) {
      console.error('Failed to add attendance:', error)
      toast.error(error?.data?.message || 'Failed to add attendance. Please try again.')
    }
  }

  const handleReset = () => {
    reset()
    setTime(new Date())
    handleClose()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Add Attendance</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
       
        <CustomTextField
        disabled
          fullWidth
          label='User Name'
          value={nameWithEmployeeID}
          slotProps={{ input: { readOnly: true } }}
        />

       
        <AppReactDatepicker
          disabled
          selected={date}
           dateFormat='dd-MM-yyyy'
          id='read-only-date'
          onChange={() => {}} 
          placeholderText='Select date'
          customInput={<CustomTextField slotProps={{ input: { readOnly: true } }} label='Date' fullWidth />}
        />

        {/* Time (Editable) */}
        <AppReactDatepicker
          showTimeSelect
          selected={time}
          timeIntervals={1}
          showTimeSelectOnly
          dateFormat='h:mm aa'
          id='time-only-picker'
          onChange={date => setTime(date)}
          customInput={<CustomTextField label='Time' fullWidth />}
        />

        {/* why does not work */}

        {/* Type */}
        <Controller
          name='type'
       
          control={control}

          rules={{ required: true }}

          render={({ field }) => (
            <CustomTextField
              select
              fullWidth
              label='Type'
              {...field}
              {...(errors.type && { error: true, helperText: 'This field is required.' })}
            >
              <MenuItem value='checkin'>Check In</MenuItem>
              <MenuItem value='checkout'>Check Out</MenuItem>
            </CustomTextField>
          )}
        />

        {/* Hidden user_id field */}
        <Controller name='user_id' control={control} render={({ field }) => <input type='hidden' {...field} />} />

        <div className='flex items-center gap-4'>
          <Button variant='contained' type='submit' disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
          <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
            Cancel
          </Button>
        </div>
      </form>
    </Drawer>
  )
}

export default AddAttendanceDrawer
