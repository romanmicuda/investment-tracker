'use client'

import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import React, { useEffect, useState } from "react"
import { api } from "@/components/utils/routes"
import ComboboxWithSearchAndButton from "@/components/ComboboxWithSearchAndButton"
import { TypeTransaction } from "@/components/utils/data"
import Combobox from "@/components/Combobox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function page() {
    const [showAddCategoryForm, setShowAddCategoryForm] = React.useState(false);
    const [categories, setCategories] = React.useState<CategoryType[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await api.get("/api/category/all");
            if (response.status === 200) {
                setCategories(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchCategories();
    }, []);

    const closeAddCategoryForm = () => {
        setShowAddCategoryForm(false);
    }
    const openAddCategoryForm = () => {
        setShowAddCategoryForm(true);
    }
    return (
        <>
            <CategoryControl openForm={openAddCategoryForm} />
            {showAddCategoryForm && <AddCategoryForm closeForm={closeAddCategoryForm} fetchCategories={fetchCategories} />}
            <CategoryList 
                categories={categories}
                loading={loading}
                fetchCategories={fetchCategories}
                setCategories={setCategories}
            />
        </>
    )
}

interface CategoryType {
    id: string;
    name: string;
}


const CategoryList = ({ categories, loading, fetchCategories, setCategories }: {
    categories: CategoryType[];
    loading: boolean;
    fetchCategories: () => Promise<void>;
    setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}) => {
    const [renamingId, setRenamingId] = useState<string | null>(null);
    const [renameValue, setRenameValue] = useState<string>("");

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;
        try {
            const response = await api.delete(`/api/category/${id}`);
            console.log("Delete response:", response);
            if (response.status === 200) {
                await fetchCategories();
            }
        } catch (error) {

            alert("Failed to delete category.");
        }
    };

    const handleRename = (id: string, currentName: string) => {
        setRenamingId(id);
        setRenameValue(currentName);
    };

    const submitRename = async () => {
        if (!renamingId) return;
        try {
            const response = await api.put(`/api/category/${renamingId}`, { name: renameValue });
            if (response.status === 200) {
                setRenamingId(null);
                setRenameValue("");
                await fetchCategories();
            }
        } catch (error) {
            alert("Failed to rename category.");
        }
    };

    return (
        <Card className="w-5xl m-5 mt-10">
            <CardHeader>
                <CardTitle>Category List</CardTitle>
                <CardDescription>List of all categories</CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="grid grid-cols-4 gap-4">
                        {categories.length > 0 ? (
                            categories.map((category, index) => (
                                <Card key={category.id} className="p-4">
                                    {renamingId === category.id ? (
                                        <div>
                                            <Input
                                                value={renameValue}
                                                onChange={e => setRenameValue(e.target.value)}
                                                className="mb-2"
                                            />
                                            <div className="flex gap-2">
                                                <Button size="sm" onClick={submitRename}>Save</Button>
                                                <Button size="sm" variant="outline" onClick={() => setRenamingId(null)}>Cancel</Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <CardTitle>{category.name}</CardTitle>
                                            <CardAction>
                                                <Button variant="outline" onClick={() => handleRename(category.id, category.name)}>Rename</Button>
                                                <Button variant="destructive" className="ml-2" onClick={() => handleDelete(category.id)}>Delete</Button>
                                            </CardAction>
                                        </>
                                    )}
                                </Card>
                            ))
                        ) : (
                            <div>No categories found.</div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
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


const AddCategoryForm = ({ closeForm, fetchCategories }: { closeForm: () => void, fetchCategories: () => Promise<void> }) => {
    const [formData, setFormData] = useState<IFormInput>({
        category: ''
    });

    const onSubmit = async (data: IFormInput): Promise<void> => {
        try {
            const response = await api.post("/api/category", data);
            if (response.status === 200) {
                await fetchCategories();
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
