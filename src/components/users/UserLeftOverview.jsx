// MUI Imports
import Grid from '@mui/material/Grid'

import UserDetails from './UserDetails'

// import UserPlan from './UserPlan'

const UserLeftOverview = ({ user }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserDetails user={user} />
      </Grid>
      <Grid item xs={12}>
        {/* <UserPlan /> */}
      </Grid>
    </Grid>
  )
}

export default UserLeftOverview
