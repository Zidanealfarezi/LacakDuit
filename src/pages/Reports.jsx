import { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { useData } from "../context/DataContext";

const timeframes = ["Minggu", "Bulan", "Tahun"];

const navItems = [
    { icon: "grid_view", label: "Wallet", path: "/" },
    { icon: "bar_chart", label: "Stats", path: "/stats" },
    { spacer: true },
    { icon: "receipt_long", label: "Activity", path: "/history" },
    { icon: "settings", label: "Settings", path: "/settings" },
];

export default function Reports() {
    const { transactions } = useData();
    const [activeTimeframe, setActiveTimeframe] = useState("Bulan");
    const [reportType, setReportType] = useState("expense"); // 'income' or 'expense'
    const location = useLocation();

    // Helper to get start date based on timeframe
    const getStartDate = (timeframe, date = new Date()) => {
        const d = new Date(date);
        if (timeframe === "Minggu") {
            const day = d.getDay() || 7; // Get current day number, converting Sun (0) to 7
            if (day !== 1) d.setHours(-24 * (day - 1)); // Set to previous Monday
        } else if (timeframe === "Bulan") {
            d.setDate(1);
        } else if (timeframe === "Tahun") {
            d.setMonth(0, 1);
        }
        d.setHours(0, 0, 0, 0);
        return d;
    };

    const processData = useMemo(() => {
        const now = new Date();
        const currentStartDate = getStartDate(activeTimeframe, now);

        // Calculate Previous Period Start Date
        const prevDate = new Date(currentStartDate);
        if (activeTimeframe === "Minggu") prevDate.setDate(prevDate.getDate() - 7);
        else if (activeTimeframe === "Bulan") prevDate.setMonth(prevDate.getMonth() - 1);
        else if (activeTimeframe === "Tahun") prevDate.setFullYear(prevDate.getFullYear() - 1);

        // Filter Transactions
        const currentPeriodTx = transactions.filter(t => {
            const tDate = new Date(t.date);
            return t.type === reportType && tDate >= currentStartDate && tDate <= now;
        });

        const prevPeriodTx = transactions.filter(t => {
            const tDate = new Date(t.date);
            // End of previous period is start of current period
            return t.type === reportType && tDate >= prevDate && tDate < currentStartDate;
        });

        // Calculate Totals
        const totalAmount = currentPeriodTx.reduce((sum, t) => sum + t.amount, 0);
        const prevTotalAmount = prevPeriodTx.reduce((sum, t) => sum + t.amount, 0);

        let percentageChange = 0;
        if (prevTotalAmount > 0) {
            percentageChange = ((totalAmount - prevTotalAmount) / prevTotalAmount) * 100;
        } else if (totalAmount > 0) {
            percentageChange = 100;
        }

        // Group by Category
        const categoryMap = {};
        currentPeriodTx.forEach(t => {
            if (!categoryMap[t.category]) {
                categoryMap[t.category] = {
                    name: t.category,
                    amount: 0,
                    icon: t.icon || "category",
                    color: t.color || "text-primary", // Fallback color logic might be needed if not properly saved
                    count: 0
                };
            }
            categoryMap[t.category].amount += t.amount;
            categoryMap[t.category].count += 1;
        });

        const categoryList = Object.values(categoryMap)
            .sort((a, b) => b.amount - a.amount)
            .map(cat => ({
                ...cat,
                percentage: totalAmount > 0 ? Math.round((cat.amount / totalAmount) * 100) : 0
            }));

        // Prepare Chart Data (Simplified for specific timeframe views)
        // For "Bulan" view, show daily or weekly bars? Or keep it simple with category breakdown?
        // The original design had a bar chart. Let's make a simple one based on the timeframe.
        let chartData = [];
        if (activeTimeframe === "Bulan") {
            // Show last 5 months for context? Or daily for current month?
            // Let's match the design: "Monthly Comparison" implies comparing months.
            // Let's generate data for the last 5 months including current
            for (let i = 4; i >= 0; i--) {
                const d = new Date();
                d.setDate(1);
                d.setMonth(d.getMonth() - i);
                const monthName = d.toLocaleDateString("id-ID", { month: "short" });
                const monthStart = new Date(d);
                const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0);

                const monthTotal = transactions
                    .filter(t => {
                        const tDate = new Date(t.date);
                        return t.type === reportType && tDate >= monthStart && tDate <= monthEnd;
                    })
                    .reduce((sum, t) => sum + t.amount, 0);

                chartData.push({
                    label: monthName,
                    value: monthTotal,
                    active: i === 0
                });
            }
        } else if (activeTimeframe === "Minggu") {
            // Show last 7 days
            for (let i = 6; i >= 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                const dayName = d.toLocaleDateString("id-ID", { weekday: "short" });
                const dayDateStr = d.toISOString().split('T')[0]; // Simple YYYY-MM-DD match

                // Note: transactions.date is YYYY-MM-DD string in local time from DataContext
                const dayTotal = transactions
                    .filter(t => t.type === reportType && t.date === dayDateStr)
                    .reduce((sum, t) => sum + t.amount, 0);

                chartData.push({
                    label: dayName,
                    value: dayTotal,
                    active: i === 0
                });
            }
        } else {
            // Tahun - Show last 5 years
            for (let i = 4; i >= 0; i--) {
                const d = new Date();
                d.setFullYear(d.getFullYear() - i);
                const year = d.getFullYear();

                const yearTotal = transactions
                    .filter(t => {
                        const tDate = new Date(t.date);
                        return t.type === reportType && tDate.getFullYear() === year;
                    })
                    .reduce((sum, t) => sum + t.amount, 0);

                chartData.push({
                    label: year.toString(),
                    value: yearTotal,
                    active: i === 0
                });
            }
        }

        // Normalize chart heights
        const maxVal = Math.max(...chartData.map(d => d.value), 1);
        chartData = chartData.map(d => ({
            ...d,
            height: Math.max(Math.round((d.value / maxVal) * 100), 10) // Min height 10%
        }));

        return {
            totalAmount,
            percentageChange,
            categoryList,
            chartData
        };

    }, [transactions, activeTimeframe, reportType]);

    // Donut Chart logic
    // We need to calculate stroke-dasharray and offsets for SVG circles
    // Circumference = 2 * pi * r. r=40 => C ~ 251.2
    const donutSegments = useMemo(() => {
        let cumulativePercent = 0;
        const radius = 40;
        const circumference = 2 * Math.PI * radius;

        // Take top 4 categories, others grouped? Or just top 4.
        const topCategories = processData.categoryList.slice(0, 4);

        return topCategories.map((cat, index) => {
            const strokeDasharray = `${(cat.percentage / 100) * circumference} ${circumference}`;
            const rotation = -90 + (cumulativePercent / 100) * 360;
            cumulativePercent += cat.percentage;

            // Assign colors cyclically
            const colors = ["#6467f2", "#0bda68", "#fa6938", "#fbbf24"];

            return {
                ...cat,
                color: colors[index % colors.length],
                strokeDasharray,
                rotation
            };
        });
    }, [processData.categoryList]);

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
                    {/* Income/Expense Toggle */}
                    <div className="flex bg-slate-200 dark:bg-card-dark p-1 rounded-xl">
                        <button
                            onClick={() => setReportType("expense")}
                            className={`flex-1 py-2 text-center rounded-lg text-sm font-bold transition-all ${reportType === "expense"
                                ? "bg-white dark:bg-primary text-primary dark:text-white shadow-sm"
                                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                }`}
                        >
                            Pengeluaran
                        </button>
                        <button
                            onClick={() => setReportType("income")}
                            className={`flex-1 py-2 text-center rounded-lg text-sm font-bold transition-all ${reportType === "income"
                                ? "bg-white dark:bg-primary text-primary dark:text-white shadow-sm"
                                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                }`}
                        >
                            Pemasukan
                        </button>
                    </div>

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
                                <div className="py-2 text-center rounded-lg text-sm font-semibold text-slate-500 dark:text-slate-400 peer-checked:bg-white dark:peer-checked:bg-slate-700 peer-checked:text-primary dark:peer-checked:text-white transition-all">
                                    {tf}
                                </div>
                            </label>
                        ))}
                    </div>

                    {/* Chart Section */}
                    <section className="bg-white dark:bg-card-dark rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                    Total {reportType === "expense" ? "Pengeluaran" : "Pemasukan"}
                                </h2>
                                <p className="text-2xl font-extrabold tracking-tight mt-1">
                                    Rp {processData.totalAmount.toLocaleString("id-ID")}
                                </p>
                            </div>
                            <div className={`px-2 py-1 rounded-lg flex items-center gap-1 ${processData.percentageChange >= 0
                                ? "bg-emerald-500/10 text-emerald-500"
                                : "bg-rose-500/10 text-rose-500"
                                }`}>
                                <span className="material-symbols-outlined text-xs font-bold">
                                    {processData.percentageChange >= 0 ? "trending_up" : "trending_down"}
                                </span>
                                <span className="text-xs font-bold">
                                    {Math.abs(processData.percentageChange).toFixed(1)}%
                                </span>
                            </div>
                        </div>
                        <div className="flex items-end justify-between h-32 gap-3 px-1">
                            {processData.chartData.map((item, index) => (
                                <div
                                    key={index}
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
                                                }`}
                                        ></div>
                                    </div>
                                    <span
                                        className={`text-[10px] font-bold uppercase tracking-widest ${item.active ? "text-primary" : "text-slate-400"
                                            }`}
                                    >
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Comparison / Breakdown */}
                    <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-4">
                        <h2 className="text-lg font-bold px-1">Rincian {reportType === "expense" ? "Pengeluaran" : "Pemasukan"}</h2>

                        {processData.totalAmount === 0 ? (
                            <div className="py-10 text-center text-slate-400">
                                <span className="material-symbols-outlined text-4xl mb-2">bar_chart</span>
                                <p>Belum ada data transaksi</p>
                            </div>
                        ) : (
                            <>
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
                                                {donutSegments.map((segment, index) => (
                                                    <circle
                                                        key={`segment-${index}`}
                                                        className="donut-segment transition-all duration-1000 ease-out"
                                                        cx="50"
                                                        cy="50"
                                                        fill="transparent"
                                                        r="40"
                                                        stroke={segment.color}
                                                        strokeDasharray={segment.strokeDasharray}
                                                        strokeDashoffset="157" // Start from top? Logic for offset needs to be precise relative to circumference
                                                        // Actually, with transform rotate, we just need simplified offset?
                                                        // Let's rely on dasharray + rotation for simplicity in this SVG method
                                                        strokeWidth="12"
                                                        style={{
                                                            strokeDashoffset: 0, // Reset to 0 since we control length via dasharray
                                                            transform: `rotate(${segment.rotation}deg)`,
                                                            transformOrigin: "50% 50%"
                                                        }}
                                                    />
                                                ))}
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                                    Total
                                                </span>
                                                <span className="text-xl font-extrabold tracking-tight">
                                                    {processData.totalAmount >= 1000000
                                                        ? `Rp ${(processData.totalAmount / 1000000).toFixed(1)}M`
                                                        : `Rp ${processData.totalAmount.toLocaleString("id-ID")}`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Chart Legend */}
                                    <div className="grid grid-cols-2 gap-3">
                                        {donutSegments.map((cat, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                                                <span className="text-xs text-slate-600 dark:text-slate-400 truncate max-w-[80px]">{cat.name}</span>
                                                <span className="text-xs font-bold ml-auto">{cat.percentage}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Detailed List */}
                                <div className="space-y-3 mt-4">
                                    {processData.categoryList.map((cat) => (
                                        <div
                                            key={cat.name}
                                            className="bg-white dark:bg-card-dark p-4 rounded-xl flex items-center justify-between shadow-sm border border-transparent hover:border-primary/30 transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center ${cat.color}`}
                                                >
                                                    <span className="material-symbols-outlined">
                                                        {cat.icon}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-sm">{cat.name}</h3>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                                        {cat.percentage}% of total
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold">Rp {cat.amount.toLocaleString("id-ID")}</p>
                                                <p className="text-[10px] font-bold text-slate-400">
                                                    {cat.count} Transaksi
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                    </div>

                    {/* Saving Insight (Hidden for now as it needs real logic) */}
                    {/* <div className="bg-primary rounded-xl p-5 text-white flex items-center justify-between shadow-lg shadow-primary/20">
                        <div className="space-y-1">
                            <h3 className="font-bold text-sm">Wawasan Hemat</h3>
                            <p className="text-xs opacity-90">
                                Pengeluaran makan Anda lebih hemat Rp 350.000 dibanding bulan lalu. Pertahankan!
                            </p>
                        </div>
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined">lightbulb</span>
                        </div>
                    </div> */}
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

