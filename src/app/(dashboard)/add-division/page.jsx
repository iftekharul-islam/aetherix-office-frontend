// 'use client'

// // React Imports
// import { useState } from 'react'

// // Next Imports
// import Link from 'next/link'

// // MUI Imports
// import Card from '@mui/material/Card'
// import Grid from '@mui/material/Grid'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'
// import IconButton from '@mui/material/IconButton'
// import InputAdornment from '@mui/material/InputAdornment'

// // Components Imports
// import CustomTextField from '@core/components/mui/TextField'

// const AddDivisionForm = () => {
//   // States
//   const [isPasswordShown, setIsPasswordShown] = useState(false)
//   const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
//   const handleClickShowPassword = () => setIsPasswordShown(show => !show)
//   const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show)

//   return (
//     <Card>
//       <CardHeader title='Basic' />
//       <CardContent>
//         <form onSubmit={e => e.preventDefault()}>
//           <Grid container spacing={6}>
//             <Grid item xs={12}>
//               <CustomTextField fullWidth label='Name' placeholder='John Doe' />
//             </Grid>
//             <Grid item xs={12}>
//               <CustomTextField
//                 fullWidth
//                 type='email'
//                 label='Email'
//                 placeholder='johndoe@gmail.com'
//                 helperText='You can use letters, numbers & periods'
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <CustomTextField
//                 fullWidth
//                 label='Password'
//                 placeholder='············'
//                 id='form-layout-basic-password'
//                 type={isPasswordShown ? 'text' : 'password'}
//                 helperText='Use 8 or more characters with a mix of letters, numbers & symbols'
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position='end'>
//                       <IconButton
//                         edge='end'
//                         onClick={handleClickShowPassword}
//                         onMouseDown={e => e.preventDefault()}
//                         aria-label='toggle password visibility'
//                       >
//                         <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
//                       </IconButton>
//                     </InputAdornment>
//                   )
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <CustomTextField
//                 fullWidth
//                 label='Confirm Password'
//                 placeholder='············'
//                 id='form-layout-basic-confirm-password'
//                 type={isConfirmPasswordShown ? 'text' : 'password'}
//                 helperText='Make sure to type the same password as above'
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position='end'>
//                       <IconButton
//                         edge='end'
//                         onClick={handleClickShowConfirmPassword}
//                         onMouseDown={e => e.preventDefault()}
//                         aria-label='toggle confirm password visibility'
//                       >
//                         <i className={isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
//                       </IconButton>
//                     </InputAdornment>
//                   )
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <div className='flex items-center justify-between flex-wrap gap-5'>
//                 <Button variant='contained' type='submit'>
//                   Get Started!
//                 </Button>
//                 <div className='flex items-center justify-center gap-2'>
//                   <Typography>Already have an account?</Typography>
//                   <Link href='/' onClick={e => e.preventDefault()} className='text-primary'>
//                     Log In
//                   </Link>
//                 </div>
//               </div>
//             </Grid>
//           </Grid>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

// export default AddDivisionForm

// ! functional version

'use client'

import { useState } from 'react'

import { TextField, Button, Card, CardHeader, CardContent, Grid, Typography } from '@mui/material'

import { useCreateDivisionMutation } from '@/lib/redux-rtk/apis/divisionApi'

const AddDivisionForm = () => {
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')
  const [headId, setHeadId] = useState('')

  const [addDivision, { isLoading, isSuccess, isError, error }] = useCreateDivisionMutation()

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await addDivision({ name, code, description, head_id: headId }).unwrap()
      setName('')
      setCode('')
      setDescription('')
      setHeadId('')
      alert('Division created successfully!')
    } catch (err) {
      console.error(err)
      alert('Failed to create division.')
    }
  }

  return (
    <Card>
      <CardHeader title='Add Division' />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField fullWidth label='Name' value={name} onChange={e => setName(e.target.value)} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='Code' value={code} onChange={e => setCode(e.target.value)} required />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Description'
                value={description}
                onChange={e => setDescription(e.target.value)}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Head (User ID)'
                value={headId}
                onChange={e => setHeadId(e.target.value)}
                helperText='Optional: assign a user as division head'
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' type='submit' disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Add Division'}
              </Button>
            </Grid>
          </Grid>
        </form>
        {isError && <Typography color='error'>{error?.data?.message || 'Something went wrong'}</Typography>}
        {isSuccess && <Typography color='success.main'>Division created successfully!</Typography>}
      </CardContent>
    </Card>
  )
}

export default AddDivisionForm
