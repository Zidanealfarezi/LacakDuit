import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
    { icon: "grid_view", label: "Dashboard", path: "/" },
    { icon: "analytics", label: "Stats", path: "/stats" },
    { spacer: true },
    { icon: "account_balance_wallet", label: "Aset Saya", path: "/assets" },
    { icon: "settings", label: "Settings", path: "/settings" },
];

export default function Settings() {
    const location = useLocation();
    const [darkMode, setDarkMode] = useState(() => {
        return document.documentElement.classList.contains("dark");
    });
    const [notifications, setNotifications] = useState(true);
    const [biometric, setBiometric] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const Toggle = ({ enabled, onChange }) => (
        <button
            onClick={onChange}
            className={`w-12 h-7 rounded-full p-1 transition-colors ${enabled ? "bg-primary" : "bg-slate-300 dark:bg-slate-600"
                }`}
        >
            <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${enabled ? "translate-x-5" : ""
                }`}></div>
        </button>
    );

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen pb-24">
            {/* Header */}
            <div className="px-6 pt-8 pb-4">
                <h1 className="text-xl font-bold">Pengaturan</h1>
            </div>

            {/* Settings Sections */}
            <div className="px-6 space-y-6">
                {/* Appearance */}
                <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">
                        Tampilan
                    </h3>
                    <div className="bg-white dark:bg-card-dark rounded-xl overflow-hidden shadow-sm">
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">dark_mode</span>
                                <span className="font-medium">Mode Gelap</span>
                            </div>
                            <Toggle enabled={darkMode} onChange={() => setDarkMode(!darkMode)} />
                        </div>
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">language</span>
                                <span className="font-medium">Bahasa</span>
                            </div>
                            <span className="text-slate-500 text-sm">Indonesia</span>
                        </div>
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">currency_exchange</span>
                                <span className="font-medium">Mata Uang</span>
                            </div>
                            <span className="text-slate-500 text-sm">IDR (Rp)</span>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">
                        Notifikasi
                    </h3>
                    <div className="bg-white dark:bg-card-dark rounded-xl overflow-hidden shadow-sm">
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">notifications</span>
                                <span className="font-medium">Push Notification</span>
                            </div>
                            <Toggle enabled={notifications} onChange={() => setNotifications(!notifications)} />
                        </div>
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">mail</span>
                                <span className="font-medium">Email Digest</span>
                            </div>
                            <span className="text-slate-500 text-sm">Mingguan</span>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">
                        Keamanan
                    </h3>
                    <div className="bg-white dark:bg-card-dark rounded-xl overflow-hidden shadow-sm">
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">fingerprint</span>
                                <span className="font-medium">Login Biometrik</span>
                            </div>
                            <Toggle enabled={biometric} onChange={() => setBiometric(!biometric)} />
                        </div>
                        <button className="w-full flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">lock</span>
                                <span className="font-medium">Ubah Password</span>
                            </div>
                            <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                        </button>
                        <button className="w-full flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">key</span>
                                <span className="font-medium">Ubah PIN</span>
                            </div>
                            <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                        </button>
                    </div>
                </div>

                {/* About */}
                <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">
                        Tentang
                    </h3>
                    <div className="bg-white dark:bg-card-dark rounded-xl overflow-hidden shadow-sm">
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">info</span>
                                <span className="font-medium">Versi Aplikasi</span>
                            </div>
                            <span className="text-slate-500 text-sm">1.0.0</span>
                        </div>
                        <Link to="/terms" className="w-full flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">description</span>
                                <span className="font-medium">Syarat & Ketentuan</span>
                            </div>
                            <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                        </Link>
                        <button className="w-full flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">policy</span>
                                <span className="font-medium">Kebijakan Privasi</span>
                            </div>
                            <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                        </button>
                    </div>
                </div>

                {/* Logout */}
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
    );
}
