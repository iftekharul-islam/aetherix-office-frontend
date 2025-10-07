import Grid from '@mui/material/Grid'

import AccountDelete from '@/components/users/AccountDelete'
import AccountDetails from '@/components/users/AccountDetails'

const UsersSettingsPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AccountDetails />
      </Grid>
      <Grid item xs={12}>
        <AccountDelete />
      </Grid>
    </Grid>
  )
}

export default UsersSettingsPage
