'use client'

// React Imports
import { useState } from 'react'

import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { X, CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import { format } from 'date-fns'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DialogCloseButton from './dialog-close-button'
import { useGetDepartmentsQuery, useUpdateDepartmentMutation } from '@/lib/redux-rtk/apis/departmentApi'
import { useGetUsersQuery } from '@/lib/redux-rtk/apis/userApi'
import { useGetDivisionsQuery } from '@/lib/redux-rtk/apis/divisionApi'
import AppReactDatepicker from '../AppReactDatepicker'

const EditDepartmentInfo = ({ open, setOpen, departmentData, setDepartments, employeeData, divisionData }) => {
  const [updateDepartment] = useUpdateDepartmentMutation()
  const { refetch } = useGetDepartmentsQuery()
  const { refetch: usersRefetch } = useGetUsersQuery()
  const { refetch: divisionsRefetch } = useGetDivisionsQuery()
  const [status, setStatus] = useState('idle')

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      division_id: departmentData?.division_id || '',
      name: departmentData?.name || '',
      code: departmentData?.code || '',
      description: departmentData?.description || '',
      head_id: departmentData?.head_id || '',
      office_start_time: departmentData?.office_start_time
        ? new Date(`2000-01-01 ${departmentData.office_start_time}`)
        : '',
      expected_duty_hours: departmentData?.expected_duty_hours || '',
      on_time_threshold_minutes: departmentData?.on_time_threshold_minutes || '',
      delay_threshold_minutes: departmentData?.delay_threshold_minutes || '',
      extreme_delay_threshold_minutes: departmentData?.extreme_delay_threshold_minutes || ''
    }
  })

  const handleClose = () => {
    setOpen(false)
    reset()
    setStatus('idle')
  }

  const onSubmit = async data => {
    setStatus('loading')

    try {
      const payload = {
        ...data,
        office_start_time: data.office_start_time ? format(data.office_start_time, 'h:mm a') : null
      }

      await updateDepartment({ id: departmentData.id, ...payload }).unwrap()

      refetch()
      usersRefetch()
      divisionsRefetch()

      setStatus('success')
    } catch (err) {
      console.error('Failed to update department:', err)
      setStatus('error')
    }
  }

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <DialogContent className='flex flex-col justify-center items-center py-8 gap-2'>
          <CircularProgress />
          <Typography variant='h5'>Updating department...</Typography>
        </DialogContent>
      )
    }

    if (status === 'success') {
      return (
        <>
          <DialogContent className='py-8 text-center flex flex-col items-center gap-2'>
            <CheckCircle size={45} className='mb-4 text-success' />
            <Typography variant='h5' className='text-green-600'>
              Department updated successfully!
            </Typography>
          </DialogContent>
          <DialogActions className='justify-center pb-8'>
            <Button onClick={handleClose} variant='contained'>
              OK
            </Button>
          </DialogActions>
        </>
      )
    }

    if (status === 'error') {
      return (
        <>
          <DialogContent className='py-8 text-center flex flex-col items-center gap-2'>
            <XCircle size={45} className=' mb-4 text-error font-bold' />
            <Typography variant='h5' className='text-red-600'>
              Failed to update department!
            </Typography>
          </DialogContent>
          <DialogActions className='justify-center pb-8'>
            <Button onClick={handleClose} variant='contained' color='error'>
              OK
            </Button>
          </DialogActions>
        </>
      )
    }

    // Default: show form
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='division_id'
                control={control}
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
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Department Name'
                    placeholder='e.g. HR'
                    {...(errors.name && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='code'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Department Code'
                    placeholder='e.g. DEP001'
                    {...(errors.code && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
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
                    placeholder='Write a short description'
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='head_id'
                control={control}
                render={({ field }) => (
                  <CustomTextField select fullWidth label='Select Department Head' {...field}>
                    {employeeData.map(item => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
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
                    id='office-start-time-edit'
                    onChange={date => field.onChange(date)}
                    customInput={<CustomTextField label='Office Start Time' fullWidth />}
                  />
                )}
              />
            </Grid>
            {/* Expected Duty Hours */}
  <Grid item xs={12} sm={6}>
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
          inputProps={{ min: 0, max: 24, step: 0.25 }}
        />
      )}
    />
  </Grid>

  {/* On Time Threshold Minutes */}
  <Grid item xs={12} sm={6}>
    <Controller
      name='on_time_threshold_minutes'
      control={control}
      render={({ field }) => (
        <CustomTextField
          {...field}
          fullWidth
          type='number'
          label='On-time Threshold (minutes)'
          placeholder='e.g. 15'
          inputProps={{ min: 0, max: 60 }}
        />
      )}
    />
  </Grid>

  {/* Delay Threshold Minutes */}
  <Grid item xs={12} sm={6}>
    <Controller
      name='delay_threshold_minutes'
      control={control}
      render={({ field }) => (
        <CustomTextField
          {...field}
          fullWidth
          type='number'
          label='Delay Threshold (minutes)'
          placeholder='e.g. 30'
          inputProps={{ min: 0, max: 120 }}
        />
      )}
    />
  </Grid>

  {/* Extreme Delay Threshold Minutes */}
  <Grid item xs={12} sm={6}>
    <Controller
      name='extreme_delay_threshold_minutes'
      control={control}
      render={({ field }) => (
        <CustomTextField
          {...field}
          fullWidth
          type='number'
          label='Extreme Delay Threshold (minutes)'
          placeholder='e.g. 60'
          inputProps={{ min: 0, max: 180 }}
        />
      )}
    />
  </Grid>
          </Grid>
        </DialogContent>

        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' type='submit'>
            Submit
          </Button>
          <Button variant='tonal' color='error' type='button' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    )
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth={status === 'idle' ? 'md' : 'xs'}
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <X />
      </DialogCloseButton>

      {status === 'idle' && (
        <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
          Edit Department Information
          <Typography component='span' className='flex flex-col text-center'>
            Update department details below.
          </Typography>
        </DialogTitle>
      )}

      <Divider />

      {renderContent()}
    </Dialog>
  )
}

export default EditDepartmentInfo
