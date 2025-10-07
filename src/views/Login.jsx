// 'use client'

// // React Imports
// import { useState } from 'react'

// // Next Imports
// import { useRouter } from 'next/navigation'

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
// import Link from '@components/Link'
// import Logo from '@components/layout/shared/Logo'
// import CustomTextField from '@core/components/mui/TextField'

// // Config Imports
// import themeConfig from '@configs/themeConfig'

// // Hook Imports
// import { useImageVariant } from '@core/hooks/useImageVariant'
// import { useSettings } from '@core/hooks/useSettings'

// // Styled Custom Components
// const LoginIllustration = styled('img')(({ theme }) => ({
//   zIndex: 2,
//   blockSize: 'auto',
//   maxBlockSize: 680,
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
//   maxBlockSize: 355,
//   inlineSize: '100%',
//   position: 'absolute',
//   insetBlockEnd: 0,
//   zIndex: -1
// })

// const LoginV2 = ({ mode }) => {
//   // States
//   const [isPasswordShown, setIsPasswordShown] = useState(false)

//   // Vars
//   const darkImg = '/images/pages/auth-mask-dark.png'
//   const lightImg = '/images/pages/auth-mask-light.png'
//   const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
//   const lightIllustration = '/images/illustrations/auth/v2-login-light.png'
//   const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
//   const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'

//   // Hooks
//   const router = useRouter()
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
//         <LoginIllustration src={characterIllustration} alt='character-illustration' />
//         {!hidden && (
//           <MaskImg
//             alt='mask'
//             src={authBackground}
//             className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
//           />
//         )}
//       </div>
//       <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
//         <Link className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
//           <Logo />
//         </Link>
//         <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
//           <div className='flex flex-col gap-1'>
//             <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
//             <Typography>Please sign-in to your account and start the adventure</Typography>
//           </div>
//           <form
//             noValidate
//             autoComplete='off'
//             onSubmit={e => {
//               e.preventDefault()
//               router.push('/')
//             }}
//             className='flex flex-col gap-5'
//           >
//             <CustomTextField autoFocus fullWidth label='Email or Username' placeholder='Enter your email or username' />
//             <CustomTextField
//               fullWidth
//               label='Password'
//               placeholder='············'
//               id='outlined-adornment-password'
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
//             <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
//               <FormControlLabel control={<Checkbox />} label='Remember me' />
//               <Typography className='text-end' color='primary' component={Link}>
//                 Forgot password?
//               </Typography>
//             </div>
//             <Button fullWidth variant='contained' type='submit'>
//               Login
//             </Button>
//             <div className='flex justify-center items-center flex-wrap gap-2'>
//               <Typography>New on our platform?</Typography>
//               <Typography component={Link} href='/register' color='primary'>
//                 Create an account
//               </Typography>
//             </div>
//             <Divider className='gap-2 text-textPrimary'>or</Divider>
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

// export default LoginV2

// ! login functional version

'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

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
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Component Imports
import { toast } from 'react-toastify'
import { Eye, EyeOff } from 'lucide-react'

import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import { useLoginMutation } from '@/lib/redux-rtk/apis/userApi'



// Styled Custom Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 680,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

// ✅ Zod Schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

const LoginV2 = ({ mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [login, { isLoading }] = useLoginMutation()

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-login-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'

  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async data => {
   

    try {
      const result = await login(data).unwrap()

      console.log({ result })

      localStorage.setItem('token', result.token)
      toast.success('Login successful!')
      router.push('/')
    } catch (err) {
      toast.error('Login failed!')
      console.error(err)
    }
  }

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          { 'border-ie': settings.skin === 'bordered' }
        )}
      >
        <LoginIllustration src={characterIllustration} alt='character-illustration' />
        {!hidden && (
          <MaskImg
            alt='mask'
            src={authBackground}
            className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
          />
        )}
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
          <Logo />
        </Link>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
            <Typography>Please sign-in to your account and start the adventure</Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
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
                     {isPasswordShown ? <EyeOff size={17}/> : <Eye size={17} />}
                     
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {/* <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
              <FormControlLabel control={<Checkbox />} label='Remember me' />
              <Typography className='text-end' color='primary' component={Link}>
                Forgot password?
              </Typography>
            </div> */}
            <Button fullWidth variant='contained' type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginV2
