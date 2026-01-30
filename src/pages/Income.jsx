import { Link, useLocation } from "react-router-dom";

const transactions = [
    { id: 1, icon: "payments", name: "Gaji Bulanan", date: "Hari ini", amount: 5000000, color: "text-emerald-500" },
    { id: 2, icon: "trending_up", name: "Bonus Project", date: "28 Jan", amount: 1500000, color: "text-blue-500" },
    { id: 3, icon: "account_balance", name: "Dividen Saham", date: "25 Jan", amount: 800000, color: "text-purple-500" },
    { id: 4, icon: "sell", name: "Penjualan Barang", date: "22 Jan", amount: 450000, color: "text-orange-500" },
    { id: 5, icon: "redeem", name: "Cashback", date: "20 Jan", amount: 250000, color: "text-pink-500" },
];

const navItems = [
    { icon: "grid_view", label: "Dashboard", path: "/" },
    { icon: "analytics", label: "Stats", path: "/stats" },
    { spacer: true },
    { icon: "credit_card", label: "Cards", path: "/cards" },
    { icon: "settings", label: "Settings", path: "/settings" },
];

export default function Income() {
    const location = useLocation();
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen pb-24">
            {/* Header */}
            <div className="bg-gradient-to-b from-emerald-500/20 to-transparent pt-6 pb-8 px-6">
                <div className="flex items-center gap-3 mb-6">
                    <Link to="/" className="text-slate-400 hover:text-white">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h1 className="text-xl font-bold">Pemasukan</h1>
                </div>

                {/* Total Card */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-emerald-500">south_west</span>
                        <span className="text-emerald-500 text-sm font-medium">Total Pemasukan</span>
                    </div>
                    <p className="text-3xl font-bold">Rp {total.toLocaleString("id-ID")}</p>
                    <div className="flex items-center gap-1 mt-2 text-emerald-500">
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                        <span className="text-sm font-medium">+12% dari bulan lalu</span>
                    </div>
                </div>
            </div>

            {/* Transaction List */}
            <div className="px-6">
                <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                    Riwayat Pemasukan
                </h2>
                <div className="space-y-3">
                    {transactions.map((t) => (
                        <div key={t.id} className="bg-white dark:bg-card-dark rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center`}>
                                    <span className={`material-symbols-outlined ${t.color}`}>{t.icon}</span>
                                </div>
                                <div>
                                    <p className="font-semibold">{t.name}</p>
                                    <p className="text-slate-500 text-sm">{t.date}</p>
                                </div>
                            </div>
                            <p className="text-emerald-500 font-bold">+Rp {t.amount.toLocaleString("id-ID")}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-[#101122]/80 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 px-6 py-3 flex justify-between items-center z-40 max-w-md mx-auto">
                {navItems.map((item, index) =>
                    item.spacer ? (
                        <Link
                            key={index}
                            to="/add"
                            className="relative -top-6 bg-primary w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-primary/40 text-white border-4 border-background-light dark:border-background-dark active:scale-95 transition-transform"
                        >
                            <span className="material-symbols-outlined text-2xl">add</span>
                        </Link>
                    ) : (
                        <Link
                            key={index}
                            to={item.path}
                            className={`flex flex-col items-center gap-1 ${location.pathname === item.path
                                    ? "text-primary"
                                    : "text-slate-400 dark:text-slate-500"
                                }`}
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span className="text-[10px] font-bold">{item.label}</span>
                        </Link>
                    )
                )}
            </div>
        </div>
    );
}
