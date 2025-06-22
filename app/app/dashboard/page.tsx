'use client';

import React from "react";

const DashboardPage = () => {
    const handleLogout = () => {
        // Add your logout logic here
        console.log("Logged out");
    };

    return (
        <main className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                >
                    Log Out
                </button>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white shadow rounded p-4">
                    <h2 className="text-xl font-semibold mb-2">Total Balance</h2>
                    <p className="text-2xl text-green-600">$0.00</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h2 className="text-xl font-semibold mb-2">Income</h2>
                    <p className="text-2xl text-blue-600">$0.00</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h2 className="text-xl font-semibold mb-2">Expenses</h2>
                    <p className="text-2xl text-red-600">$0.00</p>
                </div>
            </section>
            <section className="bg-white shadow rounded p-4">
                <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
                <ul>
                    <li className="py-2 border-b">No transactions yet.</li>
                </ul>
            </section>
        </main>
    );
};

export default DashboardPage;