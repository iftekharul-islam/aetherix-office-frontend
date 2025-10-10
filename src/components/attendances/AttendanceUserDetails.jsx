// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const AttendanceUserDetails = ({ user, date }) => {
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
           
          </div>
        </div>

        
        {/* Details Section */}
        <div>
          <Typography variant='h5'>Details</Typography>
          <Divider className='my-4' />

          <div className='flex flex-col gap-2'>
            {/* Employee ID */}
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                Employee ID:
              </Typography>
              <Typography  className='bg-primary py-0.5 px-1 tracking-wider rounded-md text-white'>{user.employee_id}</Typography>
            </div>

           

            {/* Email */}
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                Email:
              </Typography>
              <Typography>{user.email}</Typography>
            </div>

            {/* Department */}
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                Department:
              </Typography>
              <Typography>{user?.department ?? '-'}</Typography>
            </div>

            {/* Division */}
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                Division:
              </Typography>
              <Typography>{user?.division ?? '-'}</Typography>
            </div>

            {/* Supervisor */}
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                Supervisor:
              </Typography>
              <Typography>{user?.supervisor ?? '-'}</Typography>
            </div>

            {/* Attendance Date */}
            {date && (
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Date:
                </Typography>
                <Typography>{date}</Typography>
              </div>
            )}
          </div>
        </div>

        
      </CardContent>
    </Card>
  )
}

export default AttendanceUserDetails
