import { useState } from "react";
import { useData } from "../context/DataContext";

export default function WeeklyChart() {
    const { weeklySpending, totalWeeklySpending } = useData();
    const [selectedDayIndex, setSelectedDayIndex] = useState(null);

    // Get max amount for scaling bars
    const maxAmount = Math.max(...weeklySpending.map(d => d.amount), 1);

    // Get current date range
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 6);
    const dateRange = `${weekAgo.toLocaleDateString("id-ID", { day: "numeric", month: "short" })} - ${today.toLocaleDateString("id-ID", { day: "numeric" })}`;

    // Determine what to display (Selected Day or Total Weekly)
    const displayAmount = selectedDayIndex !== null
        ? weeklySpending[selectedDayIndex].amount
        : totalWeeklySpending;

    const displayLabel = selectedDayIndex !== null
        ? `Pengeluaran ${weeklySpending[selectedDayIndex].day}`
        : "Total Pengeluaran (7 Hari)";

    return (
        <section className="px-4 py-6">
            <div className="bg-white dark:bg-card-dark rounded-xl p-5 border border-slate-200 dark:border-white/5">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium transition-all">
                            {displayLabel}
                        </h3>
                        <p className="text-2xl font-bold mt-1 transition-all key={displayAmount}">
                            Rp {displayAmount.toLocaleString("id-ID")}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full italic">
                            {dateRange}
                        </p>
                    </div>
                </div>
                <div className="flex items-end justify-between h-32 gap-2 mt-4 px-1">
                    {weeklySpending.map((item, index) => {
                        const height = maxAmount > 0 ? (item.amount / maxAmount) * 100 : 10;
                        const isToday = index === weeklySpending.length - 1;
                        const isSelected = selectedDayIndex === index;

                        return (
                            <div
                                key={item.day}
                                className="flex-1 flex flex-col items-center gap-2 cursor-pointer group"
                                onClick={() => setSelectedDayIndex(index === selectedDayIndex ? null : index)}
                            >
                                <div
                                    className="w-full bg-slate-100 dark:bg-white/5 rounded-t-lg relative transition-all duration-300"
                                    style={{ height: `${Math.max(height, 10)}%` }}
                                >
                                    <div
                                        className={`absolute inset-0 rounded-t-lg transition-all duration-300 ${isSelected
                                            ? "bg-primary shadow-[0_0_15px_rgba(100,103,242,0.6)]"
                                            : isToday
                                                ? "bg-primary/80"
                                                : "bg-primary/40 group-hover:bg-primary/60"
                                            }`}
                                    ></div>
                                </div>
                                <span
                                    className={`text-[10px] font-bold transition-colors ${isSelected || isToday ? "text-primary" : "text-slate-400 group-hover:text-slate-500"
                                        }`}
                                >
                                    {item.day}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

