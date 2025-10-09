// 'use client'

// import { useState } from 'react'

// // MUI Imports
// import Button from '@mui/material/Button'
// import Drawer from '@mui/material/Drawer'
// import IconButton from '@mui/material/IconButton'
// import MenuItem from '@mui/material/MenuItem'
// import Typography from '@mui/material/Typography'
// import Divider from '@mui/material/Divider'

// // Third-party
// import { toast } from 'react-toastify'
// import { Controller, useForm } from 'react-hook-form'

// // Custom components
// import CustomTextField from '@core/components/mui/TextField'


// // API hooks

// import { useGetUsersQuery } from '@/lib/redux-rtk/apis/userApi'
// import AppReactDatepicker from '../AppReactDatepicker'
// import { useCreateAttendanceMutation } from '@/lib/redux-rtk/apis/attendanceApi'

// const AddAttendanceDrawer = ({ open, handleClose, usersData }) => {
//   const [addAttendance, { isLoading }] = useCreateAttendanceMutation()


//   const { control, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm({
//     defaultValues: {
//       user_id: '',
//       datetime: new Date(),
//       type: 'checkin'
//     }
//   })

//   const onSubmit = async data => {

//     console.log({data}, "from create new attendance");

//     try {
//      const result =  await addAttendance(data).unwrap()

//      console.log({result}, "add a new attendance");
//       toast.success('Attendance added successfully!')
//       reset()
//       handleClose()
  
//     } catch (error) {
//       console.error('Failed to add attendance:', error)
//       toast.error('Failed to add attendance. Please try again.')
//     }
//   }

//   const handleReset = () => {
//     reset()
//     handleClose()
//   }

//   return (
//     <Drawer
//       open={open}
//       anchor='right'
//       variant='temporary'
//       onClose={handleReset}
//       ModalProps={{ keepMounted: true }}
//       sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
//     >
//       <div className='flex items-center justify-between plb-5 pli-6'>
//         <Typography variant='h5'>Add Attendance</Typography>
//         <IconButton size='small' onClick={handleReset}>
//           <i className='tabler-x text-2xl text-textPrimary' />
//         </IconButton>
//       </div>
//       <Divider />

//       <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
//         {/* User */}
//         <Controller
//           name='user_id'
//           control={control}
//           rules={{ required: true }}
//           render={({ field }) => (
//             <CustomTextField
//               select
//               fullWidth
//               label='Select User'
//               {...field}
//               {...(errors.user_id && { error: true, helperText: 'This field is required.' })}
//             >
//               {usersData.map(user => (
//                 <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
//               ))}
//             </CustomTextField>
//           )}
//         />

//         {/* Date & Time */}
//         <Controller
//           name='datetime'
//           control={control}
//           rules={{ required: true }}
//           render={({ field }) => (
//             <AppReactDatepicker
//               selected={field.value}
//               showTimeSelect
//               timeFormat='HH:mm'
//               timeIntervals={1}
//               dateFormat='MM/dd/yyyy h:mm aa'
//               onChange={date => field.onChange(date)}
//               customInput={
//                 <CustomTextField
//                   label='Date & Time'
//                   fullWidth
//                   {...(errors.datetime && { error: true, helperText: 'This field is required.' })}
//                 />
//               }
//             />
//           )}
//         />

//         {/* Type (hidden) */}
//         <Controller
//           name='type'
//           control={control}
//           render={({ field }) => <input type='hidden' {...field} />}
//         />

//         {/* Action buttons */}
//         <div className='flex items-center gap-4'>
//           <Button variant='contained' type='submit' disabled={isLoading}>
//             Submit
//           </Button>
//           <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
//             Cancel
//           </Button>
//         </div>
//       </form>
//     </Drawer>
//   )
// }

// export default AddAttendanceDrawer




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

const AddAttendanceDrawer = ({ open, handleClose, usersData, refetch }) => {
  const [createAttendance, { isLoading }] = useCreateAttendanceMutation()

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      user_id: '',
      datetime: new Date(),
      type: 'checkin'
    }
  })

  const onSubmit = async data => {
    // data.datetime is a Date object (from your date picker)
    let formattedDatetime = data.datetime

    if (data.datetime instanceof Date) {

      // Use date-fns to format
      formattedDatetime = format(data.datetime, 'yyyy-MM-dd HH:mm:ss')
    }

    const payload = { ...data, datetime: formattedDatetime }

    console.log({ payload }, 'payload for createAttendance')

    try {
      const result = await createAttendance(payload).unwrap()

      console.log({ result }, 'attendance created')
      refetch();
      toast.success('Attendance added successfully!')
      reset()
      handleClose()
    } catch (error) {
      console.error('Failed to add attendance:', error)
      toast.error('Failed to add attendance. Please try again.')
    }
  }

  const handleReset = () => {
    reset()
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
        {/* User */}
        <Controller
          name='user_id'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField
              select
              fullWidth
              label='Select User'
              {...field}
              {...(errors.user_id && { error: true, helperText: 'This field is required.' })}
            >
              {usersData.map(user => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </CustomTextField>
          )}
        />

        {/* Date & Time */}
        <Controller
          name='datetime'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AppReactDatepicker
              selected={field.value}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={1}
              dateFormat='MM/dd/yyyy h:mm aa'
              onChange={date => field.onChange(date)}
              customInput={
                <CustomTextField
                  label='Date & Time'
                  fullWidth
                  {...(errors.datetime && { error: true, helperText: 'This field is required.' })}
                />
              }
            />
          )}
        />

        {/* Type hidden */}
        <Controller
          name='type'
          control={control}
          render={({ field }) => <input type='hidden' {...field} />}
        />

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

export default AddAttendanceDrawer

