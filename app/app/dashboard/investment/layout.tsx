import React, { ReactNode } from 'react';
import { InvestmentProvider } from './InvestmentContext';

interface InvestmentLayoutProps {
    children: ReactNode;
}

const InvestmentLayout = ({ children }: InvestmentLayoutProps) => {
    return (
        <InvestmentProvider>
          {children}
        </InvestmentProvider>
    );
};

export default InvestmentLayout;