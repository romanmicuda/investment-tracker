import React from "react";

const incomeData = [
    { id: 1, source: "Salary", amount: 3500, date: "2024-06-01" },
    { id: 2, source: "Freelance", amount: 800, date: "2024-06-10" },
    { id: 3, source: "Investments", amount: 200, date: "2024-06-15" },
];

export default function IncomePage() {
    const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);

    return (
        <main className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Income</h1>
            <div className="mb-6">
                <span className="text-lg font-semibold">Total Income: </span>
                <span className="text-lg">${totalIncome.toLocaleString()}</span>
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border-b p-2 text-left">Source</th>
                        <th className="border-b p-2 text-right">Amount</th>
                        <th className="border-b p-2 text-left">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {incomeData.map((income) => (
                        <tr key={income.id}>
                            <td className="p-2">{income.source}</td>
                            <td className="p-2 text-right">${income.amount.toLocaleString()}</td>
                            <td className="p-2">{income.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}