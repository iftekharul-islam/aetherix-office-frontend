// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports



import AttendanceListCards from './AttendanceListCards'
import AttendanceListTableEnhanced from './AttendanceListTableEnhanced'


const AttendanceListEnhanced = ({attendancesData, userData, divisionData, departmentData, totalItems }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AttendanceListCards />
      </Grid>
      <Grid item xs={12}>
        <AttendanceListTableEnhanced tableData={attendancesData}  userData={userData} divisionData={divisionData} departmentData={departmentData} totalItems={totalItems}/>
      </Grid>
    </Grid>
  )
}

export default AttendanceListEnhanced
