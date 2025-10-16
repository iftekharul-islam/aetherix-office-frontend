// 'use client'

// // React Imports
// import { useState } from 'react'

// // Next Imports
// import Link from 'next/link'
// import { useParams } from 'next/navigation'

// // MUI Imports
// import useMediaQuery from '@mui/material/useMediaQuery'
// import { styled, useTheme } from '@mui/material/styles'
// import Typography from '@mui/material/Typography'
// import IconButton from '@mui/material/IconButton'
// import InputAdornment from '@mui/material/InputAdornment'
// import Checkbox from '@mui/material/Checkbox'
// import Button from '@mui/material/Button'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import Divider from '@mui/material/Divider'

// // Third-party Imports
// import classnames from 'classnames'

// // Component Imports
// import Logo from '@components/layout/shared/Logo'
// import CustomTextField from '@core/components/mui/TextField'

// // Hook Imports
// import { useImageVariant } from '@core/hooks/useImageVariant'
// import { useSettings } from '@core/hooks/useSettings'

// // Styled Custom Components
// const RegisterIllustration = styled('img')(({ theme }) => ({
//   zIndex: 2,
//   blockSize: 'auto',
//   maxBlockSize: 600,
//   maxInlineSize: '100%',
//   margin: theme.spacing(12),
//   [theme.breakpoints.down(1536)]: {
//     maxBlockSize: 550
//   },
//   [theme.breakpoints.down('lg')]: {
//     maxBlockSize: 450
//   }
// }))

// const MaskImg = styled('img')({
//   blockSize: 'auto',
//   maxBlockSize: 345,
//   inlineSize: '100%',
//   position: 'absolute',
//   insetBlockEnd: 0,
//   zIndex: -1
// })

// const Register = ({ mode }) => {
//   // States
//   const [isPasswordShown, setIsPasswordShown] = useState(false)

//   // Vars
//   const darkImg = '/images/pages/auth-mask-dark.png'
//   const lightImg = '/images/pages/auth-mask-light.png'
//   const darkIllustration = '/images/illustrations/auth/v2-register-dark.png'
//   const lightIllustration = '/images/illustrations/auth/v2-register-light.png'
//   const borderedDarkIllustration = '/images/illustrations/auth/v2-register-dark-border.png'
//   const borderedLightIllustration = '/images/illustrations/auth/v2-register-light-border.png'

//   // Hooks
//   const { lang: locale } = useParams()
//   const { settings } = useSettings()
//   const theme = useTheme()
//   const hidden = useMediaQuery(theme.breakpoints.down('md'))
//   const authBackground = useImageVariant(mode, lightImg, darkImg)

//   const characterIllustration = useImageVariant(
//     mode,
//     lightIllustration,
//     darkIllustration,
//     borderedLightIllustration,
//     borderedDarkIllustration
//   )

//   const handleClickShowPassword = () => setIsPasswordShown(show => !show)

//   return (
//     <div className='flex bs-full justify-center'>
//       <div
//         className={classnames(
//           'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
//           {
//             'border-ie': settings.skin === 'bordered'
//           }
//         )}
//       >
//         <RegisterIllustration src={characterIllustration} alt='character-illustration' />
//         {!hidden && <MaskImg alt='mask' src={authBackground} />}
//       </div>
//       <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
//         <Link
//           href='/login'
//           className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'
//         >
//           <Logo />
//         </Link>
//         <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-8 sm:mbs-11 md:mbs-0'>
//           <div className='flex flex-col gap-1'>
//             <Typography variant='h4'>Adventure starts here 🚀</Typography>
//             <Typography>Make your app management easy and fun!</Typography>
//           </div>
//           <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} className='flex flex-col gap-6'>
//             <CustomTextField autoFocus fullWidth label='Username' placeholder='Enter your username' />
//             <CustomTextField fullWidth label='Email' placeholder='Enter your email' />
//             <CustomTextField
//               fullWidth
//               label='Password'
//               placeholder='············'
//               type={isPasswordShown ? 'text' : 'password'}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position='end'>
//                     <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
//                       <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
//                     </IconButton>
//                   </InputAdornment>
//                 )
//               }}
//             />
//             <FormControlLabel
//               control={<Checkbox />}
//               label={
//                 <>
//                   <span>I agree to </span>
//                   <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
//                     privacy policy & terms
//                   </Link>
//                 </>
//               }
//             />
//             <Button fullWidth variant='contained' type='submit'>
//               Sign Up
//             </Button>
//             <div className='flex justify-center items-center flex-wrap gap-2'>
//               <Typography>Already have an account?</Typography>
//               <Typography component={Link} href='/login' color='primary'>
//                 Sign in instead
//               </Typography>
//             </div>
//             <Divider className='gap-2'>or</Divider>
//             <div className='flex justify-center items-center gap-1.5'>
//               <IconButton className='text-facebook' size='small'>
//                 <i className='tabler-brand-facebook-filled' />
//               </IconButton>
//               <IconButton className='text-twitter' size='small'>
//                 <i className='tabler-brand-twitter-filled' />
//               </IconButton>
//               <IconButton className='text-textPrimary' size='small'>
//                 <i className='tabler-brand-github-filled' />
//               </IconButton>
//               <IconButton className='text-error' size='small'>
//                 <i className='tabler-brand-google-filled' />
//               </IconButton>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Register

// !! functional version

'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

// Third-party Imports
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Styled Custom Components
const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 600,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: { maxBlockSize: 550 },
  [theme.breakpoints.down('lg')]: { maxBlockSize: 450 }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 345,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

// Zod schema
const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    password_confirmation: z.string().min(6, 'Confirm your password')
  })
  .refine(data => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation']
  })

const Register = ({ mode }) => {
  const router = useRouter()
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  // MUI hooks
  const { lang: locale } = useParams()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // Images
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-register-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-register-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-register-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-register-light-border.png'

  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit = async data => {
    setLoading(true)
    setServerError('')

    try {
      const res = await fetch('http://demo-attendance-management.test/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const resData = await res.json()

   

      if (res.ok) {
        // Registration successful, redirect to login or dashboard
        router.push('/')
      } else {
        setServerError(resData.message || JSON.stringify(resData.errors))
      }
    } catch (err) {
      setServerError('Network error, please try again.')
    }

    setLoading(false)
  }

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          { 'border-ie': settings.skin === 'bordered' }
        )}
      >
        <RegisterIllustration src={characterIllustration} alt='character-illustration' />
        {!hidden && <MaskImg alt='mask' src={authBackground} />}
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link
          href='/login'
          className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'
        >
          <Logo />
        </Link>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-8 sm:mbs-11 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>Adventure starts here 🚀</Typography>
            <Typography>Make your app management easy and fun!</Typography>
          </div>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
            <CustomTextField
              autoFocus
              fullWidth
              label='Username'
              placeholder='Enter your username'
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <CustomTextField
              fullWidth
              label='Email'
              placeholder='Enter your email'
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <CustomTextField
              fullWidth
              label='Password'
              placeholder='············'
              type={isPasswordShown ? 'text' : 'password'}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                      <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <CustomTextField
              fullWidth
              label='Confirm Password'
              placeholder='············'
              type={isPasswordShown ? 'text' : 'password'}
              {...register('password_confirmation')}
              error={!!errors.password_confirmation}
              helperText={errors.password_confirmation?.message}
            />
            <FormControlLabel
              control={<Checkbox />}
              label={
                <>
                  <span>I agree to </span>
                  <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
                    privacy policy & terms
                  </Link>
                </>
              }
            />
            {serverError && <Typography color='error'>{serverError}</Typography>}
            <Button fullWidth variant='contained' type='submit' disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>Already have an account?</Typography>
              <Typography component={Link} href='/login' color='primary'>
                Sign in instead
              </Typography>
            </div>
            <Divider className='gap-2'>or</Divider>
            <div className='flex justify-center items-center gap-1.5'>
              <IconButton className='text-facebook' size='small'>
                <i className='tabler-brand-facebook-filled' />
              </IconButton>
              <IconButton className='text-twitter' size='small'>
                <i className='tabler-brand-twitter-filled' />
              </IconButton>
              <IconButton className='text-textPrimary' size='small'>
                <i className='tabler-brand-github-filled' />
              </IconButton>
              <IconButton className='text-error' size='small'>
                <i className='tabler-brand-google-filled' />
              </IconButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
