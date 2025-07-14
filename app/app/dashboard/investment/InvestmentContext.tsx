'use client'

import { api, secureApi } from '@/components/utils/routes';
import React, { createContext, useContext, useState, ReactNode } from 'react';

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
    const [showAddInvestmentForm, setShowAddInvestmentForm] = useState(false);
    const [tableSetup, setTableSetup] = useState<TableSetupType>({pageNumber: 0, pageSize: 5})

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


    return (
        <InvestmentContext.Provider
            value={{ investments, addInvestment, removeInvestment, tableSetup, setTableSetup,
                 updateInvestment, getInvestements, showAddInvestmentForm, setShowAddInvestmentForm }}
        >
            {children}
        </InvestmentContext.Provider>
    );
};