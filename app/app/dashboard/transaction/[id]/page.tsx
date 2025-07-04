'use client'

import ComboboxWithSearchAndButton from "@/components/ComboboxWithSearchAndButton";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TypeTransaction } from "@/components/utils/data";
import { api } from "@/components/utils/routes";
import { useEffect, useState } from "react";
import { useTransactionContext } from "../TransactionContext";
import { useParams } from 'next/navigation'

const page = () => {
    const {transaction, getTransaction, editTransaction} = useTransactionContext();
    const params = useParams()

    useEffect(() => {
        if (params.id) {
            getTransaction(params.id as string);
        }
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Transaction</CardTitle>
                <CardDescription>Update the details of your transaction below.</CardDescription>
            </CardHeader>
            <EditTransactionForm/>
        </Card>
    );
}
export default page;

interface IFormInput {
    amount: number | null;
    date: string;
    type: string;
    category: string;
    description?: string;
}

const EditTransactionForm = () => {
    const {transaction, editTransaction} = useTransactionContext();
    const [formData, setFormData] = useState<IFormInput>({
        amount: null,
        date: '',
        type: '',
        category: '',
        description: ''
    });

    useEffect(() => {
        if (transaction) {
            const newFormData = {
                amount: transaction.amount,
                date: transaction.date,
                type: transaction.type,
                category: transaction.category?.name || '',
                description: transaction.description || ''
            };
            setFormData(newFormData);
        }
    }, [transaction]);

    return (
        <Card className="w-8xl m-5 flex justify-center">
            <CardHeader>
            </CardHeader>
            <form className="p-4" onSubmit={(e) => {
                e.preventDefault();
                editTransaction(transaction.id, { ...formData, category: formData.category })
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
                    <span className="mx-2"></span>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Card>

    );
}