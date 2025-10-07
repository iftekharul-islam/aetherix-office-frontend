'use client'

// React Imports
import { useEffect, useState, useMemo, useRef } from 'react'

import { useRouter } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'

// Next Imports

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import Tooltip from '@mui/material/Tooltip'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

import { format, parseISO } from 'date-fns'

// Component Imports
import { ChevronDown, ChevronUp, Download, Edit3, Eye, LogIn, LogOut, Trash2 } from 'lucide-react'

import TablePaginationComponent from '@components/TablePaginationComponent'

import OptionMenu from '@core/components/option-menu'
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

import AttendanceTableFilters from './AttendanceTableFilter'

import { resetFilters, setPage, setPerPage, setSearch } from '@/lib/redux-rtk/slices/attendanceSlice'

import AttendanceTableFiltersEnhanced from './AttendanceTableFiltersEnhanced'

// Styled Components
const Icon = styled('i')({})

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Vars
const userRoleObj = {
  admin: { icon: 'tabler-crown', color: 'error' },
  author: { icon: 'tabler-device-desktop', color: 'warning' },
  editor: { icon: 'tabler-edit', color: 'info' },
  maintainer: { icon: 'tabler-chart-pie', color: 'success' },
  subscriber: { icon: 'tabler-user', color: 'primary' }
}

// Column Definitions
const columnHelper = createColumnHelper()

const AttendanceListTableEnhanced = ({ tableData, userData, divisionData, departmentData, totalItems }) => {
  // States

  console.log({ totalItems }, 'totals')

  const [rowSelection, setRowSelection] = useState({})

  const [data, setData] = useState(...[tableData])

  const { perPage, search, page } = useSelector(state => state.attendanceSlice)
  const attendanceSlices = useSelector(state => state.attendanceSlice)

  const router = useRouter()

  console.log({ attendanceSlices })
  const dispatch = useDispatch()

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('date', {
        header: 'Date',
        cell: ({ row }) => <Typography>{row.original.date}</Typography>
      }),
      columnHelper.accessor('user', {
        header: 'Employee',
        cell: ({ row }) => {
          const user = row.original.user

          return (
            <div className='flex items-center gap-4'>
              {getAvatar({ fullName: user.name })}
              <div className='flex flex-col gap-1'>
                <Typography>
                  <span className='font-semibold'>{user.name} </span>{' '}
                  <span className='bg-primaryLight px-1 py-0.5 text-xs rounded-md'>{user.employee_id ?? '-'}</span>
                </Typography>
                <Typography variant='body2' className='text-primary'>
                  {user.email}{' '}
                </Typography>

                <Typography variant='body2' className='text-primary px-1 py-0.5 rounded-md bg-primaryLighter'>
                  Department: {user.department ?? '-'}
                </Typography>
              </div>
            </div>
          )
        }
      }),
      columnHelper.accessor('first_checkin', {
        header: 'Check-in / Check-out',
        cell: ({ row }) => (
          <>
            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-2'>
                <Typography className='font-medium  text-sm'>Check In:</Typography>
                <Typography>
                  {row.original.first_checkin ? format(parseISO(row.original.first_checkin), 'hh:mm a') : '-'}
                </Typography>
              </div>
              <div className='flex items-center gap-2'>
                <Typography className='font-medium  text-sm'>Check Out:</Typography>
                <Typography>
                  {row.original.last_checkout ? format(parseISO(row.original.last_checkout), 'hh:mm a') : '-'}
                </Typography>
              </div>
            </div>
          </>
        )
      }),
      columnHelper.accessor('actions', {
        header: 'Action',
        cell: ({ row }) => (
          <IconButton
            onClick={() => router.push(`/attendances/${row.original.user.id}?date=${row.original.date}`)}
          >
            <Tooltip title='View Details'>
              <Eye className='w-5 h-5' />
            </Tooltip>
          </IconButton>
        )
      })
    ],
    [router]
  )

  const table = useReactTable({
    data: tableData,
    columns,
    manualPagination: true,
    pageCount: Math.ceil(totalItems / perPage),
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel()
  })

  const getAvatar = params => {
    const { avatar, fullName } = params

    if (avatar) {
      return <CustomAvatar src={avatar} size={34} />
    } else {
      return <CustomAvatar size={34}>{getInitials(fullName)}</CustomAvatar>
    }
  }

  return (
    <>
      <Card>
        <CardHeader title='Filters' className='pbe-4' />
        {/* <AttendanceTableFilters userData={userData} divisionData={divisionData} departmentData={departmentData} /> */}
        <AttendanceTableFiltersEnhanced
          userData={userData}
          divisionData={divisionData}
          departmentData={departmentData}
        />
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField
            select
            value={perPage}
            onChange={e => {
              dispatch(setPerPage(e.target.value))
              dispatch(setPage(1))
            }}
            className='max-sm:is-full sm:is-[70px]'
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </CustomTextField>
          <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
            <DebouncedInput
              value={search ?? ''}
              onChange={value => dispatch(setSearch(String(value)))}
              placeholder='Search Employee'
              className='max-sm:is-full'
            />

            <Button
              color='secondary'
              variant='tonal'
              startIcon={<i className='tabler-upload' />}
              className='max-sm:is-full'
            >
              Export
            </Button>
            <Button variant='contained' className='max-sm:is-full' onClick={() => dispatch(resetFilters())}>
              Reset Filters
            </Button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <ChevronUp className='text-xl' />,
                              desc: <ChevronDown className='text-xl' />
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table?.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table.getRowModel().rows.map(row => {
                  return (
                    <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            )}
          </table>
        </div>

        <div className='flex justify-center md:justify-end p-4'>
          <Pagination
            count={Math.ceil(totalItems / perPage)}
            page={page}
            onChange={(_, newPage) => dispatch(setPage(newPage))}
            showFirstButton
            showLastButton
            color='primary'
            variant='tonal'
          />
        </div>
      </Card>
    </>
  )
}

export default AttendanceListTableEnhanced
