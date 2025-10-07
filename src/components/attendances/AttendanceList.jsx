// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports

import AttendanceListCards from './AttendanceListCards'
import AttendanceListTable from './AttendanceListTable'


const AttendanceList = ({attendancesData, userData, totalItems }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AttendanceListCards />
      </Grid>
      <Grid item xs={12}>
        <AttendanceListTable tableData={attendancesData}  userData={userData} totalItems={totalItems}/>
      </Grid>
    </Grid>
  )
}

export default AttendanceList
