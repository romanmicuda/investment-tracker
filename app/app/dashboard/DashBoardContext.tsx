'use client'

import { secureApi } from '@/components/utils/routes';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DashboardContextType {
    transactionsStatistics: {
        totalBalance: number;
        income: number;
        expenses: number;
    };
    fetchTransactionsStatistics: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
    children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
    const [transactionsStatistics, setTransactionsStatistics] = useState({
        totalBalance: 0,
        income: 0,
        expenses: 0,
    });

    const fetchTransactionsStatistics = async () => {
        try {
            const response = await secureApi.get('/transaction/statistics');
            if (response.status === 200) {
                setTransactionsStatistics(response.data);
            } else {
                alert('Failed to fetch transactions statistics');
            }
        } catch (error) {
            alert('Error fetching transactions statistics');
        }
    };



    return (
        <DashboardContext.Provider value={{ transactionsStatistics, fetchTransactionsStatistics }}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = () => {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error('useDashboardContext must be used within a DashboardProvider');
    }
    return context;
};