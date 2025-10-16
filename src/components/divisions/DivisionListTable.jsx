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
import CircularProgress from '@mui/material/CircularProgress'
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

import TablePaginationComponent from '@components/TablePaginationComponent'

import TableFilters from './TableFilters'
import AddDivisionDrawer from './AddDivisionDrawer'
import OptionMenu from '@core/components/option-menu'
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import EditDivisionInfo from '../dialogs/edit-division-info'
import DeleteConfirmationDialog from '../dialogs/delete-confirmation-dialog'
import {
  useDeleteDivisionMutation,
  useExportDivisionsMutation,
  useGetDivisionsQuery
} from '@/lib/redux-rtk/apis/divisionApi'

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

const DivisionListTable = ({ tableData, employeeData }) => {
  // States
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(...[tableData])
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const [isDivisionDialogOpen, setIsDivisionDialogOpen] = useState(false)
  const [divisionData, setDivisionData] = useState(null)

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
  const [deleteItem, setDeleteItem] = useState(null)

  const [deleteDivision, { isLoading }] = useDeleteDivisionMutation()
  const { refetch } = useGetDivisionsQuery()
  const [exportDivisions, { isLoading: isExporting }] = useExportDivisionsMutation()

  useEffect(() => {
    setData(tableData)
    setFilteredData(tableData)
  }, [tableData])

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
      columnHelper.accessor('name', {
        header: 'Division',
        cell: ({ row }) => (
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
              {row.original.name}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Code: {row.original.code}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('description', {
        header: 'Description',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.description}</Typography>
      }),
      columnHelper.accessor('head', {
        header: 'Head',
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

            <IconButton onClick={() => console.log('row-data-check', row.original)}>
              {/* <Link href={`/apps/division/view/${row.original.id}`} className='flex'> */}
              <Eye className='text-textSecondary' />
              {/* </Link> */}
            </IconButton>

            <IconButton
              onClick={() => {
                setDivisionData(row.original)
                setIsDivisionDialogOpen(true)
              }}
            >
              <Edit3 className='w-4 h-4 text-secondary' />
            </IconButton>
            {/* <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Download',
                  icon: <Download className='w-4 h-4' />,
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                },
                {
                  text: 'Edit',
                  icon: <Edit3 className='w-4 h-4' />,
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => {
                      setDivisionData(row.original)
                      setIsDivisionDialogOpen(true)
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
      toast.error('No item selected for deletion!')
      throw new Error('No item selected')
    }

    try {
      const result = await deleteDivision(item.id).unwrap()

      refetch()

      // toast.success('Division deleted successfully!')
      setDeleteItem(null)

      // setDeleteConfirmationOpen(false)
    } catch (error) {
      console.error('Failed to delete division:', error)

      // toast.error('Failed to delete division!')
      throw error
    }
  }

  const handleExportDivisions = async () => {
    try {
      const blob = await exportDivisions().unwrap()
      const link = document.createElement('a')

      link.href = URL.createObjectURL(blob)
      link.setAttribute('download', 'divisions.xlsx')
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

        {/* //! TODO: Division Filters */}
        {/* <TableFilters setData={setFilteredData} tableData={data} /> */}
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
              placeholder='Search Division'
              className='max-sm:is-full'
            />
            <Button
              onClick={handleExportDivisions}
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
              Add New Division
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

      {isDivisionDialogOpen && (
        <EditDivisionInfo
          open={isDivisionDialogOpen}
          setOpen={setIsDivisionDialogOpen}
          divisionData={divisionData}
          employeeData={employeeData}
          title='Delete Division'

          // divisionData={data}
          // setData={setDivisionList} // your local state for table
        />
      )}

      {deleteConfirmationOpen && (
        <DeleteConfirmationDialog
          open={deleteConfirmationOpen}
          onClose={() => setDeleteConfirmationOpen(false)}
          onConfirm={() => handleDelete(deleteItem)}
          title='Delete Division'
          deletedItemName={deleteItem?.name}
          confirmText='Delete'
        />
      )}
      <AddDivisionDrawer
        open={addUserOpen}
        handleClose={() => setAddUserOpen(!addUserOpen)}
        employeeData={employeeData}
        setData={setData}
      />
    </>
  )
}

export default DivisionListTable
