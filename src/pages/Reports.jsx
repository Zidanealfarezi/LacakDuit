import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PageTransition from "../components/PageTransition";

const timeframes = ["Minggu", "Bulan", "Tahun"];

const chartData = [
    { month: "Mar", height: 60, active: false },
    { month: "Apr", height: 85, active: false },
    { month: "Mei", height: 70, active: false },
    { month: "Jun", height: 100, active: true },
    { month: "Jul", height: 40, active: false },
];

const expenses = [
    {
        icon: "home",
        name: "Housing",
        percentage: "38% of total spend",
        amount: "Rp 3.350.000",
        change: "+2.4%",
        changeColor: "text-emerald-500",
        iconBg: "bg-primary/10",
        iconColor: "text-primary",
    },
    {
        icon: "restaurant",
        name: "Food & Drinks",
        percentage: "25% of total spend",
        amount: "Rp 2.200.000",
        change: "-1.2%",
        changeColor: "text-rose-500",
        iconBg: "bg-emerald-500/10",
        iconColor: "text-emerald-500",
    },
    {
        icon: "receipt_long",
        name: "Bills",
        percentage: "19% of total spend",
        amount: "Rp 1.650.000",
        change: "Stable",
        changeColor: "text-slate-400",
        iconBg: "bg-orange-500/10",
        iconColor: "text-orange-500",
    },
    {
        icon: "sports_esports",
        name: "Entertainment",
        percentage: "18% of total spend",
        amount: "Rp 1.600.000",
        change: "+5.1%",
        changeColor: "text-emerald-500",
        iconBg: "bg-amber-500/10",
        iconColor: "text-amber-500",
    },
];

const navItems = [
    { icon: "grid_view", label: "Wallet", path: "/" },
    { icon: "bar_chart", label: "Stats", path: "/stats" },
    { spacer: true },
    { icon: "receipt_long", label: "Activity", path: "/history" },
    { icon: "settings", label: "Settings", path: "/settings" },
];

export default function Reports() {
    const [activeTimeframe, setActiveTimeframe] = useState("Month");
    const location = useLocation();

    return (
        <PageTransition>
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen pb-12">
                {/* Header */}
                <nav className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary font-bold">
                            analytics
                        </span>
                        <h1 className="text-xl font-bold tracking-tight">Laporan</h1>
                    </div>
                    <button className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-full flex items-center gap-2 transition-colors">
                        <span className="material-symbols-outlined text-sm font-bold">
                            ios_share
                        </span>
                        <span className="text-sm font-bold">Ekspor</span>
                    </button>
                </nav>

                <main className="max-w-md mx-auto space-y-6 px-4 pt-2">
                    {/* Timeframe Selector */}
                    <div className="flex bg-slate-200 dark:bg-card-dark p-1 rounded-xl">
                        {timeframes.map((tf) => (
                            <label key={tf} className="flex-1 cursor-pointer">
                                <input
                                    className="hidden peer"
                                    name="timeframe"
                                    type="radio"
                                    value={tf}
                                    checked={activeTimeframe === tf}
                                    onChange={() => setActiveTimeframe(tf)}
                                />
                                <div className="py-2 text-center rounded-lg text-sm font-semibold text-slate-500 dark:text-slate-400 peer-checked:bg-white dark:peer-checked:bg-primary peer-checked:text-primary dark:peer-checked:text-white transition-all">
                                    {tf}
                                </div>
                            </label>
                        ))}
                    </div>

                    {/* Monthly Comparison Chart */}
                    <section className="bg-white dark:bg-card-dark rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                    Perbandingan Bulanan
                                </h2>
                                <p className="text-2xl font-extrabold tracking-tight mt-1">
                                    Rp 12.850.000
                                </p>
                            </div>
                            <div className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-lg flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs font-bold">
                                    trending_up
                                </span>
                                <span className="text-xs font-bold">+12%</span>
                            </div>
                        </div>
                        <div className="flex items-end justify-between h-32 gap-3 px-1">
                            {chartData.map((item) => (
                                <div
                                    key={item.month}
                                    className="flex-1 flex flex-col items-center gap-2"
                                >
                                    <div
                                        className={`w-full rounded-t-md relative overflow-hidden ${item.active
                                            ? "bg-primary/20"
                                            : "bg-slate-100 dark:bg-slate-800"
                                            }`}
                                        style={{ height: `${item.height}%` }}
                                    >
                                        <div
                                            className={`absolute bottom-0 w-full h-full ${item.active
                                                ? "bg-primary"
                                                : "bg-slate-300 dark:bg-slate-700"
                                                } ${!item.active && item.height === 40 ? "opacity-50" : ""}`}
                                        ></div>
                                    </div>
                                    <span
                                        className={`text-[10px] font-bold uppercase tracking-widest ${item.active ? "text-primary" : "text-slate-400"
                                            }`}
                                    >
                                        {item.month}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Expense Breakdown */}
                    <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-4">
                        <h2 className="text-lg font-bold px-1">Rincian Pengeluaran</h2>

                        {/* Donut Chart */}
                        <div className="bg-white dark:bg-card-dark rounded-xl p-6 shadow-sm">
                            {/* Chart */}
                            <div className="flex justify-center mb-6">
                                <div className="relative w-64 h-64">
                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <circle
                                            className="text-slate-100 dark:text-slate-800"
                                            cx="50"
                                            cy="50"
                                            fill="transparent"
                                            r="40"
                                            stroke="currentColor"
                                            strokeWidth="12"
                                        />
                                        <circle
                                            className="donut-segment"
                                            cx="50"
                                            cy="50"
                                            fill="transparent"
                                            r="40"
                                            stroke="#6467f2"
                                            strokeDasharray="251.2"
                                            strokeDashoffset="155.7"
                                            strokeWidth="12"
                                            style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
                                        />
                                        <circle
                                            className="donut-segment"
                                            cx="50"
                                            cy="50"
                                            fill="transparent"
                                            r="40"
                                            stroke="#0bda68"
                                            strokeDasharray="251.2"
                                            strokeDashoffset="188.4"
                                            strokeWidth="12"
                                            style={{ transform: "rotate(-43.2deg)", transformOrigin: "50% 50%" }}
                                        />
                                        <circle
                                            className="donut-segment"
                                            cx="50"
                                            cy="50"
                                            fill="transparent"
                                            r="40"
                                            stroke="#fa6938"
                                            strokeDasharray="251.2"
                                            strokeDashoffset="203.4"
                                            strokeWidth="12"
                                            style={{ transform: "rotate(46.8deg)", transformOrigin: "50% 50%" }}
                                        />
                                        <circle
                                            className="donut-segment"
                                            cx="50"
                                            cy="50"
                                            fill="transparent"
                                            r="40"
                                            stroke="#fbbf24"
                                            strokeDasharray="251.2"
                                            strokeDashoffset="206.0"
                                            strokeWidth="12"
                                            style={{ transform: "rotate(115.2deg)", transformOrigin: "50% 50%" }}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                            Total
                                        </span>
                                        <span className="text-2xl font-extrabold tracking-tight">
                                            Rp 8.8M
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Chart Legend */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#6467f2]"></div>
                                    <span className="text-xs text-slate-600 dark:text-slate-400">Housing</span>
                                    <span className="text-xs font-bold ml-auto">38%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#0bda68]"></div>
                                    <span className="text-xs text-slate-600 dark:text-slate-400">Food</span>
                                    <span className="text-xs font-bold ml-auto">25%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#fa6938]"></div>
                                    <span className="text-xs text-slate-600 dark:text-slate-400">Bills</span>
                                    <span className="text-xs font-bold ml-auto">19%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#fbbf24]"></div>
                                    <span className="text-xs text-slate-600 dark:text-slate-400">Entertainment</span>
                                    <span className="text-xs font-bold ml-auto">18%</span>
                                </div>
                            </div>
                        </div>

                        {/* Expense List */}
                        <div className="space-y-3">
                            {expenses.map((expense) => (
                                <div
                                    key={expense.name}
                                    className="bg-white dark:bg-card-dark p-4 rounded-xl flex items-center justify-between shadow-sm border border-transparent hover:border-primary/30 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-10 h-10 rounded-lg ${expense.iconBg} flex items-center justify-center ${expense.iconColor}`}
                                        >
                                            <span className="material-symbols-outlined">
                                                {expense.icon}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm">{expense.name}</h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                {expense.percentage}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold">{expense.amount}</p>
                                        <p className={`text-[10px] font-bold ${expense.changeColor}`}>
                                            {expense.change}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Saving Insight */}
                    <div className="bg-primary rounded-xl p-5 text-white flex items-center justify-between shadow-lg shadow-primary/20">
                        <div className="space-y-1">
                            <h3 className="font-bold text-sm">Wawasan Hemat</h3>
                            <p className="text-xs opacity-90">
                                Pengeluaran makan Anda lebih hemat Rp 350.000 dibanding bulan lalu. Pertahankan!
                            </p>
                        </div>
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined">lightbulb</span>
                        </div>
                    </div>
                </main>

                {/* Bottom Navigation */}
                <div className="fixed bottom-0 left-0 right-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-8 py-3 flex justify-between items-center z-50">
                    {navItems.map((item, index) =>
                        item.spacer ? (
                            <Link
                                key={index}
                                to="/add"
                                className="bg-primary w-12 h-12 -mt-10 rounded-full shadow-lg shadow-primary/40 flex items-center justify-center text-white border-4 border-background-light dark:border-background-dark"
                            >
                                <span className="material-symbols-outlined font-bold">add</span>
                            </Link>
                        ) : (
                            <Link
                                key={index}
                                to={item.path}
                                className={`flex flex-col items-center gap-1 ${location.pathname === item.path
                                    ? "text-primary"
                                    : "text-slate-400"
                                    }`}
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                <span className="text-[10px] font-bold">{item.label}</span>
                            </Link>
                        )
                    )}
                </div>
            </div>
        </PageTransition>
    );
}

