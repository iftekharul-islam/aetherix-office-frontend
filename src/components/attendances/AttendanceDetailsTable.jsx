'use client'

import { useEffect, useState, useMemo } from 'react'

import Typography from '@mui/material/Typography'

import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'
import { Button, IconButton, Tooltip } from '@mui/material'
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender
} from '@tanstack/react-table'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import { ChevronUp, ChevronDown, Upload, Trash2, PlusIcon, MessageCircle } from 'lucide-react'

import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@components/TablePaginationComponent'
import { useExportAttendanceDetailsMutation, useSoftDeleteAttendanceMutation } from '@/lib/redux-rtk/apis/attendanceApi'
import DeleteConfirmationDialog from '../dialogs/delete-confirmation-dialog'
import AddAttendanceDrawer from './AddAttendanceDrawer '
import AttendanceNoteDetailsDialog from '../dialogs/attendance-note-details'

const columnHelper = createColumnHelper()

const AttendanceDetailsTable = ({ userData, date, details, refetch }) => {
  const rows = useMemo(() => {
    const paired = []

    for (let i = 0; i < details.length; i += 2) {
      paired.push({
        checkin_id: details[i]?.id,
        checkout_id: details[i + 1]?.id,
        checkin: details[i]?.datetime ?? '-',
        checkout: details[i + 1]?.datetime ?? '-',
        checkin_note: details[i]?.note ?? null,
        checkout_note: details[i + 1]?.note ?? null
      })
    }

    return paired
  }, [details])

  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(rows)
  const [exportAttendanceDetails, { isLoading: isDetailLoading }] = useExportAttendanceDetailsMutation()
  const [softDeleteAttendance, { isLoading: isDeleting }] = useSoftDeleteAttendanceMutation()
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
  const [deleteItem, setDeleteItem] = useState(null)
  const [deleteItemType, setDeleteItemType] = useState(null)
  const [addAttendanceDrawerOpen, setAddAttendanceDrawerOpen] = useState(false)

  const [noteDialogOpen, setNoteDialogOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)
  const { user } = useSelector(state => state.userSlice)

  useEffect(() => setData(rows), [rows])

  const handleNoteClick = note => {
    setSelectedNote(note)
    setNoteDialogOpen(true)
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('checkin', {
        header: 'Check-in',
        cell: info => {
          const value = info.getValue()
          const note = info.row.original.checkin_note

          return (
            <div className='flex items-center justify-between gap-2'>
              <Typography>
                {value && value !== '-'
                  ? new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
                  : '-'}
              </Typography>
              <div className='flex items-center gap-1'>
                {note && (
                  <Tooltip title='View Note' arrow>
                    <IconButton size='small' color='info' onClick={() => handleNoteClick(note)}>
                      <MessageCircle size={16} />
                    </IconButton>
                  </Tooltip>
                )}
                {value && value !== '-' && (
                  <Tooltip title='Delete Check In' arrow>
                    <IconButton
                      color='error'
                      onClick={() => {
                        setDeleteItem(info.row.original)
                        setDeleteItemType('check-in')
                        setDeleteConfirmationOpen(true)
                      }}
                    >
                      {' '}
                      <Trash2 size={16} />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
          )
        },
        enableSorting: false
      }),
      columnHelper.accessor('checkout', {
        header: 'Check-out',
        cell: info => {
          const value = info.getValue()
          const note = info.row.original.checkout_note

          return (
            <div className='flex items-center justify-between gap-2'>
              <Typography>
                {value && value !== '-'
                  ? new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
                  : '-'}
              </Typography>
              <div className='flex items-center gap-1'>
                {note && (
                  <Tooltip title='View Note' arrow>
                    <IconButton size='small' color='info' onClick={() => handleNoteClick(note)}>
                      <MessageCircle size={16} />
                    </IconButton>
                  </Tooltip>
                )}
                {value && value !== '-' && (
                  <Tooltip title='Delete Check Out' arrow>
                    {' '}
                    <IconButton
                      color='error'
                      onClick={() => {
                        setDeleteItem(info.row.original)
                        setDeleteItemType('check-out')
                        setDeleteConfirmationOpen(true)
                      }}
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
          )
        },
        enableSorting: false
      })
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  const handleExportDetails = async () => {
    try {
      const blob = await exportAttendanceDetails({
        user_id: userData?.id || '',
        date: date || ''
      }).unwrap()

      const link = document.createElement('a')
      const fileName = `attendance_details_${userData?.name}_${date}.xlsx`

      link.href = URL.createObjectURL(blob)
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error('Export failed:', err)
      alert('Export failed. Please try again later.')
    }
  }

  const handleDelete = async item => {
    if (!item) {
      toast.error('No item selected for deletion!')
      throw new Error('No item selected')
    }

    if (!deleteItemType) {
      toast.error('Something Went Wrong!')
      throw new Error('No item selected')
    }

    try {
      const finalId = deleteItemType === 'check-in' ? item?.checkin_id : item?.checkout_id

      const result = await softDeleteAttendance(finalId).unwrap()

      refetch()
      setDeleteItem(null)
      setDeleteItemType(null)
    } catch (error) {
      console.error('Failed to delete attendance:', error)

      throw error
    }
  }

  return (
    <>
      <div className='flex flex-col pb-4 sm:flex-row justify-between items-center  gap-4'>
        <div className='flex items-center gap-2'>
          <Typography component='span'>Rows per page:</Typography>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='w-[70px]'
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </CustomTextField>
        </div>

        <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
          <Button
            onClick={handleExportDetails}
            disabled={isDetailLoading || details.length === 0}
            color='secondary'
            variant='tonal'
            startIcon={isDetailLoading ? <CircularProgress size={20} color='inherit' /> : <Upload size={18} />}
            className='max-sm:w-full'
          >
            {isDetailLoading ? 'Exporting…' : 'Export'}
          </Button>

          {user && user?.role === 'admin' && (
            <Button
              variant='contained'
              startIcon={<PlusIcon size={18} />}
              onClick={() => setAddAttendanceDrawerOpen(true)}
              className='max-sm:is-full'
            >
              Add Attendance
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='min-w-full '>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className='border px-2 py-1 text-left cursor-pointer'>
                    <div
                      className={classnames({ 'flex items-center gap-1': header.column.getIsSorted() })}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <ChevronUp className='text-xl' />,
                        desc: <ChevronDown className='text-xl' />
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className='text-center py-4'>
                  No data
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className='border px-2 py-1'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='flex justify-end p-2'>
        <TablePaginationComponent table={table} />
      </div>

      <AddAttendanceDrawer
        open={addAttendanceDrawerOpen}
        handleClose={() => setAddAttendanceDrawerOpen(false)}
        usersData={userData}
        date={date}
        refetch={refetch}
      />

      <DeleteConfirmationDialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
        onConfirm={() => handleDelete(deleteItem)}
        title='Delete Attendance'
        deletedItemName={deleteItem?.user_name ?? 'Attendance'}
        confirmText='Delete'
        loading={isDeleting}
      />

      <AttendanceNoteDetailsDialog
        open={noteDialogOpen}
        onClose={() => setNoteDialogOpen(false)}
        note={selectedNote}
        userData={userData}
        date={date}
      />
    </>
  )
}

export default AttendanceDetailsTable
