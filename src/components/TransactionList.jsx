import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function TransactionList() {
    const { recentTransactions, deleteTransaction } = useData();
    const navigate = useNavigate();
    const [selectedTx, setSelectedTx] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleDeleteClick = () => {
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        if (selectedTx) {
            deleteTransaction(selectedTx.id);
            setShowDeleteConfirm(false);
            setSelectedTx(null);
        }
    };

    const handleEdit = () => {
        if (selectedTx) {
            navigate("/add", { state: { transaction: selectedTx } });
        }
    };

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
                            onClick={() => setSelectedTx(tx)}
                            className="flex items-center justify-between p-4 bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-white/5 active:bg-slate-50 dark:active:bg-white/10 transition-colors cursor-pointer"
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

            {/* Detail Modal */}
            {selectedTx && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelectedTx(null)}>
                    <div className="bg-white dark:bg-card-dark w-full max-w-sm rounded-2xl p-6 space-y-6 animate-scale-up" onClick={e => e.stopPropagation()}>
                        {/* Header */}
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedTx.type === "income"
                                        ? "bg-emerald-500/10 text-emerald-500"
                                        : "bg-primary/10 text-primary"
                                        }`}
                                >
                                    <span className="material-symbols-outlined">{selectedTx.icon}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{selectedTx.category}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        {formatDate(selectedTx.date)}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedTx(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Amount */}
                        <div className="text-center py-4">
                            <p className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-1">Total</p>
                            <p className={`text-3xl font-bold ${selectedTx.type === "income" ? "text-emerald-500" : "text-slate-900 dark:text-white"}`}>
                                {selectedTx.type === "income" ? "+" : "-"}Rp {selectedTx.amount.toLocaleString("id-ID")}
                            </p>
                            {selectedTx.note && (
                                <p className="text-slate-500 mt-2 italic">"{selectedTx.note}"</p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={handleEdit}
                                className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">edit</span>
                                Edit
                            </button>
                            <button
                                onClick={handleDeleteClick}
                                className="flex-1 py-3 bg-red-500/10 text-red-500 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">delete</span>
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-card-dark w-full max-w-sm rounded-2xl p-6 space-y-6 animate-scale-up shadow-2xl">
                        <div className="text-center space-y-3">
                            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
                                <span className="material-symbols-outlined text-3xl text-red-500">warning</span>
                            </div>
                            <h2 className="text-xl font-bold dark:text-white">Hapus Transaksi?</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Tindakan ini tidak dapat dibatalkan. Saldo Anda akan disesuaikan kembali.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30"
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

