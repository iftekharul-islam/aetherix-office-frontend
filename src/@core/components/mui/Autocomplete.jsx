// React imports
import { forwardRef } from 'react'



// MUI imports
import Paper from '@mui/material/Paper'
import Autocomplete from '@mui/material/Autocomplete'
import { ChevronDown } from 'lucide-react'

const CustomAutocomplete = forwardRef((props, ref) => {
  return (
    // eslint-disable-next-line lines-around-comment
    <Autocomplete {...props} ref={ref} popupIcon={<ChevronDown size={20} />} PaperComponent={props => <Paper {...props} />} />
  )
})

export default CustomAutocomplete
