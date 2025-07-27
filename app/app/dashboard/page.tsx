'use client';

import React, { useEffect } from "react";
import { useDashboardContext } from "./DashBoardContext";

const DashboardPage = () => {
    const { fetchTransactionsStatistics, transactionsStatistics } = useDashboardContext();

    useEffect(() => {
        fetchTransactionsStatistics();
    }, []);

    return (
        <main className="p-8">
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white shadow rounded p-4">
                    <h2 className="text-xl font-semibold mb-2">Total Balance</h2>
                    <p className="text-2xl text-green-600">{transactionsStatistics.totalBalance} $</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h2 className="text-xl font-semibold mb-2">Income</h2>
                    <p className="text-2xl text-blue-600">{transactionsStatistics.income} $</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h2 className="text-xl font-semibold mb-2">Expenses</h2>
                    <p className="text-2xl text-red-600">{transactionsStatistics.expenses} $</p>
                </div>
            </section>
        </main>
    );
};

export default DashboardPage;