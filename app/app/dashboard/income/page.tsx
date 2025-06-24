'use client'

import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react"
import { Input } from "@/components/ui/input"
import { useForm, SubmitHandler } from "react-hook-form"

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
    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
    };

    return (
        <Card className="w-5xl m-5 mt-10">
            <CardHeader>
                <CardTitle>Add Income</CardTitle>
                <CardDescription>Fill in the details below to add a new income entry.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="p-4">
                <div className="flex flex-col gap-4">
                    <Input
                        type="number"
                        step="any"
                        placeholder="Amount"
                        {...register("amount", { required: true, valueAsNumber: true })}
                    />
                    <Input type="date" placeholder="Date" {...register("date", { required: true })} />
                    <Input type="text" placeholder="Type" {...register("type", { required: true })} />
                    <Input type="text" placeholder="Category" {...register("category", { required: true })} />
                    <Input type="text" placeholder="Description" {...register("description")} />
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
    onChange = () => {},
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

