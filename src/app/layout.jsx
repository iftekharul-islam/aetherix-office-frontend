// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Style Imports
import '@/app/globals.css'
import Customizer from '@/@core/components/customizer'

// Generated Icon CSS Imports
// import '@assets/iconify-icons/generated-icons.css'

export const metadata = {
  title: 'Demo Attendance Management',
  description:
    'Created by ASM Saki'
}

const RootLayout = ({ children }) => {
  // Vars
  const direction = 'ltr'

  return (
    <html id='__next' lang='en' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>{children}</body>
    </html>
  )
}

export default RootLayout
