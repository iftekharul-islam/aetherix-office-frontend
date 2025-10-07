'use client'

import { useEffect, useState, useMemo } from 'react'

import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
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
import { ChevronUp, ChevronDown } from 'lucide-react'

import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@components/TablePaginationComponent'

const columnHelper = createColumnHelper()

const AttendanceDetailsTable = ({ details }) => {
  // Transform raw details into checkin/checkout pairs
  const rows = useMemo(() => {
    // Separate checkins and checkouts
    const checkins = details.filter(d => d.type === 'checkin').map(d => d.datetime)
    const checkouts = details.filter(d => d.type === 'checkout').map(d => d.datetime)

    const maxLength = Math.max(checkins.length, checkouts.length)
    const paired = []

    for (let i = 0; i < maxLength; i++) {
      paired.push({
        checkin: checkins[i] ?? '-',
        checkout: checkouts[i] ?? '-'
      })
    }

    return paired
  }, [details])

  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(rows)

  useEffect(() => setData(rows), [rows])

  const columns = useMemo(
    () => [
      columnHelper.accessor('checkin', {
        header: 'Check-in',
        cell: info => {
          const value = info.getValue()

          return (
            <Typography>
              {value && value !== '-'
                ? new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
                : '-'}
            </Typography>
          )
        }
      }),
      columnHelper.accessor('checkout', {
        header: 'Check-out',
        cell: info => {
          const value = info.getValue()

          return (
            <Typography>
              {value && value !== '-'
                ? new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
                : '-'}
            </Typography>
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

  return (
    <>
      {/* Toolbar: Page size + Export */}
      <div className='flex flex-col sm:flex-row justify-between items-center p-4 gap-4'>
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
        <Button color='secondary' variant='tonal' startIcon={<i className='tabler-upload' />} className='max-sm:w-full'>
          Export
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
    </>
  )
}

export default AttendanceDetailsTable
