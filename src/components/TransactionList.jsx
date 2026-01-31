import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function TransactionList() {
    const { recentTransactions } = useData();

    // Helper to format date
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return "Hari ini";
        } else if (date.toDateString() === yesterday.toDateString()) {
            return "Kemarin";
        } else {
            return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
        }
    };

    return (
        <section className="px-4 pb-10">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Transaksi Terakhir</h3>
                <Link to="/history" className="text-primary text-sm font-bold active:opacity-60">
                    See All
                </Link>
            </div>
            <div className="space-y-3">
                {recentTransactions.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                        <span className="material-symbols-outlined text-4xl mb-2">receipt_long</span>
                        <p>Belum ada transaksi</p>
                    </div>
                ) : (
                    recentTransactions.map((tx) => (
                        <div
                            key={tx.id}
                            className="flex items-center justify-between p-4 bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-white/5 active:bg-slate-50 dark:active:bg-white/10 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.type === "income"
                                        ? "bg-emerald-500/10 text-emerald-500"
                                        : "bg-primary/10 text-primary"
                                        }`}
                                >
                                    <span className="material-symbols-outlined">{tx.icon}</span>
                                </div>
                                <div>
                                    <p className="font-bold text-sm">{tx.note || tx.category}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {formatDate(tx.date)} • {tx.category}
                                    </p>
                                </div>
                            </div>
                            <p className={`font-bold text-sm ${tx.type === "income" ? "text-emerald-500" : ""}`}>
                                {tx.type === "income" ? "+" : "-"}Rp {tx.amount.toLocaleString("id-ID")}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

