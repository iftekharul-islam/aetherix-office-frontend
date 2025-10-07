'use client'

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
import { useAddUserMutation, useGetUsersQuery } from '@/lib/redux-rtk/apis/userApi'

const AddUserDrawer = ({ open, handleClose, setData, departmentsData, usersData }) => {
  const [addUser, { isLoading }] = useAddUserMutation()
  const { refetch } = useGetUsersQuery()

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '12345678',
      role: '',
      machine_id: '',
      department_id: '',
      supervisor_id: ''
    }
  })

  const onSubmit = async data => {
    console.log('user data', data)

    try {
      const response = await addUser(data).unwrap()

      console.log(response)
      refetch()
      handleClose()
      reset()
      toast.success('User created successfully!')
    } catch (error) {
      console.error('Failed to add user:', error)
      toast.error('Failed to create user. Please try again.')
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
        <Typography variant='h5'>Add New User</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
        {/* Full Name */}
        <Controller
          name='name'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              fullWidth
              label='Full Name'
              placeholder='John Doe'
              {...(errors.name && { error: true, helperText: 'This field is required.' })}
            />
          )}
        />

        {/* Email */}
        <Controller
          name='email'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              fullWidth
              type='email'
              label='Email'
              placeholder='johndoe@gmail.com'
              {...(errors.email && { error: true, helperText: 'This field is required.' })}
            />
          )}
        />

        {/* Password */}
        <Controller
          name='password'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              fullWidth
              type='password'
              label='Password'
              placeholder='Default: 12345678 (leave empty to use)'
              {...(errors.password && { error: true, helperText: 'This field is required.' })}
            />
          )}
        />

        {/* Role */}
        <Controller
          name='role'
          control={control}
          render={({ field }) => (
            <CustomTextField select fullWidth label='Select Role' {...field}>
              <MenuItem value='employee'>Employee</MenuItem>
              <MenuItem value='admin'>Admin</MenuItem>
              <MenuItem value='supervisor'>Supervisor</MenuItem>
            </CustomTextField>
          )}
        />

        {/* Machine ID */}
        <Controller
          name='machine_id'
          control={control}
          render={({ field }) => (
            <CustomTextField {...field} fullWidth label='Machine ID' placeholder='Enter Machine ID (optional)' />
          )}
        />

        {/* Department */}
        <Controller
          name='department_id'
          control={control}
          render={({ field }) => (
            <CustomTextField select fullWidth label='Department' {...field}>
              {departmentsData.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </CustomTextField>
          )}
        />

        {/* Supervisor */}
        <Controller
          name='supervisor_id'
          control={control}
          render={({ field }) => (
            <CustomTextField select fullWidth label='Supervisor' {...field}>
              {usersData.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </CustomTextField>
          )}
        />

        {/* Action buttons */}
        <div className='flex items-center gap-4'>
          <Button variant='contained' type='submit' disabled={isLoading}>
            Submit
          </Button>
          <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
            Cancel
          </Button>
        </div>
      </form>
    </Drawer>
  )
}

export default AddUserDrawer
