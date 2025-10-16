



'use client'

import React, { useState } from 'react'

import { X, Edit3, CheckCircle, XCircle } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'

import CustomTextField from '@core/components/mui/TextField'
import DialogCloseButton from './dialog-close-button'

import { useUpdateAttendanceNoteMutation } from '@/lib/redux-rtk/apis/attendanceApi'

const EditAttendanceNoteDialog = ({ open, onClose, attendanceItem, refetch }) => {
  const [updateAttendanceNote] = useUpdateAttendanceNoteMutation()
  const [status, setStatus] = useState('idle')

  const currentNote = attendanceItem?.note || ''

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      note: ''
    }
  })

  React.useEffect(() => {
    reset({ note: currentNote })
  }, [currentNote, reset])

  const handleClose = () => {
    onClose()
    reset()
    setStatus('idle')
  }

  const onSubmit = async data => {
    if (!attendanceItem?.user?.id || !attendanceItem?.date) {
      toast.error('Invalid attendance record')
      
      return
    }

    setStatus('loading')

    try {
      const payload = {
        user_id: attendanceItem.user.id,
        date: attendanceItem.date,
        note: data.note
      }

      await updateAttendanceNote(payload).unwrap()

      refetch?.()
      setStatus('success')
    } catch (error) {
      console.error('Failed to save note:', error)
      setStatus('error')
    }
  }

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <DialogContent className='flex flex-col justify-center items-center py-8 gap-2'>
          <CircularProgress />
          <Typography variant='h5'>Updating note...</Typography>
        </DialogContent>
      )
    }

    if (status === 'success') {
      return (
        <>
          <DialogContent className='py-8 text-center flex flex-col items-center gap-2'>
            <CheckCircle size={45} className='mb-4 text-success' />
            <Typography variant='h5' className='text-green-600'>
              Note updated successfully!
            </Typography>
          </DialogContent>
          <DialogActions className='justify-center pb-8'>
            <Button onClick={handleClose} variant='contained'>
              OK
            </Button>
          </DialogActions>
        </>
      )
    }

    if (status === 'error') {
      return (
        <>
          <DialogContent className='py-8 text-center flex flex-col items-center gap-2'>
            <XCircle size={45} className='mb-4 text-error font-bold' />
            <Typography variant='h5' className='text-red-600'>
              Failed to update note!
            </Typography>
          </DialogContent>
          <DialogActions className='justify-center pb-8'>
            <Button onClick={handleClose} variant='contained' color='error'>
              OK
            </Button>
          </DialogActions>
        </>
      )
    }

    // Default: show form (idle state)
    return (
      <>
        <DialogContent className='p-6'>
          <Typography variant='body2' className='mb-4 text-gray-600'>
            Update the note for <strong>{attendanceItem?.user?.name || 'this record'}</strong> on{' '}
            <strong>{attendanceItem?.date}</strong>.
          </Typography>

          <form id='edit-note-form' onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='note'
              control={control}
              rules={{
             
                maxLength: { value: 500, message: 'Note cannot exceed 500 characters' }
              }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  label='Attendance Note'
                  placeholder='Edit the attendance note...'
                  multiline
                  rows={4}
                  fullWidth
                  error={!!errors.note}
                  helperText={errors.note?.message}
                  inputProps={{ maxLength: 500 }}
                />
              )}
            />
          </form>
        </DialogContent>

        <Divider />

        <DialogActions className='justify-center px-6 pt-2 pb-6 gap-3'>
          <Button variant='contained' color='primary' type='submit' form='edit-note-form'>
            Save Changes
          </Button>
          <Button variant='tonal' color='error' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={status === 'idle' ? 'sm' : 'xs'}
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <X />
      </DialogCloseButton>

      {status === 'idle' && (
        <>
          <DialogTitle className='text-center py-4'>
            <div className='flex items-center justify-center gap-2'>
              <Edit3 size={20} />
              <Typography variant='h6'>Edit Attendance Note</Typography>
            </div>
          </DialogTitle>

          <Divider />
        </>
      )}

      {renderContent()}
    </Dialog>
  )
}

export default EditAttendanceNoteDialog