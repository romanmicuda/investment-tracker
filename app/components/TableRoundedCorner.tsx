import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

type TableColumn<T> = {
  header: React.ReactNode
  accessor: keyof T
  className?: string
  cellRender?: (value: any, row: T) => React.ReactNode
}

type TableRoundedCornerProps<T> = {
  columns: TableColumn<T>[]
  data: T[]
  footer?: React.ReactNode
  pagination?: React.ReactNode
  caption?: string
}

function TableRoundedCorner<T extends { [key: string]: any }>({
  columns,
  data,
  footer,
  pagination,
  caption
}: TableRoundedCornerProps<T>) {
  return (
    <div className='w-full'>
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead key={idx} className={col.className}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                {columns.map((col, j) => (
                  <TableCell key={j} className={col.className}>
                    {col.cellRender
                      ? col.cellRender(row[col.accessor], row)
                      : row[col.accessor]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          {footer && (
            <TableFooter>
              <TableRow>{footer}</TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
      {pagination && <div className='mt-4'>{pagination}</div>}
      {caption && (
        <p className='text-muted-foreground mt-4 text-center text-sm'>{caption}</p>
      )}
    </div>
  )
}

export default TableRoundedCorner