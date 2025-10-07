// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const UserDetails = ({ user }) => {
  if (!user) return <p>No user data available</p>

  return (
    <Card>
      <CardContent className='flex flex-col pbs-12 gap-6'>
        <div className='flex flex-col gap-6'>
          {/* Avatar & Name */}
          <div className='flex items-center justify-center flex-col gap-4'>
            <div className='flex flex-col items-center gap-4'>
              <CustomAvatar alt='user-profile' src='/images/avatars/1.png' variant='rounded' size={120} />
              <Typography variant='h5'>{user.name}</Typography>
            </div>
            <Chip label={user.role} color='secondary' size='small' variant='tonal' />
          </div>

          {/* Stats Section (static numbers) */}
          <div className='flex items-center justify-around flex-wrap gap-4'>
            <div className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' color='primary' skin='light'>
                <i className='tabler-checkbox' />
              </CustomAvatar>
              <div>
                <Typography variant='h5'>1.23k</Typography>
                <Typography>Task Done</Typography>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' color='primary' skin='light'>
                <i className='tabler-briefcase' />
              </CustomAvatar>
              <div>
                <Typography variant='h5'>568</Typography>
                <Typography>Project Done</Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div>
          <Typography variant='h5'>Details</Typography>
          <Divider className='mlb-4' />
          <div className='flex flex-col gap-2'>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                Employee ID:
              </Typography>
              <Typography>{user.employee_id}</Typography>
            </div>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                Email:
              </Typography>
              <Typography>{user.email}</Typography>
            </div>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                Department:
              </Typography>
              <Typography>{user.department_name}</Typography>
            </div>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                Supervisor:
              </Typography>
              <Typography>{user.supervisor_name}</Typography>
            </div>
          </div>
        </div>

        {/* Static Buttons */}
        <div className='flex gap-4 justify-center'>
          <Button color='primary' variant='contained'>
            Edit
          </Button>
          <Button color='error' variant='outlined'>
            Suspend
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserDetails
