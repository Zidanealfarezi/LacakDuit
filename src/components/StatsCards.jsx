import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function StatsCards() {
    const { totalIncome, totalExpenses } = useData();

    return (
        <section className="px-4 py-2 grid grid-cols-2 gap-4">
            <Link to="/income" className="bg-white dark:bg-card-dark p-5 rounded-xl border border-slate-200 dark:border-white/5 flex flex-col gap-1 active:scale-[0.98] transition-transform">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <span className="material-symbols-outlined text-lg">trending_up</span>
                        </div>
                        <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Pemasukan</span>
                    </div>
                    <p className="text-lg font-bold">Rp {totalIncome.toLocaleString("id-ID")}</p>
                </div>
            </Link>

            {/* Expenses Card */}
            <Link to="/expenses" className="bg-white dark:bg-card-dark p-5 rounded-xl border border-slate-200 dark:border-white/5 flex flex-col gap-1 active:scale-[0.98] transition-transform">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                            <span className="material-symbols-outlined text-lg">trending_down</span>
                        </div>
                        <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Pengeluaran</span>
                    </div>
                    <p className="text-lg font-bold">Rp {totalExpenses.toLocaleString("id-ID")}</p>
                </div>
            </Link>
        </section>
    );
}


