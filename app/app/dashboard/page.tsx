'use client';

import React, { useEffect } from "react";
import { useDashboardContext } from "./DashBoardContext";
import { BarChart } from '@mui/x-charts/BarChart';


const DashboardPage = () => {
    const { fetchTransactionsStatistics, transactionsStatistics,
        fetchInvestmentsStatistics, investmentsStatistics
     } = useDashboardContext();

    useEffect(() => {
        fetchTransactionsStatistics();
        fetchInvestmentsStatistics();
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

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow rounded p-4">
                    <h2 className="text-xl font-semibold mb-2">Total Invested Value</h2>
                    <p className="text-2xl text-purple-600">{investmentsStatistics.totalInvestedValue} $</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h2 className="text-xl font-semibold mb-2">Number of Investments</h2>
                    <p className="text-2xl text-indigo-600">{investmentsStatistics.totalNumberOfInvestments}</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h2 className="text-xl font-semibold mb-2">Earliest Investment Date</h2>
                    <p className="text-2xl text-gray-700">{investmentsStatistics.earliestInvestmentDate}</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h2 className="text-xl font-semibold mb-2">Latest Investment Date</h2>
                    <p className="text-2xl text-gray-700">{investmentsStatistics.latestInvestmentDate}</p>
                </div>
            </section>

            <section className="mt-8 bg-white shadow rounded p-4">
                <h2 className="text-xl font-semibold mb-2">Investment Value By Asset</h2>
                {investmentsStatistics.investmentValueByAsset && (
                    <BarChart
                        xAxis={[
                            {
                                id: 'assets',
                                data: Object.keys(investmentsStatistics.investmentValueByAsset),
                            },
                        ]}
                        series={[
                            {
                                data: Object.values(investmentsStatistics.investmentValueByAsset) as number[],
                            },
                        ]}
                        height={300}
                    />
                )}
            </section>
        </main>
    );
};

export default DashboardPage;