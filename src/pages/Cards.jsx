import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const cards = [
    {
        id: 1,
        type: "Visa",
        name: "Platinum Card",
        number: "**** **** **** 4532",
        balance: 15500000,
        color: "from-violet-600 to-indigo-600",
    },
    {
        id: 2,
        type: "Mastercard",
        name: "Gold Card",
        number: "**** **** **** 8721",
        balance: 8200000,
        color: "from-amber-500 to-orange-500",
    },
    {
        id: 3,
        type: "Visa",
        name: "Standard Card",
        number: "**** **** **** 3156",
        balance: 2750000,
        color: "from-slate-600 to-slate-800",
    },
];

const transactions = [
    { id: 1, name: "Netflix", date: "Hari ini", amount: -186000, icon: "play_circle" },
    { id: 2, name: "Spotify", date: "28 Jan", amount: -59000, icon: "music_note" },
    { id: 3, name: "Transfer In", date: "27 Jan", amount: 500000, icon: "arrow_downward" },
    { id: 4, name: "Tokopedia", date: "25 Jan", amount: -350000, icon: "shopping_bag" },
];

const navItems = [
    { icon: "grid_view", label: "Dashboard", path: "/" },
    { icon: "analytics", label: "Stats", path: "/stats" },
    { spacer: true },
    { icon: "credit_card", label: "Cards", path: "/cards" },
    { icon: "settings", label: "Settings", path: "/settings" },
];

export default function Cards() {
    const location = useLocation();
    const [activeCard, setActiveCard] = useState(0);

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen pb-24">
            {/* Header */}
            <div className="px-6 pt-8 pb-4">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-bold">Kartu Saya</h1>
                    <button className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">add</span>
                    </button>
                </div>
            </div>

            {/* Card Carousel */}
            <div className="px-6 mb-6">
                <div className="relative overflow-hidden">
                    <div
                        className="flex transition-transform duration-300 gap-4"
                        style={{ transform: `translateX(-${activeCard * 100}%)` }}
                    >
                        {cards.map((card) => (
                            <div
                                key={card.id}
                                className={`min-w-full bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white shadow-xl`}
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <p className="text-white/60 text-sm">{card.type}</p>
                                        <p className="font-bold">{card.name}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-3xl">contactless</span>
                                </div>
                                <p className="text-lg tracking-widest mb-6 font-mono">{card.number}</p>
                                <div>
                                    <p className="text-white/60 text-xs">Saldo</p>
                                    <p className="text-2xl font-bold">Rp {card.balance.toLocaleString("id-ID")}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Dots */}
                <div className="flex justify-center gap-2 mt-4">
                    {cards.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveCard(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${activeCard === index ? "bg-primary" : "bg-slate-600"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="px-6 mb-6">
                <div className="grid grid-cols-4 gap-3">
                    {[
                        { icon: "send", label: "Transfer" },
                        { icon: "qr_code_scanner", label: "Scan" },
                        { icon: "payments", label: "Top Up" },
                        { icon: "more_horiz", label: "Lainnya" },
                    ].map((action) => (
                        <button
                            key={action.label}
                            className="bg-white dark:bg-card-dark rounded-xl p-4 flex flex-col items-center gap-2"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">{action.icon}</span>
                            </div>
                            <span className="text-xs font-medium">{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="px-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold">Transaksi Kartu</h2>
                    <Link to="/history" className="text-primary text-sm font-medium">Lihat Semua</Link>
                </div>
                <div className="space-y-3">
                    {transactions.map((t) => (
                        <div key={t.id} className="bg-white dark:bg-card-dark rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.amount > 0 ? "bg-emerald-500/10" : "bg-slate-100 dark:bg-slate-800"
                                    }`}>
                                    <span className={`material-symbols-outlined ${t.amount > 0 ? "text-emerald-500" : "text-slate-500"
                                        }`}>{t.icon}</span>
                                </div>
                                <div>
                                    <p className="font-semibold">{t.name}</p>
                                    <p className="text-slate-500 text-sm">{t.date}</p>
                                </div>
                            </div>
                            <p className={`font-bold ${t.amount > 0 ? "text-emerald-500" : ""}`}>
                                {t.amount > 0 ? "+" : ""}Rp {Math.abs(t.amount).toLocaleString("id-ID")}
                            </p>
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
