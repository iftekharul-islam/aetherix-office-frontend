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

import CustomTextField from '@core/components/mui/TextField'
import { useCreateDivisionMutation, useGetDivisionsQuery } from '@/lib/redux-rtk/apis/divisionApi'

const AddDivisionDrawer = props => {
  // Props
  const { open, handleClose, employeeData, setData } = props

  const [createDivision, { isLoading }] = useCreateDivisionMutation()
  const { refetch } = useGetDivisionsQuery()

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      code: '',
      description: '',
      head_id: ''
    }
  })

  const onSubmit = async data => {


    try {
      const result = await createDivision(data).unwrap()

      refetch()


      toast.success('Division created successfully!')

      handleClose()
      resetForm({ name: '', code: '', description: '', head_id: '' })
    } catch (err) {
      console.error('Failed to create division:', err)
    }
  }

  const handleReset = () => {
    handleClose()
    resetForm({ name: '', code: '', description: '', head_id: '' })
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
        <Typography variant='h5'>Add New Division</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit(data => onSubmit(data))} className='flex flex-col gap-6 p-6'>
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

          <Controller
            name='head_id'
            control={control}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Select Division Head' {...field}>
                {employeeData.map(user => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />

          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit' disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Submit'}
            </Button>

            <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddDivisionDrawer
