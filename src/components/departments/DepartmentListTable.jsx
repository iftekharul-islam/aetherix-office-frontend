'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// Next Imports
import Link from 'next/link'

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

// Component Imports
import { ChevronDown, ChevronUp, Download, Edit3, Eye, Trash2, Upload } from 'lucide-react'

import { toast } from 'react-toastify'

import { CircularProgress } from '@mui/material'

import TablePaginationComponent from '@components/TablePaginationComponent'

import OptionMenu from '@core/components/option-menu'
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

import DepartmentTableFilters from './DepartmentTableFilter'
import AddDepartmentDrawer from './AddDepartmentDrawer'
import EditDepartmentInfo from '../dialogs/edit-department-info'
import {
  useDeleteDepartmentMutation,
  useExportDepartmentsMutation,
  useGetDepartmentsQuery
} from '@/lib/redux-rtk/apis/departmentApi'
import DeleteConfirmationDialog from '../dialogs/delete-confirmation-dialog'

// Styled Components
const Icon = styled('i')({})

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

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

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// Column Definitions
const columnHelper = createColumnHelper()

const DepartmentListTable = ({ tableData, employeeData, divisionData }) => {
  // States
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(...[tableData])
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const [isEditDepartmentDialogOpen, setIsEditDepartmentDialogOpen] = useState(false)
  const [departmentData, setDepartmentData] = useState(null)

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
  const [deleteItem, setDeleteItem] = useState(null)

  const [deleteDepartment, { isLoading }] = useDeleteDepartmentMutation()
  const { refetch } = useGetDepartmentsQuery()
  const [exportDepartments, { isLoading: isExporting }] = useExportDepartmentsMutation()

  // Column Definitions
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

      columnHelper.accessor('code', {
        header: 'Code',
        cell: ({ row }) => (
          <Typography variant='body2' color='text.secondary'>
            {row.original.code}
          </Typography>
        )
      }),
      columnHelper.accessor('description', {
        header: 'Description',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.description}</Typography>
      }),
      columnHelper.accessor('division', {
        header: 'Division',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.division?.name || '—'}</Typography>
      }),
      columnHelper.accessor('head', {
        header: 'Head Name',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.head?.name || '—'}</Typography>
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton
              disabled={isLoading}
              onClick={() => {
                setDeleteItem(row.original)
                setDeleteConfirmationOpen(true)
              }}
            >
              <Trash2 />
            </IconButton>

            <IconButton onClick={() => console.log('department-row', row.original)}>
              <Eye className='text-textSecondary' />
            </IconButton>

            <IconButton
              onClick={() => {
                setDepartmentData(row.original)
                setIsEditDepartmentDialogOpen(true)
              }}
            >
              <Edit3 className='w-4 h-4 text-secondary' />
            </IconButton>

            {/* <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Edit',
                  icon: <Edit3 className='w-4 h-4' />,
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => {
                      setDepartmentData(row.original)
                      setIsEditDepartmentDialogOpen(true)
                    }
                  }
                }
              ]}
            /> */}
          </div>
        ),
        enableSorting: false
      })
    ],
    [isLoading]
  )

  useEffect(() => {
    setData(tableData)
    setFilteredData(tableData)
  }, [tableData])

  const table = useReactTable({
    data: filteredData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  const getAvatar = params => {
    const { avatar, fullName } = params

    if (avatar) {
      return <CustomAvatar src={avatar} size={34} />
    } else {
      return <CustomAvatar size={34}>{getInitials(fullName)}</CustomAvatar>
    }
  }

  const handleDelete = async item => {
    if (!item) {
      toast.error('No department selected for deletion!')
      throw new Error('No department selected')
    }

    try {
      const result = await deleteDepartment(item.id).unwrap()

      console.log({ result }, 'department deletion')
      refetch()

      // toast.success('Department deleted successfully!')
    } catch (err) {
      console.error('Failed to delete department:', err)

      // toast.error('Failed to delete department!')
      throw err
    }
  }

  const handleExportDepartments = async () => {
    try {
      const blob = await exportDepartments().unwrap()
      const link = document.createElement('a')

      link.href = URL.createObjectURL(blob)

      link.setAttribute('download', 'departments.xlsx')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Export failed:', error)
      toast.error('Export failed. Please try again later.')
    }
  }

  return (
    <>
      <Card>
        <CardHeader title='Filters' className='pbe-4' />
        
        {/* //! TODO: Departments Filter */}
        {/* <DepartmentTableFilters setData={setFilteredData} tableData={data} /> */}
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='max-sm:is-full sm:is-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
          <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search Department'
              className='max-sm:is-full'
            />
            <Button
              onClick={handleExportDepartments}
              disabled={isExporting}
              color='secondary'
              variant='tonal'
              startIcon={isExporting ? <CircularProgress size={20} color='inherit' /> : <Upload size={18} />}
            >
              {isExporting ? 'Exporting…' : 'Export'}
            </Button>
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddUserOpen(!addUserOpen)}
              className='max-sm:is-full'
            >
              Add New Department
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
                              asc: <i className='tabler-chevron-up text-xl' />,
                              desc: <i className='tabler-chevron-down text-xl' />
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
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
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </Card>

      {isEditDepartmentDialogOpen && (
        <EditDepartmentInfo
          open={isEditDepartmentDialogOpen}
          setOpen={setIsEditDepartmentDialogOpen}
          departmentData={departmentData}
          employeeData={employeeData}
          divisionData={divisionData}
          title='Delete Department'
        />
      )}

      {deleteConfirmationOpen && (
        <DeleteConfirmationDialog
          open={deleteConfirmationOpen}
          onClose={() => setDeleteConfirmationOpen(false)}
          onConfirm={() => handleDelete(deleteItem)}
          title='Delete Department'
          deletedItemName={deleteItem?.name}
          confirmText='Delete'
        />
      )}
      <AddDepartmentDrawer
        open={addUserOpen}
        handleClose={() => setAddUserOpen(!addUserOpen)}
        employeeData={employeeData}
        divisionData={divisionData}
      />
    </>
  )
}

export default DepartmentListTable
