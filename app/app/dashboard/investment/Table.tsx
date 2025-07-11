'use client'

import { useId, useState } from 'react'

import {
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon
} from 'lucide-react'

import type { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { cn } from '@/lib/utils'

interface DataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData>[]
  initialPageSize?: number
  initialSorting?: SortingState
  pageSizeOptions?: number[]
  showPagination?: boolean
  showRowsPerPage?: boolean
  emptyMessage?: string
  className?: string
}

export function DataTable<TData>({
  data,
  columns,
  initialPageSize = 5,
  initialSorting = [],
  pageSizeOptions = [5, 10, 25, 50],
  showPagination = true,
  showRowsPerPage = true,
  emptyMessage = 'No results.',
  className
}: DataTableProps<TData>) {
  const id = useId()

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize
  })

  const [sorting, setSorting] = useState<SortingState>(initialSorting)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination
    }
  })

  return (
    <div className={cn('space-y-4 md:w-full', className)}>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className='hover:bg-transparent'>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} style={{ width: `${header.getSize()}px` }} className='h-11'>
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                              'flex h-full cursor-pointer items-center justify-between gap-2 select-none'
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={e => {
                            if (header.column.getCanSort() && (e.key === 'Enter' || e.key === ' ')) {
                              e.preventDefault()
                              header.column.getToggleSortingHandler()?.(e)
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <ChevronUpIcon className='shrink-0 opacity-60' size={16} aria-hidden='true' />,
                            desc: <ChevronDownIcon className='shrink-0 opacity-60' size={16} aria-hidden='true' />
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showPagination && (
        <div className='flex items-center justify-between gap-8'>
          {showRowsPerPage && (
            <div className='flex items-center gap-3'>
              <Label htmlFor={id} className='max-sm:sr-only'>
                Rows per page
              </Label>
              <Select
                value={table.getState().pagination.pageSize.toString()}
                onValueChange={value => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger id={id} className='w-fit whitespace-nowrap'>
                  <SelectValue placeholder='Select number of results' />
                </SelectTrigger>
                <SelectContent className='[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2'>
                  {pageSizeOptions.map(pageSize => (
                    <SelectItem key={pageSize} value={pageSize.toString()}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className='text-muted-foreground flex grow justify-end text-sm whitespace-nowrap'>
            <p className='text-muted-foreground text-sm whitespace-nowrap' aria-live='polite'>
              <span className='text-foreground'>
                {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                {Math.min(
                  Math.max(
                    table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
                      table.getState().pagination.pageSize,
                    0
                  ),
                  table.getRowCount()
                )}
              </span>{' '}
              of <span className='text-foreground'>{table.getRowCount().toString()}</span>
            </p>
          </div>

          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    size='icon'
                    variant='outline'
                    className='disabled:pointer-events-none disabled:opacity-50'
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                    aria-label='Go to first page'
                  >
                    <ChevronFirstIcon size={16} aria-hidden='true' />
                  </Button>
                </PaginationItem>

                <PaginationItem>
                  <Button
                    size='icon'
                    variant='outline'
                    className='disabled:pointer-events-none disabled:opacity-50'
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    aria-label='Go to previous page'
                  >
                    <ChevronLeftIcon size={16} aria-hidden='true' />
                  </Button>
                </PaginationItem>

                <PaginationItem>
                  <Button
                    size='icon'
                    variant='outline'
                    className='disabled:pointer-events-none disabled:opacity-50'
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    aria-label='Go to next page'
                  >
                    <ChevronRightIcon size={16} aria-hidden='true' />
                  </Button>
                </PaginationItem>

                <PaginationItem>
                  <Button
                    size='icon'
                    variant='outline'
                    className='disabled:pointer-events-none disabled:opacity-50'
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                    aria-label='Go to last page'
                  >
                    <ChevronLastIcon size={16} aria-hidden='true' />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  )
}