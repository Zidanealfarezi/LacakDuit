import { Link, useLocation } from "react-router-dom";
import { useData } from "../context/DataContext";
import PageTransition from "../components/PageTransition";

const menuItems = [
    { icon: "person", label: "Edit Profil", path: "/profile/edit" },
    { icon: "notifications", label: "Notifikasi", path: "/notifications" },
    { icon: "lock", label: "Keamanan", path: "/settings" },
    { icon: "settings", label: "Pengaturan", path: "/settings" },
];

const navItems = [
    { icon: "grid_view", label: "Dashboard", path: "/" },
    { icon: "analytics", label: "Stats", path: "/stats" },
    { spacer: true },
    { icon: "account_balance_wallet", label: "Aset Saya", path: "/assets" },
    { icon: "settings", label: "Settings", path: "/settings" },
];

export default function Profile() {
    const location = useLocation();
    const { userProfile } = useData();

    // Get initials from name
    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <PageTransition>
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen pb-24">
                {/* Header */}
                <div className="bg-gradient-to-b from-primary/20 to-transparent pt-8 pb-12 px-6">
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-xl font-bold">Profil</h1>
                        <Link to="/settings" className="text-slate-400 hover:text-white">
                            <span className="material-symbols-outlined">settings</span>
                        </Link>
                    </div>

                    {/* Profile Card */}
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-primary/30 overflow-hidden">
                            {userProfile.profileImage ? (
                                <img src={userProfile.profileImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                getInitials(userProfile.name)
                            )}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{userProfile.name}</h2>
                            <p className="text-slate-400 text-sm">{userProfile.email}</p>
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="px-6 -mt-4">
                    <div className="bg-white dark:bg-card-dark rounded-xl p-4 shadow-sm flex justify-around">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-primary">156</p>
                            <p className="text-xs text-slate-500">Transaksi</p>
                        </div>
                        <div className="w-px bg-slate-200 dark:bg-slate-700"></div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-emerald-500">12</p>
                            <p className="text-xs text-slate-500">Kategori</p>
                        </div>
                        <div className="w-px bg-slate-200 dark:bg-slate-700"></div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-orange-500">3</p>
                            <p className="text-xs text-slate-500">Bulan</p>
                        </div>
                    </div>
                </div>

                {/* Menu */}
                <div className="px-6 py-6 space-y-4">
                    <div className="bg-white dark:bg-card-dark rounded-xl overflow-hidden shadow-sm">
                        {menuItems.map((item, index) => (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={`w-full flex items-center justify-between p-4 ${index !== menuItems.length - 1
                                    ? "border-b border-slate-100 dark:border-slate-800"
                                    : ""
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">
                                        {item.icon}
                                    </span>
                                    <span className="font-medium">{item.label}</span>
                                </div>
                                <span className="material-symbols-outlined text-slate-400">
                                    chevron_right
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Logout Button */}
                    <Link
                        to="/login"
                        className="flex items-center justify-center gap-2 w-full p-4 bg-red-500/10 text-red-500 rounded-xl font-bold hover:bg-red-500/20 transition-colors"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        Keluar
                    </Link>
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
        </PageTransition>
    );
}
