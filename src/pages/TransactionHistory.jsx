import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import TransactionHeader from "../components/TransactionHeader";
import TransactionSection from "../components/TransactionSection";
import HistoryBottomNav from "../components/HistoryBottomNav";
import PageTransition from "../components/PageTransition";

const transactionsData = {
    today: [
        {
            icon: "restaurant",
            title: "Makan Siang",
            time: "12:30",
            category: "Makanan & Minuman",
            amount: "Rp 50.000",
            isIncome: false,
        },
        {
            icon: "directions_car",
            title: "Gojek / Grab",
            time: "10:15",
            category: "Transportasi",
            amount: "Rp 25.000",
            isIncome: false,
        },
    ],
    yesterday: [
        {
            icon: "payments",
            title: "Gaji",
            time: "09:00",
            category: "Pemasukan",
            amount: "Rp 8.000.000",
            isIncome: true,
        },
        {
            icon: "home_pin",
            title: "Bayar Kos",
            time: "18:45",
            category: "Tempat Tinggal",
            amount: "Rp 2.000.000",
            isIncome: false,
        },
    ],
    oct24: [
        {
            icon: "bolt",
            title: "Token Listrik",
            time: "11:20",
            category: "Utilitas",
            amount: "Rp 200.000",
            isIncome: false,
        },
        {
            icon: "fitness_center",
            title: "Membership Gym",
            time: "08:00",
            category: "Kesehatan",
            amount: "Rp 350.000",
            isIncome: false,
        },
    ],
};

export default function TransactionHistory() {
    const [activeTab, setActiveTab] = useState("all");
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search") || "";

    const filterTransactions = (transactions) => {
        let filtered = transactions;

        // Filter by Tab
        if (activeTab === "expense") {
            filtered = filtered.filter((tx) => !tx.isIncome);
        } else if (activeTab === "income") {
            filtered = filtered.filter((tx) => tx.isIncome);
        }

        // Filter by Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (tx) =>
                    tx.title.toLowerCase().includes(query) ||
                    tx.category.toLowerCase().includes(query)
            );
        }

        return filtered;
    };

    return (
        <PageTransition>
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display min-h-screen">
                <TransactionHeader activeTab={activeTab} onTabChange={setActiveTab} />
                <main className="pb-24">
                    {filterTransactions(transactionsData.today).length === 0 &&
                        filterTransactions(transactionsData.yesterday).length === 0 &&
                        filterTransactions(transactionsData.oct24).length === 0 ? (
                        <div className="flex flex-col items-center justify-center pt-20 text-slate-400 animate-fade-in">
                            <span className="material-symbols-outlined text-6xl mb-4 text-slate-300 dark:text-slate-600">search_off</span>
                            <p className="font-medium">Tidak ada transaksi ditemukan</p>
                            {searchQuery && <p className="text-sm mt-1">Pencarian: "{searchQuery}"</p>}
                        </div>
                    ) : (
                        <>
                            {filterTransactions(transactionsData.today).length > 0 && (
                                <TransactionSection
                                    title="Hari Ini"
                                    transactions={filterTransactions(transactionsData.today)}
                                />
                            )}
                            {filterTransactions(transactionsData.yesterday).length > 0 && (
                                <TransactionSection
                                    title="Kemarin"
                                    transactions={filterTransactions(transactionsData.yesterday)}
                                />
                            )}
                            {filterTransactions(transactionsData.oct24).length > 0 && (
                                <TransactionSection
                                    title="24 Okt 2023"
                                    transactions={filterTransactions(transactionsData.oct24)}
                                />
                            )}
                        </>
                    )}
                </main>
                <HistoryBottomNav />
            </div>
        </PageTransition>
    );
}
