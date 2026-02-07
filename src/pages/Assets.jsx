import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import BottomNav from "../components/BottomNav";

const colorOptions = [
    { value: "bg-emerald-500", label: "Hijau" },
    { value: "bg-blue-600", label: "Biru" },
    { value: "bg-amber-500", label: "Kuning" },
    { value: "bg-red-500", label: "Merah" },
    { value: "bg-purple-500", label: "Ungu" },
    { value: "bg-pink-500", label: "Pink" },
    { value: "bg-orange-500", label: "Oranye" },
    { value: "bg-cyan-500", label: "Cyan" },
];

const ewalletOptions = [
    { name: "DANA", color: "bg-[#108EE9]", logo: "💳" },
    { name: "ShopeePay", color: "bg-[#EE4D2D]", logo: "🛍️" },
    { name: "GoPay", color: "bg-[#00AA13]", logo: "💚" },
    { name: "OVO", color: "bg-[#4C3494]", logo: "💜" },
    { name: "LinkAja", color: "bg-[#E31E25]", logo: "🔗" },
    { name: "QRIS", color: "bg-slate-700", logo: "📱" },
    { name: "Lainnya", color: "bg-slate-500", logo: "💰" },
];

const bankOptions = [
    { name: "BCA", color: "bg-blue-600" },
    { name: "BNI", color: "bg-orange-500" },
    { name: "Mandiri", color: "bg-blue-800" },
    { name: "BRI", color: "bg-blue-700" },
    { name: "CIMB Niaga", color: "bg-red-600" },
    { name: "Bank Jago", color: "bg-yellow-500" },
    { name: "Jenius", color: "bg-cyan-600" },
    { name: "Lainnya", color: "bg-slate-500" },
];

export default function Assets() {
    const {
        cashAssets,
        bankAccounts,
        eWallets,
        totalCash,
        totalBank,
        totalEwallet,
        totalAssets,
        addCashAsset,
        addBankAccount,
        addEWallet,
        updateCashAsset,
        updateBankAccount,
        updateEWallet,
        deleteCashAsset,
        deleteBankAccount,
        deleteEWallet,
    } = useData();

    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [showAddModal, setShowAddModal] = useState(null);
    const [editItem, setEditItem] = useState(null);

    // Form states
    const [formName, setFormName] = useState("");
    const [formAmount, setFormAmount] = useState("");
    const [formColor, setFormColor] = useState("bg-emerald-500");
    const [formAccountNumber, setFormAccountNumber] = useState("");

    const resetForm = () => {
        setFormName("");
        setFormAmount("");
        setFormColor("bg-emerald-500");
        setFormAccountNumber("");
    };

    const openAddModal = (type) => {
        resetForm();
        setShowAddModal(type);
    };

    const openEditModal = (type, item) => {
        setFormName(item.name);
        setFormAmount(item.amount.toString());
        setFormColor(item.color);
        setFormAccountNumber(item.accountNumber || "");
        setEditItem({ type, item });
    };

    const closeModals = () => {
        setShowAddModal(null);
        setEditItem(null);
        resetForm();
    };

    // ADD handlers
    const handleAddCash = () => {
        if (!formName || !formAmount) return;
        addCashAsset({
            name: formName,
            icon: "wallet",
            amount: parseInt(formAmount),
            color: formColor,
        });
        closeModals();
    };

    const handleAddBank = () => {
        if (!formName || !formAmount) return;
        const bankOption = bankOptions.find(b => b.name === formName);
        addBankAccount({
            name: formName,
            icon: "account_balance",
            accountNumber: formAccountNumber || "**** ****",
            amount: parseInt(formAmount),
            color: bankOption?.color || formColor,
        });
        closeModals();
    };

    const handleAddEwallet = () => {
        if (!formName || !formAmount) return;
        const ewalletOption = ewalletOptions.find(e => e.name === formName);
        addEWallet({
            name: formName,
            icon: "account_balance_wallet",
            amount: parseInt(formAmount),
            color: ewalletOption?.color || formColor,
            logo: ewalletOption?.logo || "💰",
        });
        closeModals();
    };

    // EDIT handlers
    const handleEditSave = () => {
        if (!editItem || !formAmount) return;
        const { type, item } = editItem;
        const updates = { amount: parseInt(formAmount) };

        if (type === "cash") {
            updates.name = formName || item.name;
            updates.color = formColor;
            updateCashAsset(item.id, updates);
        } else if (type === "bank") {
            updates.name = formName || item.name;
            updates.accountNumber = formAccountNumber || item.accountNumber;
            updateBankAccount(item.id, updates);
        } else if (type === "ewallet") {
            updateEWallet(item.id, updates);
        }
        closeModals();
    };

    // DELETE handlers
    const handleDelete = () => {
        if (!deleteConfirm) return;
        const { type, id } = deleteConfirm;
        if (type === "cash") deleteCashAsset(id);
        else if (type === "bank") deleteBankAccount(id);
        else if (type === "ewallet") deleteEWallet(id);
        setDeleteConfirm(null);
    };

    return (
        <>
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen pb-24">
                {/* Delete Confirmation Modal */}
                {deleteConfirm && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-card-dark rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                            <div className="w-14 h-14 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-red-500 text-3xl">delete</span>
                            </div>
                            <h3 className="text-lg font-bold text-center mb-2">Hapus Aset?</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6">
                                Apakah kamu yakin ingin menghapus <strong>{deleteConfirm.name}</strong>?
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 px-4 rounded-xl bg-slate-200 dark:bg-slate-700 font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                                    Batal
                                </button>
                                <button onClick={handleDelete} className="flex-1 py-3 px-4 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors">
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Cash Modal */}
                {showAddModal === "cash" && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-card-dark rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                            <h3 className="text-lg font-bold mb-4">Tambah Uang Tunai</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Nama</label>
                                    <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Contoh: Dompet, Celengan" className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary outline-none" />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Jumlah Saldo</label>
                                    <input type="number" value={formAmount} onChange={(e) => setFormAmount(e.target.value)} placeholder="0" className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary outline-none" />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Warna</label>
                                    <div className="flex gap-2 mt-2 flex-wrap">
                                        {colorOptions.map((c) => (
                                            <button key={c.value} onClick={() => setFormColor(c.value)} className={`w-8 h-8 rounded-full ${c.value} ${formColor === c.value ? "ring-2 ring-offset-2 ring-primary" : ""}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button onClick={closeModals} className="flex-1 py-3 px-4 rounded-xl bg-slate-200 dark:bg-slate-700 font-semibold">Batal</button>
                                <button onClick={handleAddCash} disabled={!formName || !formAmount} className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-semibold disabled:opacity-50">Simpan</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Bank Modal */}
                {showAddModal === "bank" && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-card-dark rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                            <h3 className="text-lg font-bold mb-4">Tambah Rekening Bank</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pilih Bank</label>
                                    <div className="grid grid-cols-4 gap-2 mt-2">
                                        {bankOptions.map((bank) => (
                                            <button key={bank.name} onClick={() => { setFormName(bank.name); setFormColor(bank.color); }} className={`p-2 rounded-xl text-xs font-semibold text-center transition-all ${formName === bank.name ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800"}`}>
                                                {bank.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Nomor Rekening (4 digit terakhir)</label>
                                    <input type="text" value={formAccountNumber} onChange={(e) => setFormAccountNumber(e.target.value)} placeholder="**** 1234" maxLength={9} className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary outline-none" />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Saldo</label>
                                    <input type="number" value={formAmount} onChange={(e) => setFormAmount(e.target.value)} placeholder="0" className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary outline-none" />
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button onClick={closeModals} className="flex-1 py-3 px-4 rounded-xl bg-slate-200 dark:bg-slate-700 font-semibold">Batal</button>
                                <button onClick={handleAddBank} disabled={!formName || !formAmount} className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-semibold disabled:opacity-50">Simpan</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add E-Wallet Modal */}
                {showAddModal === "ewallet" && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-card-dark rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                            <h3 className="text-lg font-bold mb-4">Tambah E-Wallet</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pilih E-Wallet</label>
                                    <div className="grid grid-cols-3 gap-2 mt-2">
                                        {ewalletOptions.map((ew) => (
                                            <button key={ew.name} onClick={() => { setFormName(ew.name); setFormColor(ew.color); }} className={`p-3 rounded-xl text-xs font-semibold text-center transition-all flex flex-col items-center gap-1 ${formName === ew.name ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800"}`}>
                                                <span className="text-xl">{ew.logo}</span>
                                                {ew.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Saldo</label>
                                    <input type="number" value={formAmount} onChange={(e) => setFormAmount(e.target.value)} placeholder="0" className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary outline-none" />
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button onClick={closeModals} className="flex-1 py-3 px-4 rounded-xl bg-slate-200 dark:bg-slate-700 font-semibold">Batal</button>
                                <button onClick={handleAddEwallet} disabled={!formName || !formAmount} className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-semibold disabled:opacity-50">Simpan</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Modal */}
                {editItem && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-card-dark rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                            <h3 className="text-lg font-bold mb-4">Edit {editItem.item.name}</h3>
                            <div className="space-y-4">
                                {editItem.type !== "ewallet" && (
                                    <div>
                                        <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Nama</label>
                                        <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary outline-none" />
                                    </div>
                                )}
                                {editItem.type === "bank" && (
                                    <div>
                                        <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Nomor Rekening</label>
                                        <input type="text" value={formAccountNumber} onChange={(e) => setFormAccountNumber(e.target.value)} className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary outline-none" />
                                    </div>
                                )}
                                <div>
                                    <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Saldo</label>
                                    <input type="number" value={formAmount} onChange={(e) => setFormAmount(e.target.value)} className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary outline-none" />
                                </div>
                                {editItem.type === "cash" && (
                                    <div>
                                        <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Warna</label>
                                        <div className="flex gap-2 mt-2 flex-wrap">
                                            {colorOptions.map((c) => (
                                                <button key={c.value} onClick={() => setFormColor(c.value)} className={`w-8 h-8 rounded-full ${c.value} ${formColor === c.value ? "ring-2 ring-offset-2 ring-primary" : ""}`} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button onClick={closeModals} className="flex-1 py-3 px-4 rounded-xl bg-slate-200 dark:bg-slate-700 font-semibold">Batal</button>
                                <button onClick={handleEditSave} disabled={!formAmount} className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-semibold disabled:opacity-50">Simpan</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Header */}
                <nav className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-4 flex items-center gap-3">
                    <h1 className="text-xl font-bold tracking-tight">Aset Saya</h1>
                </nav>

                <main className="max-w-md mx-auto space-y-6 px-4 pt-2">
                    {/* Total Assets Card */}
                    <div className="bg-gradient-to-br from-primary via-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl shadow-primary/20">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-white/80 text-sm font-medium">Total Aset</p>
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined">account_balance_wallet</span>
                            </div>
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight">
                            Rp {totalAssets.toLocaleString("id-ID")}
                        </h2>
                        <div className="flex gap-4 mt-4 pt-4 border-t border-white/20">
                            <div className="flex-1">
                                <p className="text-white/60 text-[10px] uppercase tracking-wider">Tunai</p>
                                <p className="text-sm font-bold">Rp {totalCash.toLocaleString("id-ID")}</p>
                            </div>
                            <div className="flex-1">
                                <p className="text-white/60 text-[10px] uppercase tracking-wider">Bank</p>
                                <p className="text-sm font-bold">Rp {totalBank.toLocaleString("id-ID")}</p>
                            </div>
                            <div className="flex-1">
                                <p className="text-white/60 text-[10px] uppercase tracking-wider">E-Wallet</p>
                                <p className="text-sm font-bold">Rp {totalEwallet.toLocaleString("id-ID")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Cash Section */}
                    <section className="space-y-3">
                        <div className="flex items-center justify-between px-1">
                            <h2 className="text-lg font-bold">Uang Tunai</h2>
                            <button onClick={() => openAddModal("cash")} className="text-primary text-sm font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity">
                                <span className="material-symbols-outlined text-lg">add_circle</span>
                                Tambah
                            </button>
                        </div>
                        <div className="space-y-2">
                            {cashAssets.length === 0 ? (
                                <p className="text-center text-slate-400 py-6 text-sm">Belum ada uang tunai</p>
                            ) : (
                                cashAssets.map((item) => (
                                    <div key={item.id} className="bg-white dark:bg-card-dark p-4 rounded-xl flex items-center justify-between shadow-sm border border-transparent hover:border-primary/30 transition-all group">
                                        <div className="flex items-center gap-4 cursor-pointer" onClick={() => openEditModal("cash", item)}>
                                            <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                                                <span className="material-symbols-outlined">{item.icon}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold">{item.name}</h3>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">Kas • Tap untuk edit</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold">Rp {item.amount.toLocaleString("id-ID")}</p>
                                            <button onClick={() => setDeleteConfirm({ type: "cash", id: item.id, name: item.name })} className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>

                    {/* Bank Section */}
                    <section className="space-y-3">
                        <div className="flex items-center justify-between px-1">
                            <h2 className="text-lg font-bold">Rekening Bank</h2>
                            <button onClick={() => openAddModal("bank")} className="text-primary text-sm font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity">
                                <span className="material-symbols-outlined text-lg">add_circle</span>
                                Tambah
                            </button>
                        </div>
                        <div className="space-y-2">
                            {bankAccounts.length === 0 ? (
                                <p className="text-center text-slate-400 py-6 text-sm">Belum ada rekening bank</p>
                            ) : (
                                bankAccounts.map((item) => (
                                    <div key={item.id} className="bg-white dark:bg-card-dark p-4 rounded-xl flex items-center justify-between shadow-sm border border-transparent hover:border-primary/30 transition-all group">
                                        <div className="flex items-center gap-4 cursor-pointer" onClick={() => openEditModal("bank", item)}>
                                            <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                                                <span className="material-symbols-outlined">{item.icon}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold">{item.name}</h3>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">{item.accountNumber}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold">Rp {item.amount.toLocaleString("id-ID")}</p>
                                            <button onClick={() => setDeleteConfirm({ type: "bank", id: item.id, name: item.name })} className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>

                    {/* E-Wallet Section */}
                    <section className="space-y-3">
                        <div className="flex items-center justify-between px-1">
                            <h2 className="text-lg font-bold">E-Wallet</h2>
                            <button onClick={() => openAddModal("ewallet")} className="text-primary text-sm font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity">
                                <span className="material-symbols-outlined text-lg">add_circle</span>
                                Tambah
                            </button>
                        </div>
                        <div className="space-y-2">
                            {eWallets.length === 0 ? (
                                <p className="text-center text-slate-400 py-6 text-sm">Belum ada e-wallet</p>
                            ) : (
                                eWallets.map((item) => (
                                    <div key={item.id} className="bg-white dark:bg-card-dark p-4 rounded-xl flex items-center justify-between shadow-sm border border-transparent hover:border-primary/30 transition-all group">
                                        <div className="flex items-center gap-4 cursor-pointer" onClick={() => openEditModal("ewallet", item)}>
                                            <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}>
                                                {item.logo}
                                            </div>
                                            <div>
                                                <h3 className="font-bold">{item.name}</h3>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">E-Wallet • Tap untuk edit</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold">Rp {item.amount.toLocaleString("id-ID")}</p>
                                            <button onClick={() => setDeleteConfirm({ type: "ewallet", id: item.id, name: item.name })} className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>

                    {/* Tips */}
                    <div className="bg-primary/10 rounded-xl p-4 flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-primary">lightbulb</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-sm text-primary">Tips</h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                Klik pada aset untuk mengedit saldo. Data tersimpan otomatis dan terhubung dengan transaksi.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
            <BottomNav />
        </>
    );
}
