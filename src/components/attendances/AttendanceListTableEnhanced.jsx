'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

import { useRouter } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import Tooltip from '@mui/material/Tooltip'

// Third-party Imports
import classnames from 'classnames'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { format, parseISO } from 'date-fns'

// Component Imports
import { ChevronDown, ChevronUp, Eye, PlusIcon, Upload } from 'lucide-react'

import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'
import { getInitials } from '@/utils/getInitials'
import tableStyles from '@core/styles/table.module.css'
import AttendanceTableFiltersEnhanced from './AttendanceTableFiltersEnhanced'
import {
  resetFilters,
  setPage,
  setPerPage,
  setSearch,
  setSortBy,
  setSortOrder
} from '@/lib/redux-rtk/slices/attendanceSlice'
import { useExportAttendancesMutation } from '@/lib/redux-rtk/apis/attendanceApi'




const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const columnHelper = createColumnHelper()

const AttendanceListTableEnhanced = ({ tableData, userData, divisionData, departmentData, totalItems, refetch }) => {
  const [rowSelection, setRowSelection] = useState({})

  

  const [exportAttendances, { isLoading }] = useExportAttendancesMutation()

  const {
    selectedUser,
    selectedType,
    selectedDivision,
    selectedDepartment,
    dateRange,
    perPage,
    search,
    page,
    sortBy,
    sortOrder
  } = useSelector(state => state.attendanceSlice)

  const router = useRouter()
  const dispatch = useDispatch()

  const handleSort = columnId => {
    if (sortBy === columnId) {
      if (sortOrder === 'asc') {
        dispatch(setSortOrder('desc'))
      } else if (sortOrder === 'desc') {
        dispatch(setSortBy(''))
        dispatch(setSortOrder(''))
      }
    } else {
      dispatch(setSortBy(columnId))
      dispatch(setSortOrder('asc'))
    }
  }

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
        ),
        enableSorting: false
      },
      columnHelper.accessor('date', {
        header: 'Date',
        cell: ({ row }) => <Typography>{row.original.date}</Typography>,
        enableSorting: true
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
        },
        enableSorting: false
      }),
      columnHelper.accessor('first_checkin', {
        header: 'Check-in / Check-out',
        cell: ({ row }) => (
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-2'>
              <Typography className='font-medium text-sm'>Check In:</Typography>
              <Typography>
                {row.original.first_checkin ? format(parseISO(row.original.first_checkin), 'hh:mm a') : '-'}
              </Typography>
            </div>
            <div className='flex items-center gap-2'>
              <Typography className='font-medium text-sm'>Check Out:</Typography>
              <Typography>
                {row.original.last_checkout ? format(parseISO(row.original.last_checkout), 'hh:mm a') : '-'}
              </Typography>
            </div>
          </div>
        ),
        enableSorting: false
      }),
      columnHelper.accessor('actions', {
        header: 'Action',
        cell: ({ row }) => (
          <Tooltip title='Vew' arrow>
            <IconButton onClick={() => router.push(`/attendances/${row.original.user.id}?date=${row.original.date}`)}>
              <div className=''>
                <Eye className='w-5 h-5' />
              </div>
            </IconButton>
          </Tooltip>
        ),
        enableSorting: false
      })
    ],
    [router]
  )

  const table = useReactTable({
    data: tableData,
    columns,
    manualPagination: true,
    manualSorting: true, // Enable manual sorting
    pageCount: Math.ceil(totalItems / perPage),
    state: {
      rowSelection,
      sorting: sortBy ? [{ id: sortBy, desc: sortOrder === 'desc' }] : []
    },
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

  const handleExport = async () => {
    try {
      const blob = await exportAttendances({
        user_id: selectedUser || '',
        type: selectedType || '',
        division_id: selectedDivision || '',
        department_id: selectedDepartment || '',
        from: dateRange.start || '',
        to: dateRange.end || '',
        search: search || ''
      }).unwrap()

      const link = document.createElement('a')
      const fileName = `attendances.xlsx`

      link.href = URL.createObjectURL(blob)
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error('Export failed:', err)
      toast.error('Export failed. Please try again later.')
    }
  }

  return (
    <>
      <Card>
        <CardHeader title='Filters' className='pbe-4' />
        <AttendanceTableFiltersEnhanced
          userData={userData}
          divisionData={divisionData}
          departmentData={departmentData}
        />
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
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

            <Button
              variant='tonal'
              color='secondary'
              className='max-sm:is-full'
              onClick={() => dispatch(resetFilters())}
            >
              Reset Filters
            </Button>
          </div>

          <div className='flex  flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
            <DebouncedInput
              value={search ?? ''}
              onChange={value => dispatch(setSearch(String(value)))}
              placeholder='Search Employee'
              className='max-sm:is-full w-72'
            />

            <Button
              onClick={handleExport}
              disabled={isLoading}
              variant='tonal'
              startIcon={isLoading ? <CircularProgress size={18} color='inherit' /> : <Upload size={18} />}
              className='max-sm:w-full'
            >
              {isLoading ? 'Exporting…' : 'Export'}
            </Button>

           
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    const canSort = header.column.columnDef.enableSorting !== false
                    const isSorted = sortBy === header.column.id

                    return (
                      <th key={header.id}>
                        {header.isPlaceholder ? null : (
                          <div
                            className={classnames({
                              'flex items-center gap-2': true,
                              'cursor-pointer select-none': canSort
                            })}
                            onClick={() => canSort && handleSort(header.column.id)}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {canSort && isSorted && (
                              <>
                                {sortOrder === 'asc' && <ChevronUp className='text-xl' />}
                                {sortOrder === 'desc' && <ChevronDown className='text-xl' />}
                              </>
                            )}
                          </div>
                        )}
                      </th>
                    )
                  })}
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
