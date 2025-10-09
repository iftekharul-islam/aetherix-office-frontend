import Link from 'next/link'


import { Home, ClipboardList, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'


import AttendanceDetailsTable from './AttendanceDetailsTable'

const AttendanceDetails = ({userID, date, attendanceDetailsData, refetch }) => {
  console.log('attendanceDetailsData in attendance details component:', attendanceDetailsData)

  if (!attendanceDetailsData || !attendanceDetailsData.details?.length) {
    return <Typography>No attendance details found.</Typography>
  }

  return (
    <Grid container spacing={6}>
      {/* Breadcrumb Section */}
      <Grid item xs={12}>
        <Breadcrumbs aria-label='breadcrumb' separator={<ChevronRight size={16} className='text-gray-400' />}>
          <Link color='inherit' href='/' className='flex items-center gap-1'>
            <Home size={16} /> Home
          </Link>
          <Link color='inherit' href='/attendances' className='flex items-center gap-1'>
            <ClipboardList size={16} /> Attendance
          </Link>
          <Typography color='text.primary' className='flex items-center gap-1'>
            <ClipboardList size={16} /> Attendance Details
          </Typography>
        </Breadcrumbs>
      </Grid>

      

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <AttendanceDetailsTable userID={userID} date={date} details={attendanceDetailsData?.details} refetch={refetch}/>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AttendanceDetails
