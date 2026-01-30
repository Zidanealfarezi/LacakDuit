import { createContext, useContext, useState, useEffect } from "react";

// Initial transactions data
const initialTransactions = [
    { id: 1, type: "expense", category: "Makanan", icon: "restaurant", amount: 75000, date: "2026-01-30", note: "Makan siang", assetId: 1, assetType: "cash" },
    { id: 2, type: "expense", category: "Transport", icon: "directions_car", amount: 150000, date: "2026-01-30", note: "Bensin", assetId: 1, assetType: "cash" },
    { id: 3, type: "income", category: "Gaji", icon: "payments", amount: 5000000, date: "2026-01-28", note: "Gaji bulanan", assetId: 1, assetType: "bank" },
    { id: 4, type: "expense", category: "Belanja", icon: "shopping_bag", amount: 350000, date: "2026-01-28", note: "Groceries", assetId: 1, assetType: "ewallet" },
    { id: 5, type: "income", category: "Bonus", icon: "trending_up", amount: 1500000, date: "2026-01-27", note: "Bonus project", assetId: 1, assetType: "bank" },
    { id: 6, type: "expense", category: "Utilitas", icon: "bolt", amount: 450000, date: "2026-01-27", note: "Listrik", assetId: 1, assetType: "bank" },
    { id: 7, type: "income", category: "Investasi", icon: "account_balance", amount: 800000, date: "2026-01-25", note: "Dividen", assetId: 2, assetType: "bank" },
    { id: 8, type: "expense", category: "Internet", icon: "wifi", amount: 399000, date: "2026-01-25", note: "Internet bulanan", assetId: 1, assetType: "bank" },
];

// Initial assets data
const initialCashAssets = [
    { id: 1, name: "Dompet Utama", icon: "wallet", amount: 850000, color: "bg-emerald-500" },
    { id: 2, name: "Tabungan Rumah", icon: "savings", amount: 500000, color: "bg-amber-500" },
];

const initialBankAccounts = [
    { id: 1, name: "BCA", icon: "account_balance", accountNumber: "**** 8842", amount: 3250000, color: "bg-blue-600" },
    { id: 2, name: "BNI", icon: "account_balance", accountNumber: "**** 5521", amount: 1500000, color: "bg-orange-500" },
    { id: 3, name: "Mandiri", icon: "account_balance", accountNumber: "**** 7703", amount: 245000, color: "bg-blue-800" },
];

const initialEWallets = [
    { id: 1, name: "DANA", icon: "account_balance_wallet", amount: 425000, color: "bg-[#108EE9]", logo: "💳" },
    { id: 2, name: "ShopeePay", icon: "shopping_bag", amount: 180000, color: "bg-[#EE4D2D]", logo: "🛍️" },
    { id: 3, name: "GoPay", icon: "payments", amount: 350000, color: "bg-[#00AA13]", logo: "💚" },
    { id: 4, name: "OVO", icon: "credit_score", amount: 275000, color: "bg-[#4C3494]", logo: "💜" },
    { id: 5, name: "LinkAja", icon: "link", amount: 120000, color: "bg-[#E31E25]", logo: "🔗" },
];

const DataContext = createContext();

export function DataProvider({ children }) {
    // Transactions state with localStorage
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("transactions");
        return saved ? JSON.parse(saved) : initialTransactions;
    });

    // Assets states with localStorage
    const [cashAssets, setCashAssets] = useState(() => {
        const saved = localStorage.getItem("cashAssets");
        return saved ? JSON.parse(saved) : initialCashAssets;
    });

    const [bankAccounts, setBankAccounts] = useState(() => {
        const saved = localStorage.getItem("bankAccounts");
        return saved ? JSON.parse(saved) : initialBankAccounts;
    });

    const [eWallets, setEWallets] = useState(() => {
        const saved = localStorage.getItem("eWallets");
        return saved ? JSON.parse(saved) : initialEWallets;
    });

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem("cashAssets", JSON.stringify(cashAssets));
    }, [cashAssets]);

    useEffect(() => {
        localStorage.setItem("bankAccounts", JSON.stringify(bankAccounts));
    }, [bankAccounts]);

    useEffect(() => {
        localStorage.setItem("eWallets", JSON.stringify(eWallets));
    }, [eWallets]);

    // Calculate transaction totals
    const totalIncome = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    // Calculate asset totals
    const totalCash = cashAssets.reduce((sum, item) => sum + item.amount, 0);
    const totalBank = bankAccounts.reduce((sum, item) => sum + item.amount, 0);
    const totalEwallet = eWallets.reduce((sum, item) => sum + item.amount, 0);
    const totalAssets = totalCash + totalBank + totalEwallet;

    // Total balance is now based on assets
    const totalBalance = totalAssets;

    // Weekly spending (last 7 days)
    const getWeeklySpending = () => {
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const today = new Date();
        const weekData = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split("T")[0];

            const dayExpenses = transactions
                .filter(t => t.type === "expense" && t.date === dateStr)
                .reduce((sum, t) => sum + t.amount, 0);

            weekData.push({
                day: days[date.getDay() === 0 ? 6 : date.getDay() - 1],
                amount: dayExpenses,
            });
        }
        return weekData;
    };

    const weeklySpending = getWeeklySpending();
    const totalWeeklySpending = weeklySpending.reduce((sum, d) => sum + d.amount, 0);

    // Get all assets as a flat list for selection
    const getAllAssets = () => {
        return [
            ...cashAssets.map(a => ({ ...a, assetType: "cash" })),
            ...bankAccounts.map(a => ({ ...a, assetType: "bank" })),
            ...eWallets.map(a => ({ ...a, assetType: "ewallet" })),
        ];
    };

    // Add transaction and update asset balance
    const addTransaction = (transaction) => {
        const newTransaction = {
            ...transaction,
            id: Date.now(),
            date: transaction.date || new Date().toISOString().split("T")[0],
        };
        setTransactions([newTransaction, ...transactions]);

        // Update asset balance if assetId and assetType are provided
        if (transaction.assetId && transaction.assetType) {
            const amountChange = transaction.type === "income" ? transaction.amount : -transaction.amount;

            if (transaction.assetType === "cash") {
                setCashAssets(prev => prev.map(a =>
                    a.id === transaction.assetId ? { ...a, amount: a.amount + amountChange } : a
                ));
            } else if (transaction.assetType === "bank") {
                setBankAccounts(prev => prev.map(a =>
                    a.id === transaction.assetId ? { ...a, amount: a.amount + amountChange } : a
                ));
            } else if (transaction.assetType === "ewallet") {
                setEWallets(prev => prev.map(a =>
                    a.id === transaction.assetId ? { ...a, amount: a.amount + amountChange } : a
                ));
            }
        }
    };

    // Asset CRUD operations
    const addCashAsset = (asset) => {
        setCashAssets([...cashAssets, { ...asset, id: Date.now() }]);
    };

    const addBankAccount = (asset) => {
        setBankAccounts([...bankAccounts, { ...asset, id: Date.now() }]);
    };

    const addEWallet = (asset) => {
        setEWallets([...eWallets, { ...asset, id: Date.now() }]);
    };

    const updateCashAsset = (id, updates) => {
        setCashAssets(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    };

    const updateBankAccount = (id, updates) => {
        setBankAccounts(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    };

    const updateEWallet = (id, updates) => {
        setEWallets(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    };

    const deleteCashAsset = (id) => {
        setCashAssets(prev => prev.filter(a => a.id !== id));
    };

    const deleteBankAccount = (id) => {
        setBankAccounts(prev => prev.filter(a => a.id !== id));
    };

    const deleteEWallet = (id) => {
        setEWallets(prev => prev.filter(a => a.id !== id));
    };

    // Get recent transactions
    const recentTransactions = transactions.slice(0, 5);

    const value = {
        // Transactions
        transactions,
        totalIncome,
        totalExpenses,
        weeklySpending,
        totalWeeklySpending,
        recentTransactions,
        addTransaction,

        // Assets
        cashAssets,
        bankAccounts,
        eWallets,
        totalCash,
        totalBank,
        totalEwallet,
        totalAssets,
        totalBalance,
        getAllAssets,

        // Asset CRUD
        addCashAsset,
        addBankAccount,
        addEWallet,
        updateCashAsset,
        updateBankAccount,
        updateEWallet,
        deleteCashAsset,
        deleteBankAccount,
        deleteEWallet,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within DataProvider");
    }
    return context;
}
