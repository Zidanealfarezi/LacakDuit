import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function DebtCard() {
    const { totalDebt } = useData();

    return (
        <section className="px-4 pb-4">
            <Link
                to="/loans"
                className="relative overflow-hidden rounded-2xl p-5 h-32 flex flex-col justify-between shadow-lg shadow-red-500/20 active:scale-95 transition-transform"
                style={{
                    background: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
                }}
            >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <span className="material-symbols-outlined text-white text-lg">credit_card_off</span>
                            </div>
                            <span className="text-white/90 text-sm font-medium">Total Hutang</span>
                        </div>
                        <h2 className="text-white text-2xl font-bold tracking-tight">
                            Rp {totalDebt.toLocaleString("id-ID")}
                        </h2>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-white/70 text-xs bg-black/10 px-2 py-1 rounded-lg backdrop-blur-sm">
                            Belum Lunas
                        </span>
                        <span className="material-symbols-outlined text-white/50 text-xl">arrow_forward</span>
                    </div>
                </div>
            </Link>
        </section>
    );
}
