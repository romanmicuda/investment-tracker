import React from "react";

const expenses = [
    { id: 1, category: "Groceries", amount: 50.25, date: "2024-06-01" },
    { id: 2, category: "Transport", amount: 15.0, date: "2024-06-02" },
    { id: 3, category: "Utilities", amount: 80.75, date: "2024-06-03" },
];

export default function ExpensePage() {
    return (
        <main className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Expenses</h1>
            <table className="min-w-full bg-white border rounded">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Date</th>
                        <th className="py-2 px-4 border-b">Category</th>
                        <th className="py-2 px-4 border-b">Amount ($)</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id}>
                            <td className="py-2 px-4 border-b">{expense.date}</td>
                            <td className="py-2 px-4 border-b">{expense.category}</td>
                            <td className="py-2 px-4 border-b text-right">
                                {expense.amount.toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}