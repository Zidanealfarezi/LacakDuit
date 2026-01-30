import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function StatsCards() {
    const { totalIncome, totalExpenses } = useData();

    return (
        <section className="px-4 py-2 grid grid-cols-2 gap-4">
            <Link to="/income" className="bg-white dark:bg-card-dark p-5 rounded-xl border border-slate-200 dark:border-white/5 flex flex-col gap-1 active:scale-[0.98] transition-transform">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-emerald-500 text-lg">
                            arrow_downward
                        </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Income
                    </span>
                </div>
                <p className="text-lg font-bold">Rp {totalIncome.toLocaleString("id-ID")}</p>
                <p className="text-emerald-500 text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">trending_up</span>{" "}
                    +12%
                </p>
            </Link>
            <Link to="/expenses" className="bg-white dark:bg-card-dark p-5 rounded-xl border border-slate-200 dark:border-white/5 flex flex-col gap-1 active:scale-[0.98] transition-transform">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-lg">
                            arrow_upward
                        </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Expenses
                    </span>
                </div>
                <p className="text-lg font-bold">Rp {totalExpenses.toLocaleString("id-ID")}</p>
                <p className="text-primary text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                        trending_down
                    </span>{" "}
                    -5%
                </p>
            </Link>
        </section>
    );
}


