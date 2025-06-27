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


export default function page() {
    const [showAddIncomeForm, setShowAddIncomeForm] = React.useState(false);
    const closeAddIncomeForm = () => {
        setShowAddIncomeForm(false);
    }
    const openAddIncomeForm = () => {
        setShowAddIncomeForm(true);
    }
    return (
        <>
            <IncomeControl openForm={openAddIncomeForm} />
            {showAddIncomeForm && <AddIncomeForm closeForm={closeAddIncomeForm} />}
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

const IncomeControl = ({ openForm }: { openForm: () => void }) => {
    return (
        <Card className="w-5xl m-5 mt-10">
            <CardHeader className="flex justify-between">
                <SearchInput />
                <Button onClick={openForm}>Add Income</Button>
            </CardHeader>
        </Card>
    );
};

interface IFormInput {
    amount: number;
    date: string;
    type: string;
    category: string;
    description?: string;
}


const AddIncomeForm = ({ closeForm }: { closeForm: () => void }) => {
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

                alert("Income added successfully!");
                closeForm();
            }
        } catch (error) {
            alert("Failed to add income. Please try again.");
        }
    };  

    return (
        <Card className="w-5xl m-5 mt-10">
            <CardHeader>
                <CardTitle>Add Income</CardTitle>
                <CardDescription>Fill in the details below to add a new income entry.</CardDescription>
            </CardHeader>
            <form className="p-4" onSubmit={(e) => {
                e.preventDefault();
                onSubmit(formData);
            }}>
                <div className="flex flex-col gap-4">
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

const RemoteHookInput = ({
    placeholder = "Remote Hook Input",
    apiUrl = "",
    onChange = () => { },
    value = "",
    className = "",
    ...props
}: {
    placeholder?: string,
    apiUrl?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value?: string,
    className?: string,
}) => {

    return (
        <Input type="text" placeholder={placeholder} onChange={onChange} value={value} className={className} {...props} />
    );
}
