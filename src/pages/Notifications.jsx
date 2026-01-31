import { Link } from "react-router-dom";
import { useState } from "react";

const initialNotifications = [
    {
        id: 1,
        title: "Pengingat Harian",
        message: "Jangan lupa catat pengeluaranmu hari ini! Mencatat setiap hari membantu kamu melacak pola keuanganmu dengan lebih baik.",
        time: "Baru saja",
        type: "info",
        icon: "edit_note",
        color: "bg-blue-500",
        unread: true
    },
    {
        id: 2,
        title: "Peringatan Boros",
        message: "Pengeluaran kategori Makanan sudah mencapai 80% dari budget bulanan yang kamu tetapkan. Segera kurangi jajan di luar ya!",
        time: "2 jam yang lalu",
        type: "warning",
        icon: "warning",
        color: "bg-orange-500",
        unread: true
    },
    {
        id: 3,
        title: "Gaji Masuk!",
        message: "Pemasukan sebesar Rp 5.000.000 telah terdeteksi dari sumber 'Gaji'. Dana sudah ditambahkan ke saldo utama Anda.",
        time: "Kemarin",
        type: "success",
        icon: "account_balance_wallet",
        color: "bg-emerald-500",
        unread: false
    },
    {
        id: 4,
        title: "Update Aplikasi",
        message: "Versi 1.0.1 tersedia dengan fitur baru: Mode Gelap Otomatis dan Perbaikan Bug pada grafik mingguan. Silakan perbarui sekarang.",
        time: "Kemarin",
        type: "system",
        icon: "system_update",
        color: "bg-purple-500",
        unread: false
    }
];

export default function Notifications() {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [selectedNotification, setSelectedNotification] = useState(null);

    const handleNotificationClick = (id) => {
        const notification = notifications.find(n => n.id === id);
        setSelectedNotification(notification);

        // Mark as read
        if (notification.unread) {
            setNotifications(notifications.map(n =>
                n.id === id ? { ...n, unread: false } : n
            ));
        }
    };

    const handleMarkAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen pb-24 relative">
            {/* Header */}
            <div className="bg-gradient-to-b from-primary/20 to-transparent pt-8 pb-6 px-6">
                <div className="flex items-center gap-4 mb-6">
                    <Link to="/profile" className="w-10 h-10 flex items-center justify-center bg-white dark:bg-card-dark rounded-full shadow-sm text-slate-600 dark:text-slate-300">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h1 className="text-xl font-bold">Notifikasi</h1>
                </div>
            </div>

            {/* Notification List */}
            <div className="px-6 space-y-4">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification.id)}
                        className={`p-4 rounded-xl shadow-sm border flex gap-4 items-start relative overflow-hidden cursor-pointer active:scale-[0.98] transition-all ${notification.unread
                            ? "bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800"
                            : "bg-white dark:bg-card-dark border-slate-100 dark:border-slate-800"
                            }`}
                    >
                        {notification.unread && (
                            <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-sm shadow-red-500/50"></div>
                        )}

                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md ${notification.color} shrink-0`}>
                            <span className="material-symbols-outlined">{notification.icon}</span>
                        </div>
                        <div className="flex-1 pr-6">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className={`font-bold text-sm ${notification.unread ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}>
                                    {notification.title}
                                </h3>
                                <span className="text-[10px] text-slate-400 font-medium">{notification.time}</span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                                {notification.message}
                            </p>
                        </div>
                    </div>
                ))}

                <button
                    onClick={handleMarkAllRead}
                    className="w-full py-3 text-center text-xs font-bold text-slate-400 hover:text-primary transition-colors mt-4"
                >
                    Tandai semua sudah dibaca
                </button>
            </div>

            {/* Detail Modal */}
            {selectedNotification && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setSelectedNotification(null)}
                    ></div>

                    {/* Modal Content */}
                    <div className="bg-white dark:bg-[#1E1F30] w-full max-w-sm sm:rounded-2xl rounded-t-2xl p-6 relative z-10 animate-slide-up sm:animate-scale-in">
                        <button
                            onClick={() => setSelectedNotification(null)}
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>

                        <div className="flex flex-col items-center text-center mb-6">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl shadow-lg mb-4 ${selectedNotification.color}`}>
                                <span className="material-symbols-outlined">{selectedNotification.icon}</span>
                            </div>
                            <h2 className="text-xl font-bold mb-1">{selectedNotification.title}</h2>
                            <p className="text-xs text-slate-400">{selectedNotification.time}</p>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 mb-6">
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {selectedNotification.message}
                            </p>
                        </div>

                        <button
                            onClick={() => setSelectedNotification(null)}
                            className="w-full py-3.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 active:scale-95 transition-transform"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
