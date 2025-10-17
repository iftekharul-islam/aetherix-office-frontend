import { Skeleton, Card, CardContent, Grid, Typography, Divider } from '@mui/material';

const AttendanceDetailsSkeleton = () => (
  <Grid container spacing={6}>
    {/* User Details Skeleton */}
    <Grid item xs={12} lg={4} md={5}>
      <Card>
        <CardContent className="flex flex-col pbs-12 gap-6">
          <div className="flex flex-col gap-6">
            {/* Avatar & Name */}
            <div className="flex items-center justify-center flex-col gap-4">
              <Skeleton variant="circular" width={120} height={120} />
              <Skeleton width="60%" />
            </div>
          </div>

          {/* Details Section */}
          <div>
            <Typography variant="h5">
              <Skeleton width="30%" />
            </Typography>
            <Divider className="my-4" />
            <div className="flex flex-col gap-2">
              {/* Employee ID */}
              <div className="flex items-center flex-wrap gap-x-1.5">
                
                <Skeleton width="60%" />
              </div>

              {/* Email */}
              <div className="flex items-center flex-wrap gap-x-1.5">
               
                <Skeleton width="70%" />
              </div>

              {/* Department */}
              <div className="flex items-center flex-wrap gap-x-1.5">
              
                <Skeleton width="62%" />
              </div>

              {/* Division */}
              <div className="flex items-center flex-wrap gap-x-1.5">
               
                <Skeleton width="50%" />
              </div>

              {/* Supervisor */}
              <div className="flex items-center flex-wrap gap-x-1.5">
               
                <Skeleton width="50%" />
              </div>

              {/* Attendance Date */}
              <div className="flex items-center flex-wrap gap-x-1.5">
               
                <Skeleton width="50%" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Grid>

    {/* Attendance Details Skeleton */}
    <Grid item xs={12} lg={8} md={7}>
      <Card>
        <CardContent>
          <Typography variant="h5">
            <Skeleton width="30%" />
          </Typography>
          <Divider className="my-4" />
          <Skeleton variant="rectangular" width="100%" height={200} />
          <Skeleton variant="rectangular" width="100%" height={200} />
          <Skeleton variant="rectangular" width="100%" height={200} />
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default AttendanceDetailsSkeleton;
