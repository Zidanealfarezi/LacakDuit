import { Link, useLocation } from "react-router-dom";

const navItems = [
    { icon: "home", label: "Beranda", path: "/" },
    { icon: "receipt_long", label: "Riwayat", path: "/history", filled: true },
    { spacer: true },
    { icon: "insights", label: "Analisis", path: "/analytics" },
    { icon: "person", label: "Profil", path: "/profile" },
];

export default function HistoryBottomNav() {
    const location = useLocation();

    return (
        <>
            <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-background-dark/80 ios-blur border-t border-slate-200 dark:border-white/10 px-6 py-3 pb-8 flex justify-between items-center z-50">
                {navItems.map((item, index) =>
                    item.spacer ? (
                        <div key={index} className="relative -top-8">
                            <Link to="/add" className="bg-primary text-white size-14 rounded-full flex items-center justify-center shadow-lg shadow-primary/40 ring-4 ring-background-light dark:ring-background-dark">
                                <span className="material-symbols-outlined text-3xl">add</span>
                            </Link>
                        </div>
                    ) : (
                        <Link
                            key={index}
                            to={item.path}
                            className={`flex flex-col items-center gap-1 ${location.pathname === item.path
                                ? "text-primary"
                                : "text-slate-400"
                                }`}
                        >
                            <span
                                className="material-symbols-outlined text-2xl"
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
            </nav>
            <div className="fixed bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-300 dark:bg-white/20 rounded-full z-[60]"></div>
        </>
    );
}
