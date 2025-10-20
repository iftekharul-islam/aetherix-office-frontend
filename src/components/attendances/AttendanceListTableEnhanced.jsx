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
import { differenceInMinutes, format, parseISO } from 'date-fns'

// Component Imports
import { ChevronDown, ChevronUp, Edit3, Eye, MoreHorizontal, Upload } from 'lucide-react'

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
import EditAttendanceNoteDialog from '../dialogs/eidit-attendance-note'
import FullNoteDialog from '../dialogs/full-note-dialog'

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
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedAttendance, setSelectedAttendance] = useState(null)
  const [fullNoteDialogOpen, setFullNoteDialogOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState('')

  const [exportAttendances, { isLoading }] = useExportAttendancesMutation()

  const { user } = useSelector(state => state.userSlice)

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
        cell: ({ row }) => {
          const MAX_NOTE_LENGTH = 20
          const note = row.original.note || '-'
          const shouldTruncate = note.length > MAX_NOTE_LENGTH && note !== '-'
          const displayNote = shouldTruncate ? note.substring(0, MAX_NOTE_LENGTH) : note

          return (
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

              <div className='flex items-center gap-2'>
                <Typography className='font-medium text-sm'>Note:</Typography>
                <div className='flex items-center gap-1'>
                  <Typography className='text-sm'>{displayNote}</Typography>

                  {shouldTruncate && (
                    <Tooltip title='Show More' arrow>
                      <IconButton onClick={() => handleShowFullNote(row.original.note)} size='small'>
                        <MoreHorizontal className='w-4 h-4' />
                      </IconButton>
                    </Tooltip>
                  )}

                  {user && user?.role === 'admin' && (
                    <Tooltip title='Edit Note' arrow>
                      <IconButton onClick={() => handleEditNote(row.original)} size='small'>
                        <Edit3 className='w-4 h-4' />
                      </IconButton>
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
          )
        },
        enableSorting: false
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => {
          const getAttendanceStatus = () => {
            const officeStartTime = row.original.user.office_start_time

            const firstCheckin = row.original.first_checkin

            if (!officeStartTime || !firstCheckin) {
              return { label: 'Absent', color: 'bg-[#FF3B30] text-white shadow-[0_0_10px_#FF3B30]' }
            }

            const [startHour, startMinute, startSecond] = officeStartTime.split(':').map(Number)
            const checkinDate = parseISO(firstCheckin)

            const attendanceDate = parseISO(row.original.date)
            const officeStartDate = new Date(attendanceDate)

            officeStartDate.setHours(startHour, startMinute, startSecond || 0, 0)

            if (startHour >= 18 && checkinDate.getHours() < 12) {
              officeStartDate.setDate(officeStartDate.getDate() - 1)
            }

            const diffMinutes = differenceInMinutes(checkinDate, officeStartDate)

            if (diffMinutes <= row.original.user.on_time_threshold_minutes) {
              return { label: 'On Time', color: 'bg-blue-600 text-white shadow-[0_0_10px_#2563eb]' }
            } else if (diffMinutes <= row.original.user.delay_threshold_minutes) {
              return { label: 'Delay', color: 'bg-red-600 text-white shadow-[0_0_10px_#dc2626]' }
            } else if (diffMinutes <= row.original.user.extreme_delay_threshold_minutes) {
              return { label: 'Extreme Delay', color: 'bg-[#7f1d1d] text-white shadow-[0_0_10px_#7f1d1d]' }
            } else {
              return { label: 'Extreme Delay', color: 'bg-[#7f1d1d] text-white shadow-[0_0_10px_#7f1d1d]' }
            }
          }

          const status = getAttendanceStatus()

          return (
            <Typography
              className={`px-2 py-0.5 rounded-md text-xs font-semibold text-center inline-block ${status.color}`}
            >
              {status.label}
            </Typography>
          )
        },
        enableSorting: false
      }),
      columnHelper.accessor('expected_duty_hours', {
        header: 'Expected Duty Hours',
        cell: ({ row }) => {
          const expectedHours = row.original.user?.expected_duty_hours || 9
          const wholeHours = Math.floor(expectedHours)
          const minutes = Math.round((expectedHours - wholeHours) * 60)

          return <Typography>{`${wholeHours}h: ${minutes.toString().padStart(2, '0')}m`}</Typography>
        },
        enableSorting: false
      }),

      columnHelper.accessor('actual_worked_hours', {
        header: 'Actual Worked Hours',
        cell: ({ row }) => {
          const details = row.original.details

          if (!details || details.length === 0) {
            return <Typography>-</Typography>
          }

          let totalMinutes = 0

          // Pair consecutive entries: even index = checkin, odd index = checkout
          for (let i = 0; i < details.length - 1; i += 2) {
            const checkinTime = parseISO(details[i].datetime)
            const checkoutTime = parseISO(details[i + 1].datetime)

            totalMinutes += differenceInMinutes(checkoutTime, checkinTime)
          }

          const hours = Math.floor(totalMinutes / 60)
          const minutes = totalMinutes % 60

          return <Typography>{`${hours}h ${minutes}m`}</Typography>
        },
        enableSorting: false
      }),

      columnHelper.accessor('extra_less_duty_hours', {
        header: 'Extra/Less Duty Hours',
        cell: ({ row }) => {
          const details = row.original.details
          const expectedHours = row.original.user?.expected_duty_hours || 9

          if (!details || details.length === 0) {
            return <Typography>-</Typography>
          }

          let totalMinutes = 0

          // Pair consecutive entries: even index = checkin, odd index = checkout
          for (let i = 0; i < details.length - 1; i += 2) {
            const checkinTime = parseISO(details[i].datetime)
            const checkoutTime = parseISO(details[i + 1].datetime)

            totalMinutes += differenceInMinutes(checkoutTime, checkinTime)
          }

          const expectedMinutes = expectedHours * 60
          const diffMinutes = totalMinutes - expectedMinutes
          const isNegative = diffMinutes < 0
          const absDiffMinutes = Math.abs(diffMinutes)

          const hours = Math.floor(absDiffMinutes / 60)
          const minutes = absDiffMinutes % 60

          const sign = isNegative ? '- ' : ''
          const bgColor = isNegative ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'

          return (
            <Typography className={`font-semibold ${bgColor} px-2 py-1 rounded-md inline-block text-sm`}>
              {sign}
              {hours}h {minutes}m
            </Typography>
          )
        },
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
    manualSorting: true,
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

  const handleEditNote = item => {
    setSelectedAttendance(item)
    setEditDialogOpen(true)
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
        search: search || '',
        sortBy,
        sortOrder
      }).unwrap()

      const link = document.createElement('a')
      const fileName = `attendances_${dateRange.start}_to_${dateRange.end}.xlsx`

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

  const handleShowFullNote = note => {
    setSelectedNote(note)
    setFullNoteDialogOpen(true)
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

            {user && user.role === 'admin' && (
              <Button
                onClick={handleExport}
                disabled={isLoading}
                variant='tonal'
                startIcon={isLoading ? <CircularProgress size={18} color='inherit' /> : <Upload size={18} />}
                className='max-sm:w-full'
              >
                {isLoading ? 'Exporting…' : 'Export'}
              </Button>
            )}
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

        <EditAttendanceNoteDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          attendanceItem={selectedAttendance}
          refetch={refetch}
        />

        <FullNoteDialog open={fullNoteDialogOpen} onClose={() => setFullNoteDialogOpen(false)} note={selectedNote} />
      </Card>
    </>
  )
}

export default AttendanceListTableEnhanced
