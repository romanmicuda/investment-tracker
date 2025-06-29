import React from 'react';
import { TransactionProvider } from './TransactionContext';

export default function TransactionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
            <TransactionProvider> 
            <div>{children}</div>
            </TransactionProvider>
        </section>
    );
}