'use client'

import { useEffect, useState, useMemo } from 'react'

import Typography from '@mui/material/Typography'

import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'
import { Button } from '@mui/material'
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender
} from '@tanstack/react-table'
import classnames from 'classnames'
import { ChevronUp, ChevronDown, Upload, Trash2 } from 'lucide-react'

import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@components/TablePaginationComponent'
import {
  useExportAttendanceDetailsMutation,
  useGetAttendanceSummaryQuery,
  useSoftDeleteAttendanceMutation
} from '@/lib/redux-rtk/apis/attendanceApi'
import DeleteConfirmationDialog from '../dialogs/delete-confirmation-dialog'

const columnHelper = createColumnHelper()

const AttendanceDetailsTable = ({ userID, date, details, refetch }) => {
  const rows = useMemo(() => {
    const paired = []

    for (let i = 0; i < details.length; i += 2) {
      paired.push({
        id: details[i]?.id,
        checkin: details[i]?.datetime ?? '-',
        checkout: details[i + 1]?.datetime ?? '-'
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

  useEffect(() => setData(rows), [rows])

  const columns = useMemo(
    () => [
      columnHelper.accessor('checkin', {
        header: 'Check-in',
        cell: info => {
          const value = info.getValue()

          return (
            <div className='flex items-center justify-between'>
              <Typography>
                {value && value !== '-'
                  ? new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
                  : '-'}
              </Typography>
              {value && value !== '-' && (
                <Trash2
                  className='cursor-pointer text-red-500 ml-2'
                  size={16}
                  onClick={() => {
                    setDeleteItem(info.row.original)
                    setDeleteConfirmationOpen(true)
                  }}
                />
              )}
            </div>
          )
        }
      }),
      columnHelper.accessor('checkout', {
        header: 'Check-out',
        cell: info => {
          const value = info.getValue()

          return (
            <div className='flex items-center justify-between'>
              <Typography>
                {value && value !== '-'
                  ? new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
                  : '-'}
              </Typography>
              {value && value !== '-' && (
                <Trash2
                  className='cursor-pointer text-red-500 ml-2'
                  size={16}
                  onClick={() => {
                    setDeleteItem(info.row.original)
                    setDeleteConfirmationOpen(true)
                  }}
                />
              )}
            </div>
          )
        }
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
        user_id: userID || '',
        date: date || ''
      }).unwrap()

      const link = document.createElement('a')
      const fileName = `attendance_details.xlsx`

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

    try {
      const result = await softDeleteAttendance(item.id).unwrap()

      console.log({ result }, 'result from attendance deltee')
      refetch()
      setDeleteItem(null)
    } catch (error) {
      console.error('Failed to delete attendance:', error)

      throw error
    }
  }

  return (
    <>
      <div className='flex flex-col sm:flex-row justify-between items-center  gap-4'>
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

        <Button
          onClick={handleExportDetails}
          disabled={isDetailLoading}
          color='secondary'
          variant='tonal'
          startIcon={isDetailLoading ? <CircularProgress size={20} color='inherit' /> : <Upload size={18} />}
          className='max-sm:w-full'
        >
          {isDetailLoading ? 'Exporting…' : 'Export'}
        </Button>
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

      <DeleteConfirmationDialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
        onConfirm={() => handleDelete(deleteItem)}
        title='Delete Attendance'
        deletedItemName={deleteItem?.user_name ?? 'Attendance'}
        confirmText='Delete'
        loading={isDeleting}
      />
    </>
  )
}

export default AttendanceDetailsTable
