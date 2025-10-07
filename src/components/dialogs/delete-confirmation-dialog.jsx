'use client'

import React, { useState } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { X, CheckCircle, XCircle, Loader } from 'lucide-react'

import DialogCloseButton from './dialog-close-button'

const DeleteConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirm',

  confirmText = 'Yes',
  cancelText = 'Cancel',
  deletedItemName,
  loading = false
}) => {
  const [status, setStatus] = useState('idle') 

  const handleConfirm = async () => {
    if (!onConfirm) return

    setStatus('loading')

    try {
      await onConfirm()
      setStatus('success')
    } catch (err) {
      setStatus('error')
    }
  }

  const handleClose = () => {
    setStatus('idle')
    onClose()
  }

  const renderContent = () => {
    switch (status) {
      case 'idle':
        return (
          <>
            <DialogContent className='p-6'>
              <Typography variant='h5' className='text-center'>
                {
                  deletedItemName ? <> Are you sure you want to delete <span className='font-bold tracking-wide'>{deletedItemName}</span>?</> : "Are you sure?"
                }
               
              </Typography>
            </DialogContent>
            <DialogActions className='justify-center px-6 pt-2 pb-10 gap-4'>
              <Button variant='contained' color='error' onClick={handleConfirm} disabled={loading}>
                {loading ? 'Deleting...' : confirmText}
              </Button>
              <Button variant='outlined' color='secondary' onClick={handleClose}>
                {cancelText}
              </Button>
            </DialogActions>
          </>
        )
      case 'loading':
        return (
          <DialogContent className='flex flex-col items-center text-center p-10'>
            <Loader size={45} className=' mb-4 text-primary animate-spin' />
            <Typography variant='h5'>Deleting...</Typography>
          </DialogContent>
        )
      case 'success':
        return (
          <>
            <DialogContent className='flex flex-col items-center text-center px-10 pt-10 pb-6'>
              <CheckCircle size={45} className=' mb-4 text-success' />
              <Typography variant='h5' className='mb-2'>
                Deleted Successfully!
              </Typography>
              <Typography>The item has been deleted successfully.</Typography>
            </DialogContent>
            <DialogActions className='justify-center px-4 pt-2 pb-10'>
              <Button variant='contained' color='success' onClick={handleClose}>
                Ok
              </Button>
            </DialogActions>
          </>
        )
      case 'error':
        return (
          <>
            <DialogContent className='flex flex-col items-center text-center px-10 pt-10 pb-6'>
              <XCircle size={45} className=' mb-4 text-error font-bold' />
              <Typography variant='h4' className='mb-2'>
                Failed
              </Typography>
              <Typography>Failed to delete the item. Please try again.</Typography>
            </DialogContent>
            <DialogActions className='justify-center px-4 pt-2 pb-10'>
              <Button variant='contained' color='error' onClick={handleClose}>
                Ok
              </Button>
            </DialogActions>
          </>
        )
      default:
        return null
    }
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth='xs'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <X />
      </DialogCloseButton>

      {status === 'idle' && (
        <DialogTitle variant='h6' className='text-center'>
          {title}
        </DialogTitle>
      )}

      {status === 'idle' && <Divider />}

      {renderContent()}
    </Dialog>
  )
}

export default DeleteConfirmationDialog
