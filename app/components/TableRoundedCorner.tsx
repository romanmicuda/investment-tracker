import React from 'react'
import { Edit, Trash2 } from 'lucide-react'
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
import { Button } from './ui/button'

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
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

function TableRoundedCorner<T extends { [key: string]: any }>({
  columns,
  data,
  footer,
  pagination,
  caption,
  onEdit,
  onDelete
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
              {(onEdit || onDelete)  && <TableHead>Actions</TableHead>}
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
                <TableCell>
                  <div className='flex items-center space-x-2'>
                    {onEdit && (
                      <EditButton onClick={() => onEdit(row.id)} />
                    )}
                    {onDelete && (
                      <DeleteButton onClick={() => onDelete(row.id)} />
                    )}
                  </div>
                </TableCell>
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


const DeleteButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    variant="destructive"
    size="icon"
    className="h-8 w-8 p-0"
    onClick={onClick}
  >
    <Trash2 className="h-4 w-4" />
  </Button>
)

const EditButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    variant="outline"
    size="icon"
    className="h-8 w-8 p-0"
    onClick={onClick}
  >
    <Edit className="h-4 w-4" />
  </Button>
)