import { createContext, useContext, useState, useEffect } from "react";

// Initial transactions data
const initialTransactions = [];

// Initial assets data
const initialCashAssets = [
    { id: 1, name: "Dompet Utama", icon: "wallet", amount: 0, color: "bg-emerald-500" },
    { id: 2, name: "Tabungan Rumah", icon: "savings", amount: 0, color: "bg-amber-500" },
];

const initialBankAccounts = [
    { id: 1, name: "BCA", icon: "account_balance", accountNumber: "**** 8842", amount: 0, color: "bg-blue-600" },
    { id: 2, name: "BNI", icon: "account_balance", accountNumber: "**** 5521", amount: 0, color: "bg-orange-500" },
    { id: 3, name: "Mandiri", icon: "account_balance", accountNumber: "**** 7703", amount: 0, color: "bg-blue-800" },
];

const initialEWallets = [
    { id: 1, name: "DANA", icon: "account_balance_wallet", amount: 0, color: "bg-[#108EE9]", logo: "💳" },
    { id: 2, name: "ShopeePay", icon: "shopping_bag", amount: 0, color: "bg-[#EE4D2D]", logo: "🛍️" },
    { id: 3, name: "GoPay", icon: "payments", amount: 0, color: "bg-[#00AA13]", logo: "💚" },
    { id: 4, name: "OVO", icon: "credit_score", amount: 0, color: "bg-[#4C3494]", logo: "💜" },
    { id: 5, name: "LinkAja", icon: "link", amount: 0, color: "bg-[#E31E25]", logo: "🔗" },
];

const DataContext = createContext();

export function DataProvider({ children }) {
    // Transactions state with localStorage
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("transactions_v2");
        return saved ? JSON.parse(saved) : initialTransactions;
    });

    // Assets states with localStorage
    const [cashAssets, setCashAssets] = useState(() => {
        const saved = localStorage.getItem("cashAssets_v2");
        return saved ? JSON.parse(saved) : initialCashAssets;
    });

    const [bankAccounts, setBankAccounts] = useState(() => {
        const saved = localStorage.getItem("bankAccounts_v2");
        return saved ? JSON.parse(saved) : initialBankAccounts;
    });

    const [eWallets, setEWallets] = useState(() => {
        const saved = localStorage.getItem("eWallets_v2");
        return saved ? JSON.parse(saved) : initialEWallets;
    });

    const [customCategories, setCustomCategories] = useState(() => {
        const saved = localStorage.getItem("customCategories_v2");
        return saved ? JSON.parse(saved) : [];
    });

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem("transactions_v2", JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem("cashAssets_v2", JSON.stringify(cashAssets));
    }, [cashAssets]);

    useEffect(() => {
        localStorage.setItem("bankAccounts_v2", JSON.stringify(bankAccounts));
    }, [bankAccounts]);

    useEffect(() => {
        localStorage.setItem("eWallets_v2", JSON.stringify(eWallets));
    }, [eWallets]);

    useEffect(() => {
        localStorage.setItem("customCategories_v2", JSON.stringify(customCategories));
    }, [customCategories]);

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

    // Helper to get date string in local time YYYY-MM-DD
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Weekly spending (last 7 days)
    const getWeeklySpending = () => {
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const today = new Date();
        const weekData = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = formatDate(date);

            const dayExpenses = transactions
                .filter(t => t.type === "expense" && t.date === dateStr)
                .reduce((sum, t) => sum + t.amount, 0);

            weekData.push({
                day: days[date.getDay() === 0 ? 6 : date.getDay() - 1], // Adjust to Mon-Sun index
                amount: dayExpenses,
                date: dateStr, // Include date for matching
                fullDate: date // Include full date object for sorting/display if needed
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
            date: transaction.date || formatDate(new Date()),
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

    const deleteTransaction = (id) => {
        const transaction = transactions.find(t => t.id === id);
        if (!transaction) return;

        setTransactions(prev => prev.filter(t => t.id !== id));

        // Revert balance change
        if (transaction.assetId && transaction.assetType) {
            // If it was income, we subtract. If expense, we add back.
            const amountChange = transaction.type === "income" ? -transaction.amount : transaction.amount;

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

    const updateTransaction = (id, updatedData) => {
        const oldTransaction = transactions.find(t => t.id === id);
        if (!oldTransaction) return;

        // 1. Revert old transaction effect on assets
        if (oldTransaction.assetId && oldTransaction.assetType) {
            const revertAmount = oldTransaction.type === "income" ? -oldTransaction.amount : oldTransaction.amount;
            // distinct update functions would be cleaner but let's do direct set for now to avoid multiple re-renders or complex logic
            // Actually, let's reuse the logic by calling a helper or just duplicating for clarity.
            // To avoid race conditions with state updates, we should probably do this atomically if possible, 
            // but for this app structure, sequential updates are okay-ish or we calculate net change.
            // Let's use a "revert" then "apply" approach conceptually.

            // Helper to update asset list
            const updateAssetList = (list, assetId, change) => {
                return list.map(a => a.id === assetId ? { ...a, amount: a.amount + change } : a);
            };

            if (oldTransaction.assetType === "cash") {
                setCashAssets(prev => updateAssetList(prev, oldTransaction.assetId, revertAmount));
            } else if (oldTransaction.assetType === "bank") {
                setBankAccounts(prev => updateAssetList(prev, oldTransaction.assetId, revertAmount));
            } else if (oldTransaction.assetType === "ewallet") {
                setEWallets(prev => updateAssetList(prev, oldTransaction.assetId, revertAmount));
            }
        }

        // 2. Update transaction list
        setTransactions(prev => prev.map(t => t.id === id ? { ...updatedData, id } : t));

        // 3. Apply new transaction effect on assets
        // We need to wait for the first state update? No, React batches or we need to assume the previous state is "current" for this logic?
        // Actually, setCashAssets(prev => ...) uses the latest state. So we can chain updates safely?
        // Valid concern: if assetId changed, we update two different assets. 
        // If we call setCashAssets twice, it might be fine due to functional updates.

        if (updatedData.assetId && updatedData.assetType) {
            const applyAmount = updatedData.type === "income" ? updatedData.amount : -updatedData.amount;

            const updateAssetList = (list, assetId, change) => {
                return list.map(a => a.id === assetId ? { ...a, amount: a.amount + change } : a);
            };

            if (updatedData.assetType === "cash") {
                setCashAssets(prev => updateAssetList(prev, updatedData.assetId, applyAmount));
            } else if (updatedData.assetType === "bank") {
                setBankAccounts(prev => updateAssetList(prev, updatedData.assetId, applyAmount));
            } else if (updatedData.assetType === "ewallet") {
                setEWallets(prev => updateAssetList(prev, updatedData.assetId, applyAmount));
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

    // Transfer asset
    const transferAsset = ({ sourceId, sourceType, destId, destType, amount, fee = 0, date, note }) => {
        const transferId = Date.now();
        const transferDate = date || formatDate(new Date());

        // 1. Create Transfer Transaction Record
        const transferTx = {
            id: transferId,
            type: "transfer",
            category: "Transfer",
            icon: "swap_horiz",
            amount: amount,
            date: transferDate,
            note: note || "Transfer Dana",
            sourceId, sourceType,
            destId, destType,
            fee
        };

        const newTransactions = [transferTx];

        // 2. Handle Admin Fee (if any) as separate Expense
        if (fee > 0) {
            const feeTx = {
                id: transferId + 1,
                type: "expense",
                category: "Biaya Admin",
                icon: "receipt_long",
                amount: fee,
                date: transferDate,
                note: "Biaya transfer",
                assetId: sourceId,
                assetType: sourceType
            };
            newTransactions.push(feeTx);
        }

        setTransactions(prev => [...newTransactions, ...prev]);

        // 3. Update Balances
        // Deduct from Source (Amount + Fee)
        const totalDeduction = amount + fee;
        if (sourceType === "cash") {
            setCashAssets(prev => prev.map(a => a.id === sourceId ? { ...a, amount: a.amount - totalDeduction } : a));
        } else if (sourceType === "bank") {
            setBankAccounts(prev => prev.map(a => a.id === sourceId ? { ...a, amount: a.amount - totalDeduction } : a));
        } else if (sourceType === "ewallet") {
            setEWallets(prev => prev.map(a => a.id === sourceId ? { ...a, amount: a.amount - totalDeduction } : a));
        }

        // Add to Destination (Amount only)
        if (destType === "cash") {
            setCashAssets(prev => prev.map(a => a.id === destId ? { ...a, amount: a.amount + amount } : a));
        } else if (destType === "bank") {
            setBankAccounts(prev => prev.map(a => a.id === destId ? { ...a, amount: a.amount + amount } : a));
        } else if (destType === "ewallet") {
            setEWallets(prev => prev.map(a => a.id === destId ? { ...a, amount: a.amount + amount } : a));
        }
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

    const addCustomCategory = (category) => {
        setCustomCategories(prev => [...prev, { ...category, id: Date.now(), isCustom: true }]);
    };

    const deleteCustomCategory = (id) => {
        setCustomCategories(prev => prev.filter(c => c.id !== id));
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
        deleteTransaction,
        updateTransaction,
        transferAsset,

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

        // Custom Categories
        customCategories,
        addCustomCategory,
        deleteCustomCategory,
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
