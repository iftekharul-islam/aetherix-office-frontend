// MUI Imports
import Grid from '@mui/material/Grid'

// Lucide React Imports
import { Building, Check, XCircle, UserCheck, Layers } from 'lucide-react'

import CustomAvatar from '@/@core/components/mui/Avatar'
import HorizontalWithSubtitle from '../card-statistics/HorizontalWithSubtitle'

const DivisionListCards = ({ divisionData }) => {
  const totalDivisions = divisionData.length
  const headsAssigned = divisionData.filter(d => d.head_id !== null).length
  const activeDivisions = headsAssigned
  const inactiveDivisions = totalDivisions - activeDivisions
  const totalDepartments = divisionData.reduce((sum, division) => sum + (division.departments?.length || 0), 0)

  const getPercentage = (count, total) => (total === 0 ? 0 : ((count / total) * 100).toFixed(0))

  const statsData = [
    {
      title: 'Total Divisions',
      count: totalDivisions,
      icon: <Building size={20} />,
      avatarColor: 'primary', // subtle blue
      percentage: getPercentage(totalDivisions, totalDivisions)
    },
    {
      title: 'Active Divisions',
      count: activeDivisions,
      icon: <Check size={20} />,
      avatarColor: 'success', // subtle green
      percentage: getPercentage(activeDivisions, totalDivisions)
    },
    {
      title: 'Inactive Divisions',
      count: inactiveDivisions,
      icon: <XCircle size={20} />,
      avatarColor: 'error', // subtle red
      percentage: getPercentage(inactiveDivisions, totalDivisions)
    },
    {
      title: 'Heads Assigned',
      count: headsAssigned,
      icon: <UserCheck size={20} />,
      avatarColor: 'warning', // subtle yellow/orange
      percentage: getPercentage(headsAssigned, totalDivisions)
    },
    {
      title: 'Total Departments',
      count: totalDepartments,
      icon: <Layers size={20} />,
      avatarColor: 'info', // subtle cyan
      percentage: getPercentage(totalDepartments, totalDivisions)
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

export default DivisionListCards
