'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useInvestmentContext } from '../InvestmentContext';
import { Card, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Investment = {
    assetName: string;
    quantity: number;
    buyPrice: number;
    buyDate: string;
    notes?: string;
};

const Page = () => {
    const params = useParams<{ id: string }>();
    const { fetchSelectedInvestment, selectedInvestment, deleteInvestment, editInvestment } = useInvestmentContext();

    useEffect(() => {
        if (params.id) {
            fetchSelectedInvestment(params.id);
        }
    }, []);

    return (
        <>
            <EditInvestementForm initialValues={selectedInvestment} deleteInvestment={deleteInvestment} editInvestment={editInvestment} id={params.id} />

        </>
    );
};

export default Page;

type EditInvestmentFormProps = {
    initialValues?: Investment;
    deleteInvestment?: (id: string) => void;
    editInvestment?: (id: string, investment: Investment) => void;
    id?: string;
};

const EditInvestementForm = ({ initialValues, deleteInvestment, editInvestment, id }: EditInvestmentFormProps) => {
    const router = useRouter();
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
                        if (editInvestment && id) {
                            editInvestment(id, newInvestment);
                        } else {
                            alert('Edit Investment function is not available');
                        }

                    }
                    }
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="assetName">Asset Name</label>
                            <Input
                                id="assetName"
                                type="text"
                                placeholder="Asset Name"
                                className="w-full"
                                name="assetName"
                                defaultValue={initialValues?.assetName || ''}
                            />
                        </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="quantity">Quantity</label>
                            <Input
                                id="quantity"
                                type="number"
                                placeholder="Quantity"
                                className="w-full"
                                name="quantity"
                                step="any"
                                min="0"
                                defaultValue={initialValues?.quantity || ''}
                            />
                        </div>
                           <div className="flex flex-col gap-2">
                            <label htmlFor="buyPrice">Buy Price</label>
                            <Input
                                id="buyPrice"
                                type="number"
                                placeholder="Buy Price"
                                className="w-full"
                                name="buyPrice"
                                step="any"
                                min="0"
                                defaultValue={initialValues?.buyPrice || ''}
                            />
                        </div>
                       <div className="flex flex-col gap-2">
                            <label htmlFor="buyDate">Buy Date</label>
                            <Input
                                id="buyDate"
                                type="date"
                                placeholder="Buy Date"
                                className="w-full"
                                name="buyDate"
                                defaultValue={initialValues?.buyDate || ''}
                            />
                        </div>
                         <div className="flex flex-col gap-2">
                            <label htmlFor="notes">Notes</label>
                            <Input
                                id="notes"
                                type="text"
                                placeholder="Notes"
                                className="w-full"
                                name="notes"
                                defaultValue={initialValues?.notes || ''}
                            />
                        </div>
                        <div className="flex gap-2 mt-2">
                            <Button type="submit">Edit Investment</Button>
                            <Button type="button" variant="destructive" onClick={() => {
                                if (deleteInvestment && id) {
                                    deleteInvestment(id)

                                }
                            }}>Delete Investment</Button>
                            <Button variant="outline" type='button' onClick={() => {
                                router.push('/dashboard/investment');
                            }}>
                                Cancel
                            </Button>

                        </div>

                    </div>
                </form>
            </CardHeader>
        </Card>
    )
}