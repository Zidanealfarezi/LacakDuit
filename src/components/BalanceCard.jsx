import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function BalanceCard() {
    const { totalBalance } = useData();

    return (
        <section className="px-4 py-4">
            <Link
                to="/assets"
                className="block relative overflow-hidden rounded-xl p-6 h-48 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
                style={{
                    background: "linear-gradient(135deg, #6467f2 0%, #4338ca 100%)",
                }}
            >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-white/70 text-sm font-medium">Total Balance</p>
                            <h2 className="text-white text-3xl font-extrabold tracking-tight mt-1">
                                Rp {totalBalance.toLocaleString("id-ID")}
                            </h2>
                        </div>
                        <div className="glass-effect p-2 rounded-lg">
                            <span className="material-symbols-outlined text-white">
                                account_balance_wallet
                            </span>
                        </div>
                    </div>
                </div>
                <div className="relative z-10 flex justify-between items-center">
                    <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full border-2 border-primary bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                            VISA
                        </div>
                        <div className="w-8 h-8 rounded-full border-2 border-primary bg-slate-700 flex items-center justify-center text-[10px] font-bold italic text-white">
                            MC
                        </div>
                    </div>
                    <p className="text-white/80 text-xs font-mono tracking-widest">
                        **** 8842
                    </p>
                </div>
            </Link>
        </section>
    );
}


