import { useState } from "react";
import TransactionHeader from "../components/TransactionHeader";
import TransactionSection from "../components/TransactionSection";
import HistoryBottomNav from "../components/HistoryBottomNav";

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

    const filterTransactions = (transactions) => {
        if (activeTab === "all") return transactions;
        if (activeTab === "expense")
            return transactions.filter((tx) => !tx.isIncome);
        if (activeTab === "income")
            return transactions.filter((tx) => tx.isIncome);
        return transactions;
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display min-h-screen">
            <TransactionHeader activeTab={activeTab} onTabChange={setActiveTab} />
            <main className="pb-24">
                <TransactionSection
                    title="Hari Ini"
                    transactions={filterTransactions(transactionsData.today)}
                />
                <TransactionSection
                    title="Kemarin"
                    transactions={filterTransactions(transactionsData.yesterday)}
                />
                <TransactionSection
                    title="24 Okt 2023"
                    transactions={filterTransactions(transactionsData.oct24)}
                />
            </main>
            <HistoryBottomNav />
        </div>
    );
}
