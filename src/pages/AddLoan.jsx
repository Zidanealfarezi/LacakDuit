import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function AddLoan() {
    const navigate = useNavigate();
    const { addLoan, getAllAssets, loans } = useData();

    const [type, setType] = useState("paylater"); // paylater, cash
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(""); // This is Principal (Total Hutang Pokok)
    const [receivedAmount, setReceivedAmount] = useState(""); // Nominal Diterima (Real Cash)
    const [monthlyAmount, setMonthlyAmount] = useState(""); // New state for Installment
    const [tenor, setTenor] = useState("");
    const [startDate, setStartDate] = useState(""); // Full Start Date (YYYY-MM-DD)
    const [showDatePicker, setShowDatePicker] = useState(false); // Toggle custom date picker implementation
    const [note, setNote] = useState(""); // Note state
    const [targetAsset, setTargetAsset] = useState(null);
    const [showAssets, setShowAssets] = useState(false);

    // PayLater Providers
    const [provider, setProvider] = useState(null);
    const [showProviders, setShowProviders] = useState(false);

    const payLaterProviders = [
        { id: "spaylater", name: "SPayLater", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500" },
        { id: "gopaylater", name: "GoPay Later", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500" },
        { id: "traveloka", name: "Traveloka PayLater", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500" },
        { id: "lazpaylater", name: "LazPayLater", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500" },
        { id: "blipaylater", name: "Blibli PayLater", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400" },
        { id: "tiktok", name: "TikTok PayLater", color: "text-slate-900 dark:text-white", bg: "bg-slate-500/10", border: "border-slate-500" },
        { id: "kredivo", name: "Kredivo", color: "text-orange-600", bg: "bg-orange-600/10", border: "border-orange-600" },
        { id: "other", name: "Lainnya", color: "text-slate-500", bg: "bg-slate-500/10", border: "border-slate-500" }
    ];

    const cashLoanProviders = [
        { id: "spinjam", name: "SPinjam", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500" },
        { id: "gopaypinjam", name: "GoPay Pinjam", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500" },
        { id: "lazbon", name: "LazBon", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500" },
        { id: "akulaku", name: "Akulaku", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500" },
        { id: "kredivo", name: "Kredivo", color: "text-orange-600", bg: "bg-orange-600/10", border: "border-orange-600" },
        { id: "kreditpintar", name: "Kredit Pintar", color: "text-blue-600", bg: "bg-blue-600/10", border: "border-blue-600" },
        { id: "other", name: "Lainnya", color: "text-slate-500", bg: "bg-slate-500/10", border: "border-slate-500" }
    ];

    const allAssets = getAllAssets();

    const formatAmount = (value) => {
        const num = value.replace(/\D/g, "");
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleAmountChange = (e) => {
        setAmount(formatAmount(e.target.value));
    };

    const handleReceivedAmountChange = (e) => {
        setReceivedAmount(formatAmount(e.target.value));
    };

    const handleMonthlyChange = (e) => {
        setMonthlyAmount(formatAmount(e.target.value));
    };

    const handleSave = () => {
        if (!name || !amount || !tenor || !monthlyAmount || !note || !startDate) return;
        if (note.length < 15) return;
        if (type === "cash" && (!targetAsset || !receivedAmount)) return;
        if (!provider) return;

        const numPrincipal = parseInt(amount.replace(/\./g, ""), 10);
        const numReceived = receivedAmount ? parseInt(receivedAmount.replace(/\./g, ""), 10) : 0;
        const numMonthly = parseInt(monthlyAmount.replace(/\./g, ""), 10);
        const numTenor = parseInt(tenor, 10);

        addLoan({
            type,
            name,
            note,
            startDate, // Save full start date
            dueDate: new Date(startDate).getDate(), // Derived day for legacy support
            provider: provider,
            principalAmount: numPrincipal,
            receivedAmount: type === "cash" ? numReceived : 0,
            monthlyInstallment: numMonthly,
            totalRepayment: numMonthly * numTenor,
            tenor: numTenor,
            targetAssetId: targetAsset?.id,
            targetAssetType: targetAsset?.assetType
        });

        navigate("/loans");
    };

    const getAssetIcon = (asset) => {
        if (asset.assetType === "ewallet") return asset.logo;
        if (asset.assetType === "bank") return "bank"; // Material symbol for bank
        return "payments"; // Material symbol for cash
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen flex flex-col">
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3">
                <Link
                    to="/loans"
                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                    <span className="material-symbols-outlined text-2xl">close</span>
                </Link>
                <h1 className="text-lg font-bold">Tambah Cicilan Baru</h1>
                <div className="w-10 h-10"></div>
            </div>

            {/* Type Toggle */}
            <div className="px-6 py-4">
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-full">
                    <button
                        onClick={() => { setType("paylater"); setProvider(null); }}
                        className={`flex-1 py-2.5 text-center rounded-full text-sm font-semibold transition-all ${type === "paylater"
                            ? "bg-white shadow-sm text-primary dark:bg-card-dark"
                            : "text-slate-500 hover:bg-white/50 dark:hover:bg-white/5"
                            }`}
                    >
                        Paylater Barang
                    </button>
                    <button
                        onClick={() => { setType("cash"); setProvider(null); }}
                        className={`flex-1 py-2.5 text-center rounded-full text-sm font-semibold transition-all ${type === "cash"
                            ? "bg-white shadow-sm text-emerald-500 dark:bg-card-dark"
                            : "text-slate-500 hover:bg-white/50 dark:hover:bg-white/5"
                            }`}
                    >
                        Pinjaman Uang
                    </button>
                </div>
                <p className="text-xs text-slate-500 text-center mt-3 px-4">
                    {type === "paylater"
                        ? "Mencatat hutang barang/jasa. Tidak menambah saldo dompet."
                        : "Mencatat pinjaman tunai. Akan menambah saldo dompet Anda."}
                </p>
            </div>

            <div className="flex-1 overflow-y-auto pb-6">
                <div className="px-6 space-y-6">
                    {/* Provider Selection (For Both Types) */}
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">
                            {type === "paylater" ? "Layanan PayLater" : "Penyedia Pinjaman"}
                        </p>
                        <button
                            onClick={() => setShowProviders(!showProviders)}
                            className={`w-full bg-slate-100 dark:bg-slate-800/50 border ${provider ? provider.border : "border-slate-200 dark:border-slate-700"} rounded-xl p-4 flex items-center justify-between transition-colors`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={`material-symbols-outlined text-xl ${provider ? provider.color : "text-slate-400"}`}>
                                    credit_score
                                </span>
                                <span className={provider ? "text-slate-900 dark:text-white font-medium" : "text-slate-400"}>
                                    {provider ? provider.name : "Pilih Layanan"}
                                </span>
                            </div>
                            <span className="material-symbols-outlined text-slate-500">expand_more</span>
                        </button>

                        {showProviders && (
                            <div className="mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 p-2 overflow-hidden animate-slide-up grid grid-cols-2 gap-2">
                                {(type === "paylater" ? payLaterProviders : cashLoanProviders).map((prov) => (
                                    <button
                                        key={prov.id}
                                        onClick={() => {
                                            setProvider(prov);
                                            setShowProviders(false);
                                        }}
                                        className={`flex items-center gap-2 p-3 rounded-lg transition-colors text-left ${provider?.id === prov.id ? prov.bg + " border " + prov.border : "hover:bg-slate-50 dark:hover:bg-slate-700 border border-transparent"}`}
                                    >
                                        <span className={`w-2 h-2 rounded-full ${prov.color.replace("text-", "bg-")}`}></span>
                                        <span className={`text-sm font-medium ${prov.color}`}>{prov.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Name */}
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Nama Cicilan</p>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Contoh: HP Samsung, Pinjam Budi"
                            className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 font-medium outline-none focus:border-primary transition-colors"
                        />
                    </div>

                    {/* Principal Amount (Total Hutang) */}
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">
                            {type === "paylater" ? "Harga Barang (Pokok Hutang)" : "Nominal Pengajuan (Total Hutang)"}
                        </p>
                        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus-within:border-primary transition-colors">
                            <span className="text-slate-500 font-medium">Rp</span>
                            <input
                                type="text"
                                value={amount}
                                onChange={handleAmountChange}
                                placeholder="0"
                                className="bg-transparent font-bold text-lg outline-none w-full placeholder-slate-400"
                            />
                        </div>
                    </div>

                    {/* Received Amount (Only for Cash) */}
                    {type === "cash" && (
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Nominal Diterima (Masuk Dompet)</p>
                            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus-within:border-primary transition-colors">
                                <span className="text-slate-500 font-medium">Rp</span>
                                <input
                                    type="text"
                                    value={receivedAmount}
                                    onChange={handleReceivedAmountChange}
                                    placeholder="0"
                                    className="bg-transparent font-bold text-lg outline-none w-full placeholder-slate-400"
                                />
                            </div>
                            <p className="text-xs text-slate-400 mt-1">
                                Jika ada potongan admin di awal, masukkan nominal bersih yang Anda terima di sini.
                            </p>
                        </div>
                    )}

                    {/* Payment Date & Tenor */}
                    <div className="flex gap-4">
                        {/* Start Date */}
                        <div className="flex-1 relative">
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Tanggal Mulai</p>
                            <button
                                onClick={() => setShowDatePicker(true)}
                                className={`w-full bg-slate-100 dark:bg-slate-800/50 border ${startDate ? "border-primary bg-primary/5 text-primary" : "border-slate-200 dark:border-slate-700 text-slate-500"} rounded-xl p-4 font-bold text-left outline-none transition-colors flex items-center justify-between`}
                            >
                                <span>
                                    {startDate ? new Date(startDate).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }) : "Pilih Tanggal"}
                                </span>
                                <span className="material-symbols-outlined text-lg">event</span>
                            </button>
                        </div>

                        {/* Date Picker Bottom Sheet / Modal */}
                        {showDatePicker && (
                            <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
                                <div className="bg-white dark:bg-card-dark w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
                                    {/* Header */}
                                    <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                                        <h3 className="font-bold text-lg">Pilih Tanggal</h3>
                                        <button onClick={() => setShowDatePicker(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                            <span className="material-symbols-outlined">close</span>
                                        </button>
                                    </div>

                                    <div className="p-4">
                                        {/* Year & Month Selection */}
                                        <div className="flex gap-2 mb-4">
                                            <select
                                                value={new Date(startDate || new Date()).getFullYear()}
                                                onChange={(e) => {
                                                    const d = startDate ? new Date(startDate) : new Date();
                                                    d.setFullYear(parseInt(e.target.value));
                                                    setStartDate(d.toISOString().split('T')[0]);
                                                }}
                                                className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 font-bold outline-none"
                                            >
                                                {[...Array(10)].map((_, i) => {
                                                    const y = new Date().getFullYear() - 5 + i;
                                                    return <option key={y} value={y}>{y}</option>;
                                                })}
                                            </select>
                                            <select
                                                value={new Date(startDate || new Date()).getMonth()}
                                                onChange={(e) => {
                                                    const d = startDate ? new Date(startDate) : new Date();
                                                    d.setMonth(parseInt(e.target.value));
                                                    setStartDate(d.toISOString().split('T')[0]);
                                                }}
                                                className="flex-[2] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 font-bold outline-none"
                                            >
                                                {["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"].map((m, i) => (
                                                    <option key={i} value={i}>{m}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Calendar Grid */}
                                        <div className="grid grid-cols-7 gap-1 mb-2">
                                            {['M', 'S', 'S', 'R', 'K', 'J', 'S'].map((d, i) => (
                                                <div key={i} className="text-center text-xs font-bold text-slate-400 py-2">{d}</div>
                                            ))}
                                            {/* Empty slots for start of month */}
                                            {[...Array(new Date(new Date(startDate || new Date()).getFullYear(), new Date(startDate || new Date()).getMonth(), 1).getDay())].map((_, i) => (
                                                <div key={`empty-${i}`} />
                                            ))}
                                            {/* Days */}
                                            {[...Array(new Date(new Date(startDate || new Date()).getFullYear(), new Date(startDate || new Date()).getMonth() + 1, 0).getDate())].map((_, i) => {
                                                const d = i + 1;
                                                // Create date object for this specific day
                                                const year = new Date(startDate || new Date()).getFullYear();
                                                const month = new Date(startDate || new Date()).getMonth();
                                                const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

                                                const isSelected = startDate === dateString;

                                                // Check if date has existing loan
                                                const hasLoan = loans?.some(loan => loan.startDate === dateString);

                                                return (
                                                    <button
                                                        key={d}
                                                        onClick={() => {
                                                            setStartDate(dateString);
                                                            setShowDatePicker(false);
                                                        }}
                                                        className={`aspect-square flex items-center justify-center rounded-xl text-sm font-bold transition-all relative ${isSelected
                                                                ? "bg-primary text-white shadow-lg shadow-primary/30"
                                                                : hasLoan
                                                                    ? "bg-red-50 dark:bg-red-500/10 text-red-500 border border-red-200 dark:border-red-500/30 font-bold"
                                                                    : "hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                                                            }`}
                                                    >
                                                        {d}
                                                        {hasLoan && !isSelected && (
                                                            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-red-500"></span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                                        <button
                                            onClick={() => {
                                                setStartDate(new Date().toISOString().split('T')[0]);
                                                setShowDatePicker(false);
                                            }}
                                            className="w-full py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl font-bold text-primary dark:text-white shadow-sm hover:bg-slate-50 transition-colors"
                                        >
                                            Hari Ini
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tenor */}
                        <div className="flex-1">
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Tenor (Bulan)</p>
                            <input
                                type="number"
                                value={tenor}
                                onChange={(e) => setTenor(e.target.value)}
                                placeholder="Cth: 6"
                                className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 font-medium outline-none focus:border-primary transition-colors"
                            />
                        </div>
                    </div>

                    {/* Monthly Installment (Manual Input) */}
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Cicilan per Bulan</p>
                        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus-within:border-primary transition-colors">
                            <span className="text-slate-500 font-medium">Rp</span>
                            <input
                                type="text"
                                value={monthlyAmount}
                                onChange={handleMonthlyChange}
                                placeholder="0"
                                className="bg-transparent font-bold text-lg outline-none w-full placeholder-slate-400"
                            />
                        </div>
                        {monthlyAmount && tenor && (
                            <div className="mt-3 p-3 bg-primary/10 rounded-lg text-sm text-primary">
                                <p className="font-bold">Total yang harus dibayar:</p>
                                <p className="text-lg">Rp {(parseInt(monthlyAmount.replace(/\./g, ""), 10) * parseInt(tenor || 1, 10)).toLocaleString("id-ID")}</p>
                                {amount && (
                                    <p className="text-xs mt-1 text-slate-500">
                                        (Selisih/Bunga: Rp {((parseInt(monthlyAmount.replace(/\./g, ""), 10) * parseInt(tenor || 1, 10)) - parseInt(amount.replace(/\./g, ""), 10)).toLocaleString("id-ID")})
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Note */}
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Alasan (Wajib)</p>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Kenapa kamu mengambil cicilan ini?"
                            rows={3}
                            className={`w-full bg-slate-100 dark:bg-slate-800/50 border ${note && note.length < 15 ? "border-red-500 focus:border-red-500" : "border-slate-200 dark:border-slate-700 focus:border-primary"} rounded-xl p-4 font-medium outline-none transition-colors resize-none`}
                        />
                        <p className={`text-xs mt-1 text-right ${note.length > 0 && note.length < 15 ? "text-red-500 font-bold" : "text-slate-400"}`}>
                            {note.length}/15 Karakter
                        </p>
                    </div>

                    {/* Target Asset (Cash Loan Only) */}
                    {type === "cash" && (
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Masuk ke Dompet</p>
                            <button
                                onClick={() => setShowAssets(!showAssets)}
                                className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xl material-symbols-outlined">
                                        {targetAsset ? getAssetIcon(targetAsset) : "account_balance_wallet"}
                                    </span>
                                    <span className={targetAsset ? "text-slate-900 dark:text-white font-medium" : "text-slate-400"}>
                                        {targetAsset ? targetAsset.name : "Pilih Dompet Penerima"}
                                    </span>
                                </div>
                                <span className="material-symbols-outlined text-slate-500">expand_more</span>
                            </button>

                            {showAssets && (
                                <div className="mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 p-2 overflow-hidden animate-slide-up">
                                    <div className="max-h-48 overflow-y-auto space-y-1">
                                        {allAssets.map((asset) => (
                                            <button
                                                key={`${asset.assetType}-${asset.id}`}
                                                onClick={() => {
                                                    setTargetAsset(asset);
                                                    setShowAssets(false);
                                                }}
                                                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${targetAsset?.id === asset.id && targetAsset?.assetType === asset.assetType
                                                    ? "bg-primary/10 text-primary"
                                                    : "hover:bg-slate-50 dark:hover:bg-slate-700"
                                                    }`}
                                            >
                                                <span className="material-symbols-outlined text-xl">{getAssetIcon(asset)}</span>
                                                <div className="flex-1 text-left">
                                                    <p className="font-medium text-sm">{asset.name}</p>
                                                    <p className="text-xs text-slate-400 capitalize">{asset.assetType}</p>
                                                </div>
                                                <p className="text-sm font-medium">Rp {asset.amount.toLocaleString("id-ID")}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Save Button */}
            <div className="p-6 pt-4 bg-white dark:bg-background-dark border-t border-slate-100 dark:border-slate-800">
                <button
                    onClick={handleSave}
                    disabled={
                        !name || !amount || !tenor || !monthlyAmount || !note || note.length < 15 || !startDate || !provider ||
                        (type === "cash" && (!targetAsset || !receivedAmount))
                    }
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/30 active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="material-symbols-outlined">save</span>
                    Simpan Cicilan
                </button>
            </div>
        </div>
    );
}
