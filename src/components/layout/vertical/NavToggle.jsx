'use client'

import { Button, IconButton } from '@mui/material'

// Hook Imports
import { Menu } from 'lucide-react'

import useVerticalNav from '@menu/hooks/useVerticalNav'

const NavToggle = () => {
  // Hooks
  const { toggleVerticalNav, isBreakpointReached } = useVerticalNav()

  const handleClick = () => {
    toggleVerticalNav()
  }

  return (
    <>
      {/* <i className='tabler-menu-2 cursor-pointer' onClick={handleClick} /> */}
      {/* Comment following code and uncomment above code in order to toggle menu on desktop screens as well */}
      <div>
        {/* ?  */}
        <IconButton onClick={handleClick}>
          <Menu />
        </IconButton>
        {isBreakpointReached && <i className='tabler-menu-2 cursor-pointer' onClick={handleClick} />}
      </div>
    </>
  )
}

export default NavToggle
