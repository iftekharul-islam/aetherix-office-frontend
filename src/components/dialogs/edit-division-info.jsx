'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
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

// Icons
import { X, CheckCircle, XCircle } from 'lucide-react'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DialogCloseButton from './dialog-close-button'
import { useGetDivisionsQuery, useUpdateDivisionMutation } from '@/lib/redux-rtk/apis/divisionApi'
import { useGetUsersQuery } from '@/lib/redux-rtk/apis/userApi'
import { useGetDepartmentsQuery } from '@/lib/redux-rtk/apis/departmentApi'

const EditDivisionInfo = ({ open, setOpen, divisionData, employeeData }) => {
  const [updateDivision] = useUpdateDivisionMutation()
  const { refetch } = useGetDivisionsQuery()
  const { refetch: usersRefetch } = useGetUsersQuery()
  const { refetch: departmentsRefetch } = useGetDepartmentsQuery()

  const [status, setStatus] = useState('idle')

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: divisionData?.name || '',
      code: divisionData?.code || '',
      description: divisionData?.description || '',
      head_id: divisionData?.head_id || ''
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
      await updateDivision({ id: divisionData.id, ...data }).unwrap()

      // await Promise.all([refetch(), usersRefetch(), departmentsRefetch()])
      refetch()
      usersRefetch()
      departmentsRefetch()

      setStatus('success')
    } catch (err) {
      console.error('Failed to update division:', err)
      setStatus('error')
    }
  }

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <DialogContent className='flex flex-col justify-center items-center py-8 gap-2'>
          <CircularProgress />
          <Typography variant='h5'>Updating division...</Typography>
        </DialogContent>
      )
    }

    if (status === 'success') {
      return (
        <>
          <DialogContent className='py-8 text-center flex flex-col items-center gap-2'>
            <CheckCircle size={45} className='mb-4 text-success' />
            <Typography variant='h5' className='text-green-600'>
              Division updated successfully!
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
              Failed to update division!
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

    // Default form (idle)
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Division Name'
                    placeholder='e.g. Sales'
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
                    label='Division Code'
                    placeholder='e.g. DIV001'
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
                  <CustomTextField select fullWidth label='Select Division Head' {...field}>
                    <MenuItem value=''>Select Head</MenuItem>
                    {employeeData.map(user => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </MenuItem>
                    ))}
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
          Edit Division Information
          <Typography component='span' className='flex flex-col text-center'>
            Update division details below.
          </Typography>
        </DialogTitle>
      )}

      <Divider />

      {renderContent()}
    </Dialog>
  )
}

export default EditDivisionInfo
