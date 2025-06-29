'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TransactionContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <TransactionContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </TransactionContext.Provider>
  );
};
