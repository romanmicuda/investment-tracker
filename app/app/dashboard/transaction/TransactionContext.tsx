'use client';

import { api } from '@/components/utils/routes';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TransactionContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  transaction: TypeTransaction;
  getTransaction: (id: string) => void;
  editTransaction: (id: string, data: TypeTransaction) => void;
  transactionId?: string | null;
  setTransactionId?: (id: string | null) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  return context;
};

export interface TypeTransaction {
    amount: number | null; // Allow null for initial state
    date: string;
    type: string;
    category: string;
    description?: string;
}

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [transaction, setTransaction] = useState<TypeTransaction>({
    amount: null,
    date: '',
    type: '',
    category: '',
    description: ''
  });
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const getTransaction = async (id: string) => {
    try {
      const response = await api.get(`/api/transaction/${id}`);
      if (response.status === 200) {
        setTransaction(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch transaction:', error);
    }
  };

  const editTransaction = async (id: string, data: TypeTransaction) => {
    try {
      const response = await api.put(`/api/transaction/${id}`, data);
      if (response.status === 200) {
        alert('Transaction updated successfully!');
        setTransaction(response.data);
      }
    } catch (error) {
      alert('Failed to update transaction. Please try again.');
    }
  };

  return (
    <TransactionContext.Provider value={{ searchTerm, setSearchTerm, transaction, 
    getTransaction, editTransaction, transactionId, setTransactionId }}>
      {children}
    </TransactionContext.Provider>
  );
};
