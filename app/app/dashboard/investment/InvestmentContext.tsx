'use client'

import { api, secureApi } from '@/components/utils/routes';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode, use, useEffect } from 'react';

type Investment = {
    id?: string // Add optional id field
    assetName: string
    quantity: number
    buyPrice: number
    currentPrice?: number // Optional to match Double in Java
    buyDate: string // ISO date string
    notes?: string
}

interface InvestmentContextType {
    investments: Investment[];
    addInvestment: (investment: Investment) => void;
    removeInvestment: (id: string) => void;
    updateInvestment: (investment: Investment) => void;
    getInvestements: () => void;
    showAddInvestmentForm: boolean;
    setShowAddInvestmentForm: (show: boolean) => void;
    tableSetup: TableSetupType;
    setTableSetup: (setup: TableSetupType) => void;
    selectedInvestment: Investment | undefined;
    fetchSelectedInvestment: (id: string) => void;
    deleteInvestment: (id: string) => void;
    editInvestment: (id: string, investment: Investment) => void;
    filterInvestments: (query: string) => void;
    filteredInvestments: Investment[];
}

const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined);

export const useInvestmentContext = () => {
    const context = useContext(InvestmentContext);
    if (!context) {
        throw new Error('useInvestmentContext must be used within an InvestmentProvider');
    }
    return context;
};

export type TableSetupType = {
    pageNumber: number;
    pageSize: number;
}

export const InvestmentProvider = ({ children }: { children: ReactNode }) => {
    const [investments, setInvestments] = useState<Investment[]>([]);
    const [filteredInvestments, setFilteredInvestments] = useState<Investment[]>([]);
    const [showAddInvestmentForm, setShowAddInvestmentForm] = useState(false);
    const [tableSetup, setTableSetup] = useState<TableSetupType>({pageNumber: 0, pageSize: 5})
    const [selectedInvestment, setSelectedInvestment] = useState<Investment | undefined>(undefined);
    const router = useRouter();

    useEffect(() => {
        if (investments.length > 0) {
        setFilteredInvestments(investments);
        }
    }, [investments]);

    const addInvestment = async (investment: Investment) => {
        try {
            const response = await api.post('api/investments', investment);
            if (response.status === 201 || response.status === 200) {
                alert('Investment added successfully');
            } else {
                alert('Failed to add investment');
            }
        } catch (error) {
            alert('An error occurred while adding the investment.');
        }
    };

    const removeInvestment = (id: string) => {
        setInvestments(prev => prev.filter(inv => inv.id !== id));
    };

    const updateInvestment = (updated: Investment) => {
        setInvestments(prev =>
            prev.map(inv => (inv.id === updated.id ? updated : inv))
        );
    };

    const getInvestements = async () => {
        try {
            const response = await api.post('api/investments/all', tableSetup);
            if (response.status === 200) {
                console.log('Fetched investments:', response.data);
                setInvestments(response.data as (Investment[]));
                console.log('Investments state updated:', investments);
            } else {
                alert('Failed to fetch investments');
            }
        }
        catch (error) {
            console.error('Error fetching investments:', error);
            alert('An error occurred while fetching investments.');
        }
    };

    const fetchSelectedInvestment = async (id: string) => {
        try {
            const response = await api.get(`api/investments/${id}`);
            if (response.status === 200) {
                setSelectedInvestment(response.data as Investment);
            } else {
                alert('Failed to fetch investment details');
            }
        } catch (error) {
            console.error('Error fetching selected investment:', error);
            alert('An error occurred while fetching investment details.');
        }
    };

    const deleteInvestment = async (id: string) => {
        try {
            const response = await api.delete(`api/investments/${id}`);
            if (response.status === 200) {
                setInvestments(prev => prev.filter(inv => inv.id !== id));
                alert('Investment deleted successfully');
                router.push('/dashboard/investment');
            } else {
                alert('Failed to delete investment');
            }
        } catch (error) {
            alert('An error occurred while deleting the investment.');
        }
    };

    const editInvestment = async (id: string, investment: Investment) => {
        try {
            const response = await api.put(`api/investments/${id}`, investment);
            if (response.status === 200) {
                setInvestments(prev => prev.map(inv => (inv.id === id ? investment : inv)));
                alert('Investment updated successfully');
            } else {
                alert('Failed to update investment');
            }
        } catch (error) {
            console.error('Error updating investment:', error);
            alert('An error occurred while updating the investment.');
        }
    };

    const filterInvestments = (query: string) => {
        if (!query) {
            setFilteredInvestments(investments);
            return;
        }
        const lowerQuery = query.toLowerCase();
        const filtered = investments.filter(inv =>
            inv.assetName.toLowerCase().includes(lowerQuery) ||
            inv.notes?.toLowerCase().includes(lowerQuery) ||
            inv.buyDate.toLowerCase().includes(lowerQuery) ||
            inv.quantity.toString().includes(lowerQuery) ||
            inv.buyPrice.toString().includes(lowerQuery) ||
            (inv.currentPrice ? inv.currentPrice.toString().includes(lowerQuery) : false)
        );
        setFilteredInvestments(filtered);
    };

    return (
        <InvestmentContext.Provider
            value={{ investments, addInvestment, removeInvestment, tableSetup, setTableSetup,
                 updateInvestment, getInvestements, showAddInvestmentForm, setShowAddInvestmentForm,
                 selectedInvestment, fetchSelectedInvestment, deleteInvestment, editInvestment,
                 filteredInvestments, filterInvestments }}
        >
            {children}
        </InvestmentContext.Provider>
    );
};