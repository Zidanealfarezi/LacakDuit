import { Link, useLocation } from "react-router-dom";

const transactions = [
    { id: 1, icon: "restaurant", name: "Makan Siang", date: "Hari ini", amount: 75000, color: "text-orange-500" },
    { id: 2, icon: "directions_car", name: "Bensin", date: "Hari ini", amount: 150000, color: "text-blue-500" },
    { id: 3, icon: "shopping_bag", name: "Belanja Groceries", date: "28 Jan", amount: 350000, color: "text-pink-500" },
    { id: 4, icon: "bolt", name: "Listrik", date: "27 Jan", amount: 450000, color: "text-yellow-500" },
    { id: 5, icon: "wifi", name: "Internet", date: "25 Jan", amount: 399000, color: "text-primary" },
    { id: 6, icon: "local_movies", name: "Netflix", date: "22 Jan", amount: 186000, color: "text-red-500" },
    { id: 7, icon: "coffee", name: "Kopi", date: "20 Jan", amount: 45000, color: "text-amber-600" },
];

const navItems = [
    { icon: "grid_view", label: "Dashboard", path: "/" },
    { icon: "analytics", label: "Stats", path: "/stats" },
    { spacer: true },
    { icon: "credit_card", label: "Cards", path: "/cards" },
    { icon: "settings", label: "Settings", path: "/settings" },
];

export default function Expenses() {
    const location = useLocation();
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen pb-24">
            {/* Header */}
            <div className="bg-gradient-to-b from-red-500/20 to-transparent pt-6 pb-8 px-6">
                <div className="flex items-center gap-3 mb-6">
                    <Link to="/" className="text-slate-400 hover:text-white">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h1 className="text-xl font-bold">Pengeluaran</h1>
                </div>

                {/* Total Card */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-red-500">north_east</span>
                        <span className="text-red-500 text-sm font-medium">Total Pengeluaran</span>
                    </div>
                    <p className="text-3xl font-bold">Rp {total.toLocaleString("id-ID")}</p>
                    <div className="flex items-center gap-1 mt-2 text-red-500">
                        <span className="material-symbols-outlined text-sm">trending_down</span>
                        <span className="text-sm font-medium">-5% dari bulan lalu</span>
                    </div>
                </div>
            </div>

            {/* Category Summary */}
            <div className="px-6 mb-6">
                <div className="bg-white dark:bg-card-dark rounded-xl p-4">
                    <h3 className="text-sm font-bold text-slate-500 mb-3">Kategori Terbesar</h3>
                    <div className="flex gap-3">
                        <div className="flex-1 bg-orange-500/10 rounded-lg p-3 text-center">
                            <span className="material-symbols-outlined text-orange-500">restaurant</span>
                            <p className="text-xs mt-1 text-slate-500">Makanan</p>
                            <p className="font-bold text-sm">35%</p>
                        </div>
                        <div className="flex-1 bg-blue-500/10 rounded-lg p-3 text-center">
                            <span className="material-symbols-outlined text-blue-500">directions_car</span>
                            <p className="text-xs mt-1 text-slate-500">Transport</p>
                            <p className="font-bold text-sm">25%</p>
                        </div>
                        <div className="flex-1 bg-yellow-500/10 rounded-lg p-3 text-center">
                            <span className="material-symbols-outlined text-yellow-500">bolt</span>
                            <p className="text-xs mt-1 text-slate-500">Utilitas</p>
                            <p className="font-bold text-sm">20%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction List */}
            <div className="px-6">
                <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                    Riwayat Pengeluaran
                </h2>
                <div className="space-y-3">
                    {transactions.map((t) => (
                        <div key={t.id} className="bg-white dark:bg-card-dark rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center`}>
                                    <span className={`material-symbols-outlined ${t.color}`}>{t.icon}</span>
                                </div>
                                <div>
                                    <p className="font-semibold">{t.name}</p>
                                    <p className="text-slate-500 text-sm">{t.date}</p>
                                </div>
                            </div>
                            <p className="text-red-500 font-bold">-Rp {t.amount.toLocaleString("id-ID")}</p>
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
