import { Link, useLocation } from "react-router-dom";

const navItems = [
    { icon: "grid_view", label: "Wallet", path: "/", filled: true },
    { icon: "analytics", label: "Stats", path: "/stats" },
    { spacer: true },
    { icon: "receipt_long", label: "Activity", path: "/history" },
    { icon: "settings", label: "Settings", path: "/settings" },
];

export default function BottomNav() {
    const location = useLocation();

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-[#101122]/80 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 px-6 py-3 flex justify-between items-center z-40">
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
                            : "text-slate-400 dark:text-slate-500 transition-colors active:text-primary"
                            }`}
                    >
                        <span
                            className="material-symbols-outlined"
                            style={
                                location.pathname === item.path && item.filled
                                    ? { fontVariationSettings: "'FILL' 1" }
                                    : {}
                            }
                        >
                            {item.icon}
                        </span>
                        <span className="text-[10px] font-bold">{item.label}</span>
                    </Link>
                )
            )}
        </div>
    );
}


