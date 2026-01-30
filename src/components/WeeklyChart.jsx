import { useData } from "../context/DataContext";

export default function WeeklyChart() {
    const { weeklySpending, totalWeeklySpending } = useData();

    // Get max amount for scaling bars
    const maxAmount = Math.max(...weeklySpending.map(d => d.amount), 1);

    // Get current date range
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 6);
    const dateRange = `${weekAgo.toLocaleDateString("id-ID", { day: "numeric", month: "short" })} - ${today.toLocaleDateString("id-ID", { day: "numeric" })}`;

    return (
        <section className="px-4 py-6">
            <div className="bg-white dark:bg-card-dark rounded-xl p-5 border border-slate-200 dark:border-white/5">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                            Weekly Spending
                        </h3>
                        <p className="text-2xl font-bold mt-1">Rp {totalWeeklySpending.toLocaleString("id-ID")}</p>
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

                        return (
                            <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full bg-slate-100 dark:bg-white/5 rounded-t-lg relative"
                                    style={{ height: `${Math.max(height, 10)}%` }}
                                >
                                    <div
                                        className={`absolute inset-0 rounded-t-lg ${isToday
                                            ? "bg-primary shadow-[0_0_15px_rgba(100,103,242,0.4)]"
                                            : height > 50
                                                ? "bg-primary/60"
                                                : "bg-primary/40"
                                            }`}
                                    ></div>
                                </div>
                                <span
                                    className={`text-[10px] font-bold ${isToday ? "text-primary" : "text-slate-400"
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

