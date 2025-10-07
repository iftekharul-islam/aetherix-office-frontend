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

import CustomTextField from '@core/components/mui/TextField'
import { useCreateDepartmentMutation, useGetDepartmentsQuery } from '@/lib/redux-rtk/apis/departmentApi'
import { useGetDivisionsQuery } from '@/lib/redux-rtk/apis/divisionApi'

// API Imports

const AddDepartmentDrawer = props => {
  const { open, handleClose, employeeData, divisionData } = props

  console.log('divison data fro dep', divisionData)

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
      head_id: ''
    }
  })

  // Submit handler
  const onSubmit = async data => {
    console.log({ data })

    try {
      const result = await createDepartment(data).unwrap()

      refetch()
      toast.success('Department created successfully!')
      console.log({ result })
      handleClose()
      reset()
    } catch (error) {
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
            <CustomTextField select fullWidth label='Select Division ID' {...field}>
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
