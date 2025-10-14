'use client'

import React from 'react'

import { X, Calendar, User, IdCard, Clock } from 'lucide-react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import DialogCloseButton from './dialog-close-button'

const AttendanceNoteDetailsDialog = ({
  open,
  onClose,
  note = '',
  userData = {},
  date = 'N/A'
}) => {
  const formatDate = (dateString) => {

    if (!dateString || dateString === '-') return 'N/A'

    try {
      const date = new Date(dateString)

      return date.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })
    } catch {
      return dateString
    }
  }

  const employeeName = userData?.name || 'N/A'
  const employeeId = userData?.employee_id || 'N/A'
  const formattedDate = formatDate(date)

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      maxWidth='sm'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={onClose} disableRipple>
        <X />
      </DialogCloseButton>

      <DialogTitle variant='h6' className='text-center py-4'>
        Attendance Note Details
      </DialogTitle>

      <Divider />

      <DialogContent className='p-6'>

        {/* Employee Information Grid */}
        <Grid container spacing={3} className='mb-6'>
          <Grid item xs={12} sm={6}>
            <Box className='flex items-start gap-3'>
              <User size={20} className='text-primary mt-1 flex-shrink-0' />
              <Box>
                <Typography variant='caption' className='text-gray-500 block mb-1'>
                  Employee Name
                </Typography>
                <Typography variant='body2' className='font-semibold'>
                  {employeeName}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box className='flex items-start gap-3'>
              <IdCard size={20} className='text-primary mt-1 flex-shrink-0' />
              <Box>
                <Typography variant='caption' className='text-gray-500 block mb-1'>
                  Employee ID
                </Typography>
                <Typography variant='body2' className='font-semibold'>
                  {employeeId}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box className='flex items-start gap-3'>
              <Calendar size={20} className='text-primary mt-1 flex-shrink-0' />
              <Box>
                <Typography variant='caption' className='text-gray-500 block mb-1'>
                  Date
                </Typography>
                <Typography variant='body2' className='font-semibold'>
                  {formatDate(date)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider className='my-4' />

        {/* Note Section */}
        <Box>
          <Box className='flex items-center gap-2 mb-3'>
            <Typography variant='subtitle2' className='font-semibold'>
              Note
            </Typography>
            {note && (
              <Paper elevation={0} className='px-2 py-0.5 bg-actionFocus rounded-full' >
                <Typography variant='caption' className='text-info  font-semibold'>
                  Info
                </Typography>
              </Paper>
            )}
          </Box>

          <Paper
            elevation={0}
            className='p-4 rounded-lg  border border-collapse bg-primaryLighter'
          >
            <Typography
              variant='body2'
              className='leading-relaxed text- whitespace-pre-wrap break-words'
            >
              {note || 'No note provided'}
            </Typography>
          </Paper>
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions className='justify-center px-6 pt-2 pb-6 gap-3'>
        <Button
          variant='contained'
          color='primary'
          onClick={onClose}
          className='px-6'
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AttendanceNoteDetailsDialog