import { useState } from "react";

const tabs = [
    { id: "all", label: "Semua" },
    { id: "expense", label: "Pengeluaran" },
    { id: "income", label: "Pemasukan" },
];

export default function TransactionHeader({ activeTab, onTabChange }) {
    return (
        <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 ios-blur border-b border-transparent">
            <div className="flex items-center p-4 pb-2 justify-between">
                <div className="flex size-12 shrink-0 items-center justify-start">
                    <span className="material-symbols-outlined text-primary text-2xl">
                        search
                    </span>
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">
                    Riwayat Transaksi
                </h2>
                <div className="flex w-12 items-center justify-end">
                    <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-primary/10 text-primary transition-colors active:bg-primary/20">
                        <span className="material-symbols-outlined text-2xl">tune</span>
                    </button>
                </div>
            </div>
            <div className="px-4">
                <div className="flex border-b border-slate-200 dark:border-white/10 gap-8">
                    {tabs.map((tab) => (
                        <a
                            key={tab.id}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onTabChange(tab.id);
                            }}
                            className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-4 ${activeTab === tab.id
                                    ? "border-primary text-primary"
                                    : "border-transparent text-slate-500 dark:text-slate-400"
                                }`}
                        >
                            <p className="text-sm font-bold leading-normal">{tab.label}</p>
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
}
