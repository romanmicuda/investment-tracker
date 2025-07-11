import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Investment {
    id: string;
    name: string;
    amount: number;
    date: string;
    type: string;
}

interface InvestmentContextType {
    investments: Investment[];
    addInvestment: (investment: Investment) => void;
    removeInvestment: (id: string) => void;
    updateInvestment: (investment: Investment) => void;
    showAddInvestmentForm: boolean;
    setShowAddInvestmentForm: (show: boolean) => void;
}

const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined);

export const useInvestmentContext = () => {
    const context = useContext(InvestmentContext);
    if (!context) {
        throw new Error('useInvestmentContext must be used within an InvestmentProvider');
    }
    return context;
};

export const InvestmentProvider = ({ children }: { children: ReactNode }) => {
    const [investments, setInvestments] = useState<Investment[]>([]);
    const [showAddInvestmentForm, setShowAddInvestmentForm] = useState(false);

    const addInvestment = (investment: Investment) => {
        setInvestments(prev => [...prev, investment]);
    };

    const removeInvestment = (id: string) => {
        setInvestments(prev => prev.filter(inv => inv.id !== id));
    };

    const updateInvestment = (updated: Investment) => {
        setInvestments(prev =>
            prev.map(inv => (inv.id === updated.id ? updated : inv))
        );
    };

    return (
        <InvestmentContext.Provider
            value={{ investments, addInvestment, removeInvestment, updateInvestment, showAddInvestmentForm, setShowAddInvestmentForm }}
        >
            {children}
        </InvestmentContext.Provider>
    );
};