import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function BalanceCard() {
    const { totalBalance, totalDebt } = useData();

    return (
        <section className="px-4 py-4">
            <Link
                to="/assets"
                className="relative overflow-hidden rounded-2xl p-6 h-40 flex flex-col justify-between shadow-xl shadow-indigo-500/20 active:scale-[0.98] transition-all"
                style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                }}
            >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <span className="material-symbols-outlined text-white text-xl">account_balance_wallet</span>
                            </div>
                            <div>
                                <p className="text-white/80 text-sm font-medium">Total Saldo</p>
                                <p className="text-white/60 text-[10px]">Semua Aset</p>
                            </div>
                        </div>
                        <div className="bg-white/10 p-2 rounded-full backdrop-blur-md">
                            <span className="material-symbols-outlined text-white text-xl">visibility</span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-white text-3xl font-bold tracking-tight mb-1">
                            Rp {totalBalance.toLocaleString("id-ID")}
                        </h2>
                        <div className="flex items-center gap-2">
                            <span className="text-white/70 text-xs bg-black/10 px-2 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-[10px]">trending_up</span>
                                +2.5% bulan ini
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </section>
    );
}


