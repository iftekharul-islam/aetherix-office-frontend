// MUI Imports
import Grid from '@mui/material/Grid'

import DepartmentListCards from './DepartmentListCards'
import DepartListTable from './DepartmentListTable'

// Component Imports

const DepartmentList = ({ departmentsData, employeeData, divisionData }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <DepartmentListCards departmentsData={departmentsData} />
      </Grid>
      <Grid item xs={12}>
        <DepartListTable tableData={departmentsData} employeeData={employeeData} divisionData={divisionData} />
      </Grid>
    </Grid>
  )
}

export default DepartmentList
