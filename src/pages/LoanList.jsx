import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import PageTransition from "../components/PageTransition";

export default function LoanList() {
    const { loans, payInstallment, getAllAssets } = useData();
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [isPayModalOpen, setIsPayModalOpen] = useState(false);

    // Payment Form State
    const [payAmount, setPayAmount] = useState("");
    const [paySource, setPaySource] = useState(null);
    const [showSources, setShowSources] = useState(false);

    const activeLoans = loans.filter(l => l.status === "active");
    const paidLoans = loans.filter(l => l.status === "paid");
    const allAssets = getAllAssets();

    const handleOpenPayModal = (loan) => {
        setSelectedLoan(loan);
        // Use stored monthly installment or fallback to estimation (for old loans)
        const monthly = loan.monthlyInstallment
            ? loan.monthlyInstallment
            : Math.ceil(loan.totalAmount / loan.tenor);

        // Ensure we don't pay more than remaining
        const amountToPay = Math.min(monthly, loan.remainingAmount);

        setPayAmount(amountToPay.toLocaleString("id-ID"));
        setIsPayModalOpen(true);
    };

    const handlePay = () => {
        if (!selectedLoan || !payAmount || !paySource) return;

        const numAmount = parseInt(payAmount.replace(/\./g, ""), 10);

        payInstallment(
            selectedLoan.id,
            numAmount,
            paySource.id,
            paySource.assetType
        );

        setIsPayModalOpen(false);
        setPayAmount("");
        setPaySource(null);
        setSelectedLoan(null);
    };

    const formatCurrency = (val) => {
        return "Rp " + val.toLocaleString("id-ID");
    };

    const getAssetIcon = (asset) => {
        if (asset.assetType === "ewallet") return asset.logo;
        if (asset.assetType === "bank") return "bank";
        return "payments";
    };

    return (
        <PageTransition>
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen pb-24 relative">
                {/* Header */}
                <div className="bg-gradient-to-b from-primary/20 to-transparent pt-8 pb-6 px-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="w-10 h-10 flex items-center justify-center bg-white dark:bg-card-dark rounded-full shadow-sm text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined">arrow_back</span>
                            </Link>
                            <h1 className="text-xl font-bold">Daftar Cicilan</h1>
                        </div>
                        <Link to="/loans/add" className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full shadow-lg shadow-primary/30">
                            <span className="material-symbols-outlined">add</span>
                        </Link>
                    </div>
                </div>

                <div className="px-6 space-y-6">
                    {/* Active Loans */}
                    <div>
                        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Sedang Berjalan</h2>
                        {activeLoans.length === 0 ? (
                            <div className="text-center py-8 bg-white dark:bg-card-dark rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                                <p className="text-slate-400 text-sm">Tidak ada cicilan aktif</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {activeLoans.map(loan => (
                                    <div key={loan.id} className="bg-white dark:bg-card-dark rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`w-2 h-2 rounded-full ${loan.type === 'cash' ? 'bg-emerald-500' : 'bg-orange-500'}`}></span>
                                                    <span className="text-xs text-slate-400 capitalize">
                                                        {loan.type === 'cash' ? 'Pinjaman Tunai' : (loan.provider ? loan.provider.name : 'Paylater')}
                                                    </span>
                                                </div>
                                                <h3 className="font-bold text-lg">{loan.name}</h3>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-slate-400">Sisa Hutang</p>
                                                <p className="font-bold text-red-500">{formatCurrency(loan.remainingAmount)}</p>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="mb-4">
                                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                                                <span>Progress: {Math.round((loan.paidAmount / loan.totalAmount) * 100)}%</span>
                                                <span>{loan.currentTenor}/{loan.tenor} Bulan</span>
                                            </div>
                                            <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary transition-all duration-500"
                                                    style={{ width: `${(loan.paidAmount / loan.totalAmount) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            {loan.note && (
                                                <div className="flex-1 mb-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                                                    <p className="text-xs text-slate-500 italic">"{loan.note}"</p>
                                                </div>
                                            )}
                                            {loan.dueDate && (
                                                <div className="mb-4 bg-red-50 dark:bg-red-500/10 p-3 rounded-lg flex items-center gap-2 text-red-600 dark:text-red-400">
                                                    <span className="material-symbols-outlined text-sm">calendar_month</span>
                                                    <p className="text-xs font-bold">Jatuh Tempo: Tgl {loan.dueDate}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                            <div className="text-xs text-slate-400">
                                                Total: {formatCurrency(loan.totalAmount)}
                                            </div>
                                            <button
                                                onClick={() => handleOpenPayModal(loan)}
                                                className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-bold hover:bg-primary/20 transition-colors"
                                            >
                                                Bayar Cicilan
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Paid Loans History */}
                    {paidLoans.length > 0 && (
                        <div>
                            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Riwayat Lunas</h2>
                            <div className="space-y-4 opacity-75">
                                {paidLoans.map(loan => (
                                    <div key={loan.id} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                                        <div>
                                            <h3 className="font-bold text-slate-600 dark:text-slate-300">{loan.name}</h3>
                                            <p className="text-xs text-slate-400">Total: {formatCurrency(loan.totalAmount)}</p>
                                        </div>
                                        <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-xs font-bold">Lunas</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Pay Modal */}
                {isPayModalOpen && (
                    <div className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                        <div className="bg-white dark:bg-card-dark w-full max-w-sm sm:rounded-2xl rounded-t-2xl p-6 animate-slide-up sm:animate-scale-in">
                            <h2 className="text-xl font-bold mb-4">Bayar Cicilan</h2>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">Nominal Pembayaran</p>
                                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3">
                                        <span className="font-bold text-slate-500">Rp</span>
                                        <input
                                            type="text"
                                            value={payAmount}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, "");
                                                setPayAmount(val.replace(/\B(?=(\d{3})+(?!\d))/g, "."));
                                            }}
                                            className="bg-transparent font-bold text-lg w-full outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500 mb-1">Sumber Dana</p>
                                    <button
                                        onClick={() => setShowSources(!showSources)}
                                        className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            {paySource ? (
                                                <>
                                                    <span className="material-symbols-outlined text-xl">{getAssetIcon(paySource)}</span>
                                                    <span className="font-medium text-sm">{paySource.name}</span>
                                                </>
                                            ) : (
                                                <span className="text-slate-400 text-sm">Pilih Sumber Dana</span>
                                            )}
                                        </div>
                                        <span className="material-symbols-outlined text-slate-500">expand_more</span>
                                    </button>

                                    {showSources && (
                                        <div className="mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 p-2 max-h-40 overflow-y-auto">
                                            {allAssets.map(asset => (
                                                <button
                                                    key={`${asset.assetType}-${asset.id}`}
                                                    onClick={() => {
                                                        setPaySource(asset);
                                                        setShowSources(false);
                                                    }}
                                                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-left"
                                                >
                                                    <span className="material-symbols-outlined text-lg">{getAssetIcon(asset)}</span>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium">{asset.name}</p>
                                                        <p className="text-xs text-slate-400">Rp {asset.amount.toLocaleString("id-ID")}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button
                                        onClick={() => setIsPayModalOpen(false)}
                                        className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={handlePay}
                                        disabled={!payAmount || !paySource}
                                        className="flex-1 py-3 bg-primary text-white rounded-xl font-bold disabled:opacity-50"
                                    >
                                        Bayar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </PageTransition>
    );
}
