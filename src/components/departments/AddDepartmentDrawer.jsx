'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Component Imports
import { toast } from 'react-toastify'
import { format } from 'date-fns'

import CustomTextField from '@core/components/mui/TextField'
import { useCreateDepartmentMutation, useGetDepartmentsQuery } from '@/lib/redux-rtk/apis/departmentApi'
import { useGetDivisionsQuery } from '@/lib/redux-rtk/apis/divisionApi'
import AppReactDatepicker from '../AppReactDatepicker'

// API Imports

const AddDepartmentDrawer = props => {
  const { open, handleClose, employeeData, divisionData } = props



  const [officeStartTime, setOfficeStartTime] = useState(null)

  // API Hook
  const [createDepartment, { isLoading }] = useCreateDepartmentMutation()
  const { refetch } = useGetDepartmentsQuery()

  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      division_id: '',
      name: '',
      code: '',
      description: '',
      head_id: '',
      office_start_time: '',
       expected_duty_hours: '', 
    on_time_threshold_minutes: '', 
    delay_threshold_minutes: '', 
    extreme_delay_threshold_minutes: '' 
    }
  })

  const onSubmit = async data => {


    try {
      const payload = {
        ...data,
        office_start_time: data.office_start_time ? format(data.office_start_time, 'h:mm a') : null
      }

     


      const result = await createDepartment(payload).unwrap()

      refetch()
      toast.success('Department created successfully!')
      handleClose()
      reset()
    } catch (error) {
      toast.error('Failed to create department. Please try again.')
      console.error('Failed to create department:', error)
    }
  }

  const handleReset = () => {
    handleClose()
    reset()
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
        <Typography variant='h5'>Add Department</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
        {/* Division ID */}

        <Controller
          name='division_id'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField select fullWidth label='Select Division' {...field}>
              {divisionData.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </CustomTextField>
          )}
        />

        {/* Department Name */}
        <Controller
          name='name'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              fullWidth
              label='Department Name'
              placeholder='e.g. Human Resources'
              {...(errors.name && { error: true, helperText: 'Name is required.' })}
            />
          )}
        />

        {/* Department Code */}
        <Controller
          name='code'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              fullWidth
              label='Code'
              placeholder='e.g. HR001'
              {...(errors.code && { error: true, helperText: 'Code is required.' })}
            />
          )}
        />

        {/* Description */}
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <CustomTextField
              {...field}
              fullWidth
              multiline
              rows={3}
              label='Description'
              placeholder='Enter description (optional)'
            />
          )}
        />

        {/* Head ID */}
        <Controller
          name='head_id'
          control={control}
          render={({ field }) => (
            <CustomTextField select fullWidth label='Select Department Head' {...field}>
              {employeeData.map(employee => (
                <MenuItem key={employee.id} value={employee.id}>
                  {employee.name}
                </MenuItem>
              ))}
            </CustomTextField>
          )}
        />

        <Controller
          name='office_start_time'
          control={control}
          render={({ field }) => (
            <AppReactDatepicker
              showTimeSelect
              selected={field.value}
              timeIntervals={15}
              showTimeSelectOnly
              dateFormat='h:mm aa'
              id='office-start-time'
              onChange={date => field.onChange(date)}
              customInput={<CustomTextField label='Office Start Time' fullWidth  inputProps={{ autoComplete: 'off' }}/>}
            />
          )}
        />

        {/* Expected Duty Hours */}
<Controller
  name='expected_duty_hours'
  control={control}
  render={({ field }) => (
    <CustomTextField
      {...field}
      fullWidth
      type='number'
      label='Expected Duty Hours'
      placeholder='e.g. 8'
      inputProps={{ min: 0, max: 24, step: 0.5 }}
    />
  )}
/>

{/* On-Time Threshold Minutes */}
<Controller
  name='on_time_threshold_minutes'
  control={control}
  render={({ field }) => (
    <CustomTextField
      {...field}
      fullWidth
      type='number'
      label='On-Time Threshold (Minutes)'
      placeholder='e.g. 10'
      inputProps={{ min: 0, max: 60 }}
    />
  )}
/>

{/* Delay Threshold Minutes */}
<Controller
  name='delay_threshold_minutes'
  control={control}
  render={({ field }) => (
    <CustomTextField
      {...field}
      fullWidth
      type='number'
      label='Delay Threshold (Minutes)'
      placeholder='e.g. 30'
      inputProps={{ min: 0, max: 120 }}
    />
  )}
/>

{/* Extreme Delay Threshold Minutes */}
<Controller
  name='extreme_delay_threshold_minutes'
  control={control}
  render={({ field }) => (
    <CustomTextField
      {...field}
      fullWidth
      type='number'
      label='Extreme Delay Threshold (Minutes)'
      placeholder='e.g. 60'
      inputProps={{ min: 0, max: 180 }}
    />
  )}
/>


        <div className='flex items-center gap-4'>
          <Button variant='contained' type='submit'>
            {isLoading ? 'Adding...' : 'Add'}
          </Button>
          <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
            Cancel
          </Button>
        </div>
      </form>
    </Drawer>
  )
}

export default AddDepartmentDrawer
