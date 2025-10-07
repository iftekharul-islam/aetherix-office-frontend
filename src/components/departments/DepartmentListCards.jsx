// MUI Imports
import Grid from '@mui/material/Grid'


// Lucide React Imports
import { Layers, Check, XCircle, UserCheck } from 'lucide-react'

import CustomAvatar from '@/@core/components/mui/Avatar'
import HorizontalWithSubtitle from '../card-statistics/HorizontalWithSubtitle'

const DepartmentListCards = ({ departmentsData }) => {
  const totalDepartments = departmentsData.length
  const headsAssigned = departmentsData.filter(d => d.head_id !== null).length
  const activeDepartments = headsAssigned
  const inactiveDepartments = totalDepartments - activeDepartments

  const getPercentage = (count, total) => (total === 0 ? 0 : ((count / total) * 100).toFixed(0))

  const statsData = [
    {
      title: 'Total Departments',
      count: totalDepartments,
      icon: <Layers size={24} />,
      avatarColor: 'info',
      percentage: getPercentage(totalDepartments, totalDepartments)
    },
    {
      title: 'Active Departments',
      count: activeDepartments,
      icon: <Check size={24} />,
      avatarColor: 'success',
      percentage: getPercentage(activeDepartments, totalDepartments)
    },
    {
      title: 'Inactive Departments',
      count: inactiveDepartments,
      icon: <XCircle size={24} />,
      avatarColor: 'error',
      percentage: getPercentage(inactiveDepartments, totalDepartments)
    },
    {
      title: 'Heads Assigned',
      count: headsAssigned,
      icon: <UserCheck size={24} />,
      avatarColor: 'warning',
      percentage: getPercentage(headsAssigned, totalDepartments)
    }
  ]

  return (
   <Grid container spacing={6}>
        
   
         {statsData.map((item, index) => {
           const trendColor = item.percentage < 50 ? 'error.main' : 'success.main'
           const trendSign = item.percentage < 50 ? 'negative' : 'positive'
   
           return (
             <Grid key={index} item xs={12} sm={6} md={3}><HorizontalWithSubtitle  title={item.title} stats={item.count} avatarIcon={item.icon} avatarColor={item.avatarColor} trend={trendSign} trendNumber={item.percentage} subtitle=""/> </Grid>
            
           )
         })}
       </Grid>
  )
}

export default DepartmentListCards
