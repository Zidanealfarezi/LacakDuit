import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function BalanceCard() {
    const { totalBalance, totalDebt } = useData();

    return (
        <section className="px-4 py-4">
            <div className="grid grid-cols-2 gap-3">
                {/* Total Saldo */}
                <Link
                    to="/assets"
                    className="relative overflow-hidden rounded-2xl p-4 h-32 flex flex-col justify-between shadow-lg shadow-indigo-500/20 active:scale-95 transition-transform"
                    style={{
                        background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                    }}
                >
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-white/80 text-lg">account_balance_wallet</span>
                            <p className="text-white/80 text-xs font-medium">Saldo</p>
                        </div>
                        <h2 className="text-white text-lg font-bold tracking-tight">
                            Rp {totalBalance.toLocaleString("id-ID", { notation: "compact", compactDisplay: "short" })}
                        </h2>
                        <p className="text-white/60 text-[10px] mt-1">Total Aset</p>
                    </div>
                </Link>

                {/* Total Hutang */}
                <Link
                    to="/loans"
                    className="relative overflow-hidden rounded-2xl p-4 h-32 flex flex-col justify-between shadow-lg shadow-red-500/20 active:scale-95 transition-transform"
                    style={{
                        background: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
                    }}
                >
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-white/80 text-lg">credit_card_off</span>
                            <p className="text-white/80 text-xs font-medium">Hutang</p>
                        </div>
                        <h2 className="text-white text-lg font-bold tracking-tight">
                            Rp {totalDebt.toLocaleString("id-ID", { notation: "compact", compactDisplay: "short" })}
                        </h2>
                        <p className="text-white/60 text-[10px] mt-1">Belum Lunas</p>
                    </div>
                </Link>
            </div>
        </section>
    );
}


