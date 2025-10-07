'use client'

// Third-party Imports
import Link from 'next/link'

import classnames from 'classnames'

// MUI Imports
import { Button } from '@mui/material'

// Component Imports
import { useSelector } from 'react-redux'

import NavToggle from './NavToggle'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const NavbarContent = () => {
  const user = useSelector(state => state.userSlice.user)

  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}>
      <div className='flex items-center gap-4'>
        <NavToggle />
        <ModeDropdown />
      </div>
      <div className='flex items-center gap-2'>
        {!user && ( // show login button only if no user
          <Button variant='contained'>
            <Link href='/login'>Login</Link>
          </Button>
        )}

        {user && <UserDropdown />}
      </div>
    </div>
  )
}

export default NavbarContent
