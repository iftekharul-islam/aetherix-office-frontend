// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports

import DivisionListTable from './DivisionListTable'
import DivisionListCards from './DivisionListCards'

const DivisionList = ({ divisionData, employeeData }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <DivisionListCards divisionData={divisionData} />
      </Grid>
      <Grid item xs={12}>
        <DivisionListTable tableData={divisionData} employeeData={employeeData} />
      </Grid>
    </Grid>
  )
}

export default DivisionList
