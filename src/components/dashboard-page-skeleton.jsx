import { Card, CardContent, Skeleton, Box, Grid } from '@mui/material'

export const DashboardPageSkeleton = () => {
  return (
    <Box className=' space-y-6'>
      {/* Top Analytics Cards */}
      <Grid container spacing={3}>
        {[...Array(4)].map((_, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card>
              <CardContent>
                <Skeleton variant='text' width='70%' height={30} />
                <Skeleton variant='text' width='50%' height={20} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filters Section */}
      <Card>
        <CardContent className='flex flex-wrap gap-4'>
          {[...Array(3)].map((_, idx) => (
            <Skeleton key={idx} variant='rectangular' className='flex-1 min-w-[100px]' height={40} />
          ))}
          <Skeleton variant='rectangular' className='flex-1 min-w-[80px]' height={40} />
        </CardContent>
      </Card>

      {/* Table Section */}
      <Card>
        <CardContent>
          {/* Table Header */}
          <Grid container spacing={2} className='mb-4'>
            {[...Array(5)].map((_, idx) => (
              <Grid item xs={2.4} sm={2.4} md={2.4} key={idx}>
                <Skeleton variant='text' width='100%' height={30} />
              </Grid>
            ))}
          </Grid>

          {/* Table Rows */}
          {[...Array(5)].map((_, idx) => (
            <Grid container spacing={2} className='mb-3' key={idx}>
              {[...Array(5)].map((__, idx2) => (
                <Grid item xs={2.4} sm={2.4} md={2.4} key={idx2}>
                  <Skeleton variant='rectangular' width='100%' height={30} />
                </Grid>
              ))}
            </Grid>
          ))}
        </CardContent>
      </Card>
    </Box>
  )
}

export default DashboardPageSkeleton
