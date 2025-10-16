'use client'

import React from 'react'

import { X } from 'lucide-react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

import Typography from '@mui/material/Typography'

import DialogCloseButton from './dialog-close-button'

const FullNoteDialog = ({ open, onClose, note = '' }) => {
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      maxWidth='sm'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible', position: 'relative' } }}
    >
      <DialogCloseButton onClick={onClose} disableRipple>
  <X />
</DialogCloseButton>


      <DialogContent className='p-6 pt-8'>
        <Typography variant='body2' className='leading-relaxed whitespace-pre-wrap break-words'>
          {note || 'No note provided'}
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

export default FullNoteDialog
