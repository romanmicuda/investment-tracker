'use client'

import { useEffect, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DataTable } from './Table'
import { useInvestmentContext } from './InvestmentContext'


// Define your investment data type to match Java model
type Investment = {
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
    const { setShowAddInvestmentForm } = useInvestmentContext()
    return (
        <Card className="w-5xl m-5 mt-10">
            <CardHeader className="flex justify-between">
                <form className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Search investments..."
                        className="w-2xl"
                    />
                    <Button type="submit">
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
    const { getInvestements, investments, tableSetup, setTableSetup  } = useInvestmentContext()

    useEffect(() => {
        getInvestements()
    }, [tableSetup])

    useEffect(() => {
        console.log('TINVEd:', investments)
    }, [investments])
    // Helper function to calculate gain/loss
    const calculateGainLoss = (quantity: number, buyPrice: number, currentPrice?: number) => {
        if (!currentPrice) return { gainLoss: 0, gainLossPercent: 0, status: 'Unknown' as const }

        const totalBuyValue = quantity * buyPrice
        const totalCurrentValue = quantity * currentPrice
        const gainLoss = totalCurrentValue - totalBuyValue
        const gainLossPercent = (gainLoss / totalBuyValue) * 100

        let status: 'Profitable' | 'Loss' | 'Break Even' | 'Unknown'
        if (gainLoss > 0) status = 'Profitable'
        else if (gainLoss < 0) status = 'Loss'
        else status = 'Break Even'

        return { gainLoss, gainLossPercent, status }
    }

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
                <div className="text-right">
                    {(row.getValue('quantity') as number).toLocaleString()}
                </div>
            )
        },
        {
            header: 'Buy Price',
            accessorKey: 'buyPrice',
            cell: ({ row }) => (
                <div className="text-right">
                    ${(row.getValue('buyPrice') as number).toFixed(2)}
                </div>
            )
        },
        {
            header: 'Current Price',
            accessorKey: 'currentPrice',
            cell: ({ row }) => {
                const currentPrice = row.getValue('currentPrice') as number | undefined
                return (
                    <div className="text-right">
                        {currentPrice ? `$${currentPrice.toFixed(2)}` : 'N/A'}
                    </div>
                )
            }
        },
        {
            header: 'Buy Date',
            accessorKey: 'buyDate',
            cell: ({ row }) => (
                <div>
                    {new Date(row.getValue('buyDate')).toLocaleDateString()}
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
                    <div className="text-right font-medium">
                        ${value.toFixed(2)}
                    </div>
                )
            }
        },
        {
            header: 'Gain/Loss',
            id: 'gainLoss',
            cell: ({ row }) => {
                const quantity = row.getValue('quantity') as number
                const buyPrice = row.getValue('buyPrice') as number
                const currentPrice = row.getValue('currentPrice') as number | undefined

                const { gainLoss } = calculateGainLoss(quantity, buyPrice, currentPrice)
                const isPositive = gainLoss >= 0

                if (!currentPrice) {
                    return <div className="text-right text-gray-500">N/A</div>
                }

                return (
                    <div className={`text-right font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? '+' : ''}${gainLoss.toFixed(2)}
                    </div>
                )
            }
        },
        {
            header: 'Gain/Loss %',
            id: 'gainLossPercent',
            cell: ({ row }) => {
                const quantity = row.getValue('quantity') as number
                const buyPrice = row.getValue('buyPrice') as number
                const currentPrice = row.getValue('currentPrice') as number | undefined

                const { gainLossPercent } = calculateGainLoss(quantity, buyPrice, currentPrice)
                const isPositive = gainLossPercent >= 0

                if (!currentPrice) {
                    return <div className="text-right text-gray-500">N/A</div>
                }

                return (
                    <div className={`text-right font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? '+' : ''}{gainLossPercent.toFixed(2)}%
                    </div>
                )
            }
        },
        {
            header: 'Status',
            id: 'status',
            cell: ({ row }) => {
                const quantity = row.getValue('quantity') as number
                const buyPrice = row.getValue('buyPrice') as number
                const currentPrice = row.getValue('currentPrice') as number | undefined

                const { status } = calculateGainLoss(quantity, buyPrice, currentPrice)

                const statusStyles = {
                    'Profitable': 'bg-green-100 text-green-800 hover:bg-green-200',
                    'Loss': 'bg-red-100 text-red-800 hover:bg-red-200',
                    'Break Even': 'bg-gray-100 text-gray-800 hover:bg-gray-200',
                    'Unknown': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                }[status]

                return (
                    <Badge className={statusStyles}>
                        {status}
                    </Badge>
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
                data={investments}
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
            />
        </Card>
    )
}
