import CircularProgress from '@mui/material/CircularProgress'

const FullPageLoader = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <CircularProgress />
    </div>
  )
}

export default FullPageLoader
