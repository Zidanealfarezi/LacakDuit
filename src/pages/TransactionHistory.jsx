import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useData } from "../context/DataContext";
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
    const { transactions } = useData();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search") || "";

    const filterTransactions = (transactions) => {
        let filtered = transactions;

        // Filter by Tab
        if (activeTab === "expense") {
            filtered = filtered.filter((tx) => tx.type === "expense");
        } else if (activeTab === "income") {
            filtered = filtered.filter((tx) => tx.type === "income");
        } else if (activeTab === "transfer") { // Assuming we might want a transfer tab later, or just show them in 'all'
            filtered = filtered.filter((tx) => tx.type === "transfer");
        }

        // Filter by Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (tx) =>
                    (tx.note && tx.note.toLowerCase().includes(query)) ||
                    (tx.category && tx.category.toLowerCase().includes(query))
            );
        }

        return filtered;
    };

    // Group transactions by date
    const groupedTransactions = useMemo(() => {
        const filtered = filterTransactions(transactions);
        const groups = {};

        filtered.forEach(tx => {
            if (!groups[tx.date]) {
                groups[tx.date] = [];
            }
            groups[tx.date].push(tx);
        });

        // Sort dates descending
        return Object.keys(groups)
            .sort((a, b) => new Date(b) - new Date(a))
            .map(date => ({
                date,
                title: new Date(date).toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
                data: groups[date]
            }));
    }, [transactions, activeTab, searchQuery]);

    return (
        <PageTransition>
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display min-h-screen">
                <TransactionHeader activeTab={activeTab} onTabChange={setActiveTab} />
                <main className="pb-24">
                    {groupedTransactions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center pt-20 text-slate-400 animate-fade-in">
                            <span className="material-symbols-outlined text-6xl mb-4 text-slate-300 dark:text-slate-600">search_off</span>
                            <p className="font-medium">Tidak ada transaksi ditemukan</p>
                            {searchQuery && <p className="text-sm mt-1">Pencarian: "{searchQuery}"</p>}
                        </div>
                    ) : (
                        groupedTransactions.map((group) => (
                            <TransactionSection
                                key={group.date}
                                title={group.title}
                                transactions={group.data.map(tx => ({
                                    icon: tx.icon,
                                    title: tx.note || tx.category,
                                    time: "00:00", // We assume date only for now, can add time if tracked
                                    category: tx.category,
                                    amount: tx.amount,
                                    type: tx.type
                                }))}
                            />
                        ))
                    )}
                </main>
                <HistoryBottomNav />
            </div>
        </PageTransition>
    );
}
