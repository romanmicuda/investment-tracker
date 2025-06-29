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
    const [showAddCategoryForm, setShowAddCategoryForm] = React.useState(false);
    const closeAddCategoryForm = () => {
        setShowAddCategoryForm(false);
    }
    const openAddCategoryForm = () => {
        setShowAddCategoryForm(true);
    }
    return (
        <>
            <CategoryControl openForm={openAddCategoryForm} />
            {showAddCategoryForm && <AddCategoryForm closeForm={closeAddCategoryForm} />}
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

const CategoryControl = ({ openForm }: { openForm: () => void }) => {
    return (
        <Card className="w-5xl m-5 mt-10">
            <CardHeader className="flex justify-between">
                <SearchInput />
                <Button onClick={openForm}>Add Category</Button>
            </CardHeader>
        </Card>
    );
};

interface IFormInput {
    category?: string;
}


const AddCategoryForm = ({ closeForm }: { closeForm: () => void }) => {
    const [formData, setFormData] = useState<IFormInput>({
        category: ''
    });

    const onSubmit = async (data: IFormInput): Promise<void> => {
        try {
            const response = await api.post("/api/category", data);
            if (response.status === 200) {
                closeForm();
            }
        } catch (error) {
            alert("Failed to add Category. Please try again.");
        }
    };

    return (
        <Card className="w-5xl mx-5 mt-5">
            <CardHeader>
                <CardTitle>Add Category</CardTitle>
                <CardDescription>Fill in the details below to add a new Category entry.</CardDescription>
            </CardHeader>
            <form className="p-4" onSubmit={(e) => {
                e.preventDefault();
                onSubmit(formData);
            }}>
                <div className="flex flex-col gap-4">
                    <Label>Name</Label>
                    <Input type="text" placeholder="Name"
                        value={formData.category}
                        className="w-1/2"
                        onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))} />
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
