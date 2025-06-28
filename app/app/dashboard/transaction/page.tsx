'use client'

import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import React, { useState } from "react"
import { api } from "@/components/utils/routes"
import ComboboxWithSearchAndButton from "@/components/ComboboxWithSearchAndButton"
import { TypeTransaction } from "@/components/utils/data"
import Combobox from "@/components/Combobox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import TableRoundedCorner from "@/components/TableRoundedCorner"
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


export default function page() {
    const [showAddTransactionForm, setShowAddTransactionForm] = React.useState(false);
    const closeAddTransactionForm = () => {
        setShowAddTransactionForm(false);
    }
    const openAddTransactionForm = () => {
        setShowAddTransactionForm(true);
    }
    return (
        <>
            <TransactionControl openForm={openAddTransactionForm} />
            {showAddTransactionForm && <AddTransactionForm closeForm={closeAddTransactionForm} />}
            <TransactionTable />
        </>
    )
}

const SearchInput = () => {
    return (
        <div className="flex gap-2">
            <Input type="text" placeholder="Search..." className="w-2xl" />
            <Button type="submit">
                Search
            </Button>
        </div>
    )
}

const TransactionControl = ({ openForm }: { openForm: () => void }) => {
    return (
        <>
            <Card className="w-5xl m-5 mt-10">
                <CardHeader className="flex justify-between">
                    <SearchInput />
                    <Button onClick={openForm}>Add Transaction</Button>
                </CardHeader>
            </Card>
        </>
    );
};

interface IFormInput {
    amount: number;
    date: string;
    type: string;
    category: string;
    description?: string;
}


const AddTransactionForm = ({ closeForm }: { closeForm: () => void }) => {
    const [formData, setFormData] = useState<IFormInput>({
        amount: 0,
        date: '',
        type: '',
        category: '',
        description: ''
    });

    const onSubmit = async (data: IFormInput): Promise<void> => {
        try {
            const response = await api.post("api/transaction", data);
            if (response.status === 200) {

                alert("Transaction added successfully!");
                closeForm();
            }
        } catch (error) {
            alert("Failed to add Transaction. Please try again.");
        }
    };

    return (
        <Card className="w-5xl m-5">
            <CardHeader>
                <CardTitle>Add Transaction</CardTitle>
                <CardDescription>Fill in the details below to add a new Transaction entry.</CardDescription>
            </CardHeader>
            <form className="p-4" onSubmit={(e) => {
                e.preventDefault();
                onSubmit(formData);
            }}>
                <div className="flex flex-col gap-2">
                    <Label>Amount</Label>
                    <Input
                        type="number"
                        step="any"
                        placeholder="Amount"
                        value={formData.amount}
                        className="w-1/2"
                        onChange={(e) => setFormData((prev) => ({ ...prev, amount: parseFloat(e.target.value) }))}
                    />
                    <Label>Date</Label>
                    <Input type="date" placeholder="Date"
                        value={formData.date}
                        className="w-1/2"
                        onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    />
                    <ComboboxWithSearchAndButton
                        options={TypeTransaction}
                        value={formData.type}
                        setValue={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                        label='Transaction Type'
                    />
                    <ComboboxWithSearchAndButton
                        options={[]}
                        url={"category/all"}
                        value={formData.category}
                        setValue={(value) => {
                            setFormData((prev) => ({ ...prev, category: value }));
                        }}
                        mapping={(item: any) => ({ value: item.name, label: item.name })}
                        label='Category'
                    />
                    <Label>Description</Label>
                    <Input type="text" placeholder="Description"
                        value={formData.description}
                        className="w-1/2"
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} />
                </div>
                <div className="flex justify-end mt-4">
                    <Button type="button" onClick={() => closeForm()}>Cancel</Button>
                    <span className="mx-2"></span>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Card>

    );
}


const TransactionTable = () => {
    // Example usage in a parent component

    const invoices = [
        {
            Amount: 100.00,
            date: '2023-10-01',
            description: 'Grocery Shopping',
            type: 'Expense',
            category: 'Groceries'
        },
        {
            Amount: 2500.00,
            date: '2023-10-02',
            description: 'Salary for September',
            type: 'Income',
            category: 'Salary'
        },
        {
            Amount: 50.00,
            date: '2023-10-03',
            description: 'Coffee at Cafe',
            type: 'Expense',
            category: 'Dining'
        },
        {
            Amount: 200.00,
            date: '2023-10-04',
            description: 'Electricity Bill',
            type: 'Expense',
            category: 'Utilities'
        }

    ]

    const columns = [
        { header: 'Amount', accessor: 'Amount', className: 'w-25' },
        { header: 'Date', accessor: 'date' },
        { header: 'Description', accessor: 'description' },
        { header: 'Type', accessor: 'type' },
        { header: 'Category', accessor: 'category', className: 'text-right' }
    ]

    return (
        <Card className="w-5xl m-5 mt-2">
            <CardContent>

                <TableRoundedCorner
                    columns={columns}
                    data={invoices}
                    pagination={
                        <Pagination className='mt-4'>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href='#' />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href='#'>1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href='#' isActive>
                                        2
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href='#'>3</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href='#' />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    }
                />
            </CardContent>
        </Card>
    )
}