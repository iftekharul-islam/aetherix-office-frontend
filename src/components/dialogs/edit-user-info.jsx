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
import { X, CheckCircle, XCircle } from 'lucide-react'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DialogCloseButton from './dialog-close-button'
import { useGetUsersQuery, useUpdateUserMutation } from '@/lib/redux-rtk/apis/userApi'
import { useGetDivisionsQuery } from '@/lib/redux-rtk/apis/divisionApi'
import { useGetDepartmentsQuery } from '@/lib/redux-rtk/apis/departmentApi'

const EditUserInfo = ({ open, setOpen, userData, departmentsData, usersData }) => {
  const [updateUser] = useUpdateUserMutation()
  const { refetch } = useGetUsersQuery()
  const { refetch: divisionsRefetch } = useGetDivisionsQuery()
  const { refetch: departmentsRefetch } = useGetDepartmentsQuery()

  const [status, setStatus] = useState('idle')

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      employee_id: userData?.employee_id || '',
      machine_id: userData?.machine_id || '',
      name: userData?.name || '',
      email: userData?.email || '',
      department_id: userData?.department_id || '',
      supervisor_id: userData?.supervisor_id || '',
      role: userData?.role || ''
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
      await updateUser({ id: userData.id, ...data }).unwrap()

      refetch()
      divisionsRefetch()
      departmentsRefetch()

      setStatus('success')
    } catch (err) {
      console.error('Failed to update user:', err)
      setStatus('error')
    }
  }

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <DialogContent className='flex flex-col justify-center items-center py-8 gap-2'>
          <CircularProgress />
          <Typography variant='h5'>Updating user...</Typography>
        </DialogContent>
      )
    }

    if (status === 'success') {
      return (
        <>
          <DialogContent className='py-8 text-center flex flex-col items-center gap-2'>
            <CheckCircle size={45} className='mb-4 text-success' />
            <Typography variant='h5' className='text-green-600'>
              User updated successfully!
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
            <XCircle size={45} className='mb-4 text-error' />
            <Typography variant='h5' className='text-red-600'>
              Failed to update user!
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

   
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='employee_id'
                control={control}
                render={({ field }) => (
                  <CustomTextField {...field} fullWidth label='Employee ID' placeholder='e.g. EMP0001' />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='machine_id'
                control={control}
                render={({ field }) => (
                  <CustomTextField {...field} fullWidth label='Machine ID' placeholder='e.g. MAC0001' />
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
                    label='Full Name'
                    placeholder='e.g. John Doe'
                    {...(errors.name && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Email'
                    placeholder='e.g. john@example.com'
                    {...(errors.email && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>


            

            <Grid item xs={12} sm={6}>
              <Controller
                name='department_id'
                control={control}
                render={({ field }) => (
                  <CustomTextField select fullWidth label='Select Department' {...field}>
                    {departmentsData.map(item => (
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
                name='supervisor_id'
                control={control}
                render={({ field }) => (
                  <CustomTextField select fullWidth label='Select Supervisor' {...field}>
                    {usersData.map(item => (
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
                name='role'
                control={control}
                render={({ field }) => (
                  <CustomTextField select fullWidth label='Select Role' {...field}>
                    <MenuItem value='employee'>Employee</MenuItem>
                    <MenuItem value='supervisor'>Supervisor</MenuItem>
                    <MenuItem value='admin'>Admin</MenuItem>
                  </CustomTextField>
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
          Edit User Information
          <Typography component='span' className='flex flex-col text-center'>
            Update user details below.
          </Typography>
        </DialogTitle>
      )}

      <Divider />

      {renderContent()}
    </Dialog>
  )
}

export default EditUserInfo
