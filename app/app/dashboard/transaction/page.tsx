'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import React, { useState, useEffect, use } from "react"
import { api } from "@/components/utils/routes"
import ComboboxWithSearchAndButton from "@/components/ComboboxWithSearchAndButton"
import { TypeTransaction } from "@/components/utils/data"
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
import { useTransactionContext } from "./TransactionContext"
import { useRouter } from 'next/navigation'

export default function page() {
    const [showAddTransactionForm, setShowAddTransactionForm] = useState<boolean>(false);
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
    
    const closeAddTransactionForm = () => {
        setShowAddTransactionForm(false);
    }
    const openAddTransactionForm = () => {
        setShowAddTransactionForm(true);
    }
    
    const handleTransactionAdded = () => {
        setRefreshTrigger(prev => prev + 1);
        closeAddTransactionForm();
    }
    
    return (
        <>
            <TransactionControl openForm={openAddTransactionForm} />
            {showAddTransactionForm && <AddTransactionForm closeForm={closeAddTransactionForm} onTransactionAdded={handleTransactionAdded} />}
            <TransactionTable refreshTrigger={refreshTrigger} />
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
    // Local state for the search input
    const [inputValue, setInputValue] = useState<string>("");
    const { setSearchTerm } = useTransactionContext();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchTerm(inputValue);
    };

    return (
        <Card className="w-5xl m-5 mt-10">
            <CardHeader className="flex justify-between">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="w-2xl"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <Button type="submit">
                        Search
                    </Button>
                </form>
                <Button onClick={openForm}>Add Transaction</Button>
            </CardHeader>
        </Card>
    );
};

interface IFormInput {
    amount: number | null; // Allow null for initial state
    date: string;
    type: string;
    category: string;
    description?: string;
}


const AddTransactionForm = ({ closeForm, onTransactionAdded }: { closeForm: () => void, onTransactionAdded: () => void }) => {
    const [formData, setFormData] = useState<IFormInput>({
        amount: null,
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
                onTransactionAdded();
            }
        } catch (error) {
            alert("Failed to add Transaction. Please try again.");
        }
    };

    return (
        <Card className="w-8xl m-5 flex justify-center">
            <CardHeader>
            </CardHeader>
            <form className="p-4" onSubmit={(e) => {
                e.preventDefault();
                onSubmit(formData);
            }}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <Label>Amount</Label>
                        <Input
                            type="number"
                            step="any"
                            placeholder="Amount"
                            value={formData.amount ?? ''}
                            className="w-full"
                            onChange={(e) => setFormData((prev) => ({ ...prev, amount: parseFloat(e.target.value) }))}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Date</Label>
                        <Input type="date" placeholder="Date"
                            value={formData.date}
                            className="w-full"
                            onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <ComboboxWithSearchAndButton
                            options={TypeTransaction}
                            value={formData.type}
                            setValue={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                            label='Transaction Type'
                        />
                    </div>
                    <div className="flex flex-col gap-1">
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
                    </div>
                    <div className="flex flex-col gap-1 col-span-2">
                        <Label>Description</Label>
                        <Input type="text" placeholder="Description"
                            value={formData.description}
                            className="w-full"
                            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} />
                    </div>
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


const TransactionTable = ({ refreshTrigger }: { refreshTrigger?: number }) => {
    const [allTransactions, setAllTransactions] = useState<any[]>([]);
    const [displayedTransactions, setDisplayedTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [itemsPerPage] = useState<number>(2); // Showing more items per page
    const { searchTerm } = useTransactionContext();
    const router = useRouter();

    // Compute filtered transactions based on searchTerm
    const filteredTransactions = React.useMemo(() => {
        if (searchTerm && searchTerm.trim() !== "") {
            const lowerSearch = searchTerm.toLowerCase();
            return allTransactions.filter(transaction =>
                (transaction.description && transaction.description.toLowerCase().includes(lowerSearch)) ||
                (transaction.category && transaction.category.toLowerCase().includes(lowerSearch)) ||
                (transaction.type && transaction.type.toLowerCase().includes(lowerSearch)) ||
                (transaction.amount && transaction.amount.toString().includes(searchTerm)) ||
                (transaction.date && transaction.date.includes(searchTerm))
            );
        }
        return allTransactions;
    }, [searchTerm, allTransactions]);

    // Update totalPages and reset currentPage when filteredTransactions changes
    useEffect(() => {
        setTotalPages(Math.max(1, Math.ceil(filteredTransactions.length / itemsPerPage)));
        setCurrentPage(1);
    }, [filteredTransactions, itemsPerPage]);

    // Update displayedTransactions when currentPage or filteredTransactions changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayedTransactions(filteredTransactions.slice(startIndex, endIndex));
    }, [filteredTransactions, currentPage, itemsPerPage]);

    // Fetch all transactions only once on component mount
    useEffect(() => {
        const fetchAllTransactions = async () => {
            try {
                setLoading(true);
                // Fetch all transactions without pagination parameters
                const response = await api.get(`api/transaction/all`);
                if (response.status === 200) {
                    // Store all transactions
                    const transactions = Array.isArray(response.data) ?
                        response.data : (response.data.items || []);

                    setAllTransactions(transactions);

                    // Calculate total pages based on all transactions
                    setTotalPages(Math.ceil(transactions.length / itemsPerPage));

                    // Set initial displayed transactions
                    updateDisplayedTransactions(transactions, 1);
                }
            } catch (error) {
                alert("Failed to fetch transactions. Please try again later.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllTransactions();
    }, [refreshTrigger]); // Add refreshTrigger as dependency

    // Update displayed transactions when page or filter changes
    useEffect(() => {
        updateDisplayedTransactions(filteredTransactions, currentPage);
    }, [currentPage, filteredTransactions, itemsPerPage]);

    // Function to update displayed transactions based on current page
    const updateDisplayedTransactions = (data: any[], page: number) => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayedTransactions(data.slice(startIndex, endIndex));
    };

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 3;

        if (totalPages <= maxPagesToShow) {
            // Show all pages if there are only a few
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Show first page, current page, and last page with ellipsis
            if (currentPage === 1) {
                pageNumbers.push(1, 2, 3);
            } else if (currentPage === totalPages) {
                pageNumbers.push(totalPages - 2, totalPages - 1, totalPages);
            } else {
                pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
            }
        }

        return pageNumbers;
    };

    const handleEditRow = (id: string) => {
        router.push('/dashboard/transaction/' + id);
    };

    const handleDeleteRow = async (id: string) => {
        try {
            const response = await api.delete(`api/transaction/${id}`);
            if (response.status === 200) {
                alert("Transaction deleted successfully!");
                const updatedTransactions = allTransactions.filter(transaction => transaction.id !== id);
                setAllTransactions(updatedTransactions);
                setTotalPages(Math.ceil(updatedTransactions.length / itemsPerPage));
                updateDisplayedTransactions(updatedTransactions, currentPage);
            }
        } catch (error) {
            alert("Failed to delete transaction. Please try again.");
        }
    };

    const columns = [
        { header: 'Amount', accessor: 'amount', className: 'w-25' },
        { header: 'Date', accessor: 'date' },
        { header: 'Type', accessor: 'type' },
        { header: 'Category', accessor: 'category' },
        { header: 'Description', accessor: 'description' },
    ];

    return (
        <Card className="w-5xl m-5 mt-2">
            <CardContent>
                {loading ? (
                    <div className="flex justify-center p-4">Loading transactions...</div>
                ) : (
                    <>
                        <TableRoundedCorner
                            columns={columns}
                            data={displayedTransactions}
                            onDelete={handleDeleteRow}
                            onEdit={handleEditRow}
                            pagination={
                                <Pagination className='mt-4'>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                            />
                                        </PaginationItem>

                                        {getPageNumbers().map(page => (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    onClick={() => handlePageChange(page)}
                                                    isActive={page === currentPage}
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}

                                        {totalPages > 3 && currentPage < totalPages - 1 && (
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        )}

                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            }
                            caption={allTransactions.length > 0 ?
                                `Showing ${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, allTransactions.length)} of ${allTransactions.length} transactions` :
                                "No transactions found"}
                        />
                    </>
                )}
            </CardContent>
        </Card>
    );
};