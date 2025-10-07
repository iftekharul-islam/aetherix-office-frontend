import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dialogType: null,
  dialogData: null,
  open: false
}

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (state, action) => {
      state.dialogType = action.payload.type
      state.dialogData = action.payload.data
      state.open = true
    },
    closeDialog: state => {
      state.dialogType = null
      state.dialogData = null
      state.open = false
    }
  }
})

export const { openDialog, closeDialog } = dialogSlice.actions
export default dialogSlice.reducer
