import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function AddLoan() {
    const navigate = useNavigate();
    const { addLoan, getAllAssets } = useData();

    const [type, setType] = useState("paylater"); // paylater, cash
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(""); // This is now Principal
    const [monthlyAmount, setMonthlyAmount] = useState(""); // New state for Installment
    const [tenor, setTenor] = useState("");
    const [dueDate, setDueDate] = useState(""); // Monthly Due Date (1-31)
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

    const allAssets = getAllAssets();

    const formatAmount = (value) => {
        const num = value.replace(/\D/g, "");
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleAmountChange = (e) => {
        setAmount(formatAmount(e.target.value));
    };

    const handleMonthlyChange = (e) => {
        setMonthlyAmount(formatAmount(e.target.value));
    };

    const handleSave = () => {
        if (!name || !amount || !tenor || !monthlyAmount || !note || !dueDate) return;
        if (note.length < 15) return; // Enforce minimum length
        if (type === "cash" && !targetAsset) return;
        if (type === "paylater" && !provider) return;

        const numPrincipal = parseInt(amount.replace(/\./g, ""), 10);
        const numMonthly = parseInt(monthlyAmount.replace(/\./g, ""), 10);
        const numTenor = parseInt(tenor, 10);

        addLoan({
            type,
            name,
            note,
            dueDate: parseInt(dueDate, 10), // Save due date
            provider: type === "paylater" ? provider : null,
            principalAmount: numPrincipal, // Save principal
            monthlyInstallment: numMonthly, // Save installment
            // totalAmount will be calculated in DataContext or we can pass it
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
                        onClick={() => setType("paylater")}
                        className={`flex-1 py-2.5 text-center rounded-full text-sm font-semibold transition-all ${type === "paylater"
                            ? "bg-white shadow-sm text-primary dark:bg-card-dark"
                            : "text-slate-500 hover:bg-white/50 dark:hover:bg-white/5"
                            }`}
                    >
                        Paylater Barang
                    </button>
                    <button
                        onClick={() => setType("cash")}
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
                    {/* PayLater Provider Selection (Only for Paylater) */}
                    {type === "paylater" && (
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Layanan PayLater</p>
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
                                    {payLaterProviders.map((prov) => (
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
                    )}

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

                    {/* Principal Amount */}
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">
                            {type === "paylater" ? "Harga Barang" : "Nominal Pinjaman (Diterima)"}
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

                    {/* Payment Date & Tenor */}
                    <div className="flex gap-4">
                        {/* Due Date */}
                        <div className="flex-1">
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Jatuh Tempo (Tgl)</p>
                            <select
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 font-medium outline-none focus:border-primary transition-colors appearance-none"
                            >
                                <option value="" disabled>Pilih</option>
                                {[...Array(31)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>

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
                    disabled={!name || !amount || !tenor || !monthlyAmount || !note || note.length < 15 || !dueDate || (type === "cash" && !targetAsset) || (type === "paylater" && !provider)}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/30 active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="material-symbols-outlined">save</span>
                    Simpan Cicilan
                </button>
            </div>
        </div>
    );
}
