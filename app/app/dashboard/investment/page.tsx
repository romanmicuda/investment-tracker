'use client'

import { useEffect, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DataTable } from './Table'
import { useInvestmentContext } from './InvestmentContext'
import { useRouter } from 'next/navigation'


// Define your investment data type to match Java model
type Investment = {
    id: string
    assetName: string
    quantity: number
    buyPrice: number
    currentPrice?: number // Optional to match Double in Java
    buyDate: string // ISO date string
    notes?: string
}

const page = () => {
    return (
        <>
            <Control />
            <InvestementForm />
            <InvestmentTable />
        </>
    )
}

export default page

const Control = () => {
    const { setShowAddInvestmentForm, filterInvestments } = useInvestmentContext()
    const [searchQuery, setSearchQuery] = useState('')
    return (
        <Card className="w-5xl m-5 mt-10">
            <CardHeader className="flex justify-between">
                <form className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Search investments..."
                        className="w-2xl"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button type="button" onClick={() => filterInvestments(searchQuery)}>
                        Search
                    </Button>
                </form>
                <Button onClick={() =>
                    setShowAddInvestmentForm((prev: boolean) => !prev)}>
                    Add Investment</Button>
            </CardHeader>
        </Card>
    )
}

interface TableSetupType {
    pageNumber: number;
    pageSize: number;
}

const InvestementForm = () => {
    const { showAddInvestmentForm, setShowAddInvestmentForm,
        addInvestment
     } = useInvestmentContext()
    if (!showAddInvestmentForm) return null
    return (
        <Card className="w-5xl m-5 mt-10">
            <CardHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        const formData = new FormData(e.currentTarget)
                        const newInvestment: Investment = {
                            assetName: formData.get('assetName') as string,
                            quantity: parseFloat(formData.get('quantity') as string),
                            buyPrice: parseFloat(formData.get('buyPrice') as string),
                            buyDate: formData.get('buyDate') as string,
                            notes: formData.get('notes') as string || ''
                        }
                        addInvestment(newInvestment)
                        setShowAddInvestmentForm(false)
                    }
                    }
                >
                    <div className="flex flex-col gap-4">

                        <Input
                            type="text"
                            placeholder="Asset Name"
                            className="w-full"
                            name="assetName"
                        />
                        <Input
                            type="number"
                            placeholder="Quantity"
                            className="w-full"
                            name="quantity"
                            step="any"
                            min="0"
                        />
                        <Input
                            type="number"
                            placeholder="Buy Price"
                            className="w-full"
                            name="buyPrice"
                            step="any"
                            min="0"
                        />
                        <Input
                            type="date"
                            placeholder="Buy Date"
                            className="w-full"
                            name="buyDate"
                        />
                        <Input
                            type="text"
                            placeholder="Notes"
                            className="w-full"
                            name="notes"
                        />
                        <div className="flex gap-2 mt-2">
                            <Button type="submit">Save Investment</Button>
                            <Button variant="outline" onClick={() => setShowAddInvestmentForm(false)}>
                                Cancel
                            </Button>

                        </div>

                    </div>
                </form>
            </CardHeader>
        </Card>
    )
}

const InvestmentTable = () => {
    const { getInvestements, filteredInvestments, tableSetup, setTableSetup  } = useInvestmentContext()
    const router = useRouter()
    useEffect(() => {
        getInvestements()
    }, [tableSetup])

    // Define columns for your investment data
    const columns: ColumnDef<Investment>[] = [
        {
            header: 'Asset Name',
            accessorKey: 'assetName',
            cell: ({ row }) => (
                <div className="font-medium">
                    {row.getValue('assetName')}
                </div>
            )
        },
        {
            header: 'Quantity',
            accessorKey: 'quantity',
            cell: ({ row }) => (
                <div className="max-w-32 truncate" >
                    {(row.getValue('quantity') as number).toLocaleString()}
                </div>
            )
        },
        {
            header: 'Buy Price',
            accessorKey: 'buyPrice',
            cell: ({ row }) => (
                <div className="max-w-32 truncate" >
                    ${(row.getValue('buyPrice') as number).toFixed(2)}
                </div>
            )
        },
        {
            header: 'Total Value',
            id: 'totalValue',
            cell: ({ row }) => {
                const quantity = row.getValue('quantity') as number
                const currentPrice = row.getValue('currentPrice') as number | undefined
                const buyPrice = row.getValue('buyPrice') as number

                const value = currentPrice ? quantity * currentPrice : quantity * buyPrice
                return (
                    <div className="max-w-32 truncate">
                        ${value.toFixed(2)}
                    </div>
                )
            }
        },
        {
            header: 'Notes',
            accessorKey: 'notes',
            cell: ({ row }) => {
                const notes = row.getValue('notes') as string | undefined
                return (
                    <div className="max-w-32 truncate" title={notes}>
                        {notes || '-'}
                    </div>
                )
            }
        }
    ]

    return (
        <Card className="w-5xl m-5 p-5 mt-10">
            <DataTable
                data={filteredInvestments}
                columns={columns}
                initialPageSize={tableSetup.pageSize}
                initialSorting={[
                    {
                        id: 'buyDate',
                        desc: true
                    }
                ]}
                emptyMessage="No investments found. Add your first investment to get started."
                pageSizeOptions={[5, 10, 25, 50]}
                showPagination={true}
                showRowsPerPage={true}
                className="mt-4"
                onPageSizeChange={(pageSize) => {
                    // console.log('Page size changed:', pageSize)
                    setTableSetup((prev) => ({ ...prev, pageSize }))}}
                onPageNumberChange={(pageNumber) => {
                    console.log('Page number changed:', pageNumber)
                    setTableSetup((prev) => ({ ...prev, pageNumber }))
                }}
                onClick={(id) => router.push(`investment/${id}`)}
            />
        </Card>
    )
}
