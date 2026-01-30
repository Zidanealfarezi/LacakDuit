import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";

const defaultCategories = [
    { icon: "restaurant", name: "Makanan & Minuman", color: "text-orange-500" },
    { icon: "directions_car", name: "Transportasi", color: "text-blue-500" },
    { icon: "home", name: "Tempat Tinggal", color: "text-primary" },
    { icon: "bolt", name: "Utilitas", color: "text-yellow-500" },
    { icon: "fitness_center", name: "Kesehatan", color: "text-emerald-500" },
    { icon: "sports_esports", name: "Hiburan", color: "text-purple-500" },
    { icon: "shopping_bag", name: "Belanja", color: "text-pink-500" },
    { icon: "payments", name: "Pemasukan", color: "text-emerald-500" },
];

const availableIcons = [
    "category", "favorite", "star", "work", "school", "flight",
    "pets", "child_care", "local_hospital", "local_gas_station",
    "local_pharmacy", "local_grocery_store", "redeem", "savings",
    "account_balance", "credit_card", "attach_money", "monetization_on",
];

const availableColors = [
    "text-red-500", "text-orange-500", "text-yellow-500", "text-emerald-500",
    "text-blue-500", "text-primary", "text-purple-500", "text-pink-500",
];

export default function AddTransaction() {
    const navigate = useNavigate();
    const { addTransaction, getAllAssets } = useData();
    const [type, setType] = useState("expense");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState(null);
    const [showCategories, setShowCategories] = useState(false);
    const [note, setNote] = useState("");

    // Asset selection
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [showAssets, setShowAssets] = useState(false);
    const allAssets = getAllAssets();

    // Custom category state
    const [customCategories, setCustomCategories] = useState([]);
    const [showAddCustom, setShowAddCustom] = useState(false);
    const [customName, setCustomName] = useState("");
    const [customIcon, setCustomIcon] = useState("category");
    const [customColor, setCustomColor] = useState("text-primary");

    const allCategories = [...defaultCategories, ...customCategories];

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    const formatAmount = (value) => {
        const num = value.replace(/\D/g, "");
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleAmountChange = (e) => {
        const formatted = formatAmount(e.target.value);
        setAmount(formatted);
    };

    const handleSave = () => {
        if (!amount || !category) return;

        const numAmount = parseInt(amount.replace(/\./g, ""), 10);
        addTransaction({
            type,
            category: category.name,
            icon: category.icon,
            amount: numAmount,
            note: note || category.name,
            assetId: selectedAsset?.id || null,
            assetType: selectedAsset?.assetType || null,
        });
        navigate("/");
    };

    const handleAddCustomCategory = () => {
        if (customName.trim()) {
            const newCat = {
                icon: customIcon,
                name: customName.trim(),
                color: customColor,
                isCustom: true,
            };
            setCustomCategories([...customCategories, newCat]);
            setCategory(newCat);
            setShowAddCustom(false);
            setShowCategories(false);
            setCustomName("");
            setCustomIcon("category");
            setCustomColor("text-primary");
        }
    };

    const getAssetIcon = (asset) => {
        if (asset.assetType === "ewallet") return asset.logo;
        if (asset.assetType === "bank") return "🏦";
        return "💵";
    };

    return (
        <div className="bg-background-dark text-white h-screen overflow-auto flex flex-col">
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-slate-700 rounded-full"></div>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3">
                <Link
                    to="/"
                    className="w-10 h-10 flex items-center justify-center text-slate-400"
                >
                    <span className="material-symbols-outlined text-2xl">close</span>
                </Link>
                <h1 className="text-lg font-bold">Add Transaction</h1>
                <button className="w-10 h-10 flex items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined text-2xl">help_outline</span>
                </button>
            </div>

            {/* Type Toggle */}
            <div className="px-6 py-4">
                <div className="flex bg-slate-800 p-1 rounded-full">
                    <button
                        onClick={() => setType("expense")}
                        className={`flex-1 py-2.5 text-center rounded-full text-sm font-semibold transition-all ${type === "expense"
                            ? "bg-slate-700 text-white"
                            : "text-slate-400"
                            }`}
                    >
                        Expense
                    </button>
                    <button
                        onClick={() => setType("income")}
                        className={`flex-1 py-2.5 text-center rounded-full text-sm font-semibold transition-all ${type === "income"
                            ? "bg-slate-700 text-white"
                            : "text-slate-400"
                            }`}
                    >
                        Income
                    </button>
                </div>
            </div>

            {/* Amount Input */}
            <div className="px-6 py-6 text-center">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">
                    Amount
                </p>
                <div className="flex items-center justify-center gap-1">
                    <span className="text-slate-500 text-3xl font-light">Rp</span>
                    <input
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="0"
                        className="bg-transparent text-5xl font-bold text-center outline-none w-48 placeholder-slate-600"
                    />
                    <span className="w-0.5 h-12 bg-primary animate-pulse"></span>
                </div>
                <p className="text-slate-600 text-sm mt-3">e.g. Rp50.000</p>
            </div>

            {/* Form Fields */}
            <div className="flex-1 px-6 space-y-4">
                {/* Asset Selection */}
                <div>
                    <p className="text-slate-500 text-xs font-medium mb-2">
                        {type === "expense" ? "Bayar Dari" : "Masuk Ke"}
                    </p>
                    <button
                        onClick={() => setShowAssets(!showAssets)}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-xl">
                                {selectedAsset ? getAssetIcon(selectedAsset) : "💳"}
                            </span>
                            <span className={selectedAsset ? "text-white" : "text-slate-400"}>
                                {selectedAsset ? selectedAsset.name : "Pilih Sumber Dana"}
                            </span>
                            {selectedAsset && (
                                <span className="text-xs text-slate-500">
                                    Rp {selectedAsset.amount.toLocaleString("id-ID")}
                                </span>
                            )}
                        </div>
                        <span className="material-symbols-outlined text-slate-500">
                            expand_more
                        </span>
                    </button>

                    {showAssets && (
                        <div className="mt-2 bg-slate-800 rounded-xl p-3 max-h-48 overflow-y-auto">
                            {allAssets.length === 0 ? (
                                <p className="text-center text-slate-400 py-4 text-sm">Belum ada aset</p>
                            ) : (
                                <div className="space-y-1">
                                    {allAssets.map((asset) => (
                                        <button
                                            key={`${asset.assetType}-${asset.id}`}
                                            onClick={() => {
                                                setSelectedAsset(asset);
                                                setShowAssets(false);
                                            }}
                                            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${selectedAsset?.id === asset.id && selectedAsset?.assetType === asset.assetType ? "bg-primary/20" : "hover:bg-slate-700"}`}
                                        >
                                            <span className="text-xl">{getAssetIcon(asset)}</span>
                                            <div className="flex-1 text-left">
                                                <p className="font-medium text-sm">{asset.name}</p>
                                                <p className="text-xs text-slate-400 capitalize">{asset.assetType === "ewallet" ? "E-Wallet" : asset.assetType === "bank" ? "Bank" : "Tunai"}</p>
                                            </div>
                                            <p className="text-sm font-medium">Rp {asset.amount.toLocaleString("id-ID")}</p>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Category */}
                <div>
                    <p className="text-slate-500 text-xs font-medium mb-2">Category</p>
                    <button
                        onClick={() => setShowCategories(!showCategories)}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <span
                                className={`material-symbols-outlined ${category ? category.color : "text-primary"
                                    }`}
                            >
                                {category ? category.icon : "category"}
                            </span>
                            <span className={category ? "text-white" : "text-slate-400"}>
                                {category ? category.name : "Select Category"}
                            </span>
                        </div>
                        <span className="material-symbols-outlined text-slate-500">
                            expand_more
                        </span>
                    </button>

                    {showCategories && (
                        <div className="mt-2 bg-slate-800 rounded-xl p-2">
                            <div className="grid grid-cols-2 gap-2">
                                {allCategories
                                    .filter((c) =>
                                        type === "income" ? c.name === "Pemasukan" || c.isCustom : c.name !== "Pemasukan"
                                    )
                                    .map((cat) => (
                                        <button
                                            key={cat.name}
                                            onClick={() => {
                                                setCategory(cat);
                                                setShowCategories(false);
                                            }}
                                            className="flex items-center gap-2 p-3 rounded-lg hover:bg-slate-700 transition-colors"
                                        >
                                            <span className={`material-symbols-outlined ${cat.color}`}>
                                                {cat.icon}
                                            </span>
                                            <span className="text-sm truncate">{cat.name}</span>
                                        </button>
                                    ))}
                            </div>
                            {/* Add Custom Button */}
                            <button
                                onClick={() => setShowAddCustom(true)}
                                className="w-full mt-2 p-3 rounded-lg border-2 border-dashed border-slate-600 hover:border-primary text-slate-400 hover:text-primary flex items-center justify-center gap-2 transition-colors"
                            >
                                <span className="material-symbols-outlined">add</span>
                                <span className="text-sm font-medium">Tambah Kategori</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Note */}
                <div>
                    <p className="text-slate-500 text-xs font-medium mb-2">
                        Note (Optional)
                    </p>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="What was this for?"
                        rows={2}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-600 outline-none resize-none focus:border-primary transition-colors"
                    />
                </div>
            </div>

            {/* Save Button */}
            <div className="p-6 pt-4">
                <button
                    onClick={handleSave}
                    disabled={!amount || !category}
                    className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/30 active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Save Transaction
                    <span className="material-symbols-outlined">check_circle</span>
                </button>
            </div>

            {/* Add Custom Category Modal */}
            {showAddCustom && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center">
                    <div className="bg-card-dark w-full max-w-md rounded-t-3xl p-6 space-y-5 animate-slide-up">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold">Kategori Baru</h2>
                            <button
                                onClick={() => setShowAddCustom(false)}
                                className="text-slate-400 hover:text-white"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Preview */}
                        <div className="flex items-center justify-center py-4">
                            <div className="flex items-center gap-3 bg-slate-800 px-6 py-3 rounded-xl">
                                <span className={`material-symbols-outlined text-2xl ${customColor}`}>
                                    {customIcon}
                                </span>
                                <span className="font-semibold">
                                    {customName || "Nama Kategori"}
                                </span>
                            </div>
                        </div>

                        {/* Name Input */}
                        <div>
                            <p className="text-slate-500 text-xs font-medium mb-2">Nama Kategori</p>
                            <input
                                type="text"
                                value={customName}
                                onChange={(e) => setCustomName(e.target.value)}
                                placeholder="e.g. Kopi, Gym, Langganan"
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        {/* Icon Picker */}
                        <div>
                            <p className="text-slate-500 text-xs font-medium mb-2">Pilih Icon</p>
                            <div className="grid grid-cols-6 gap-2">
                                {availableIcons.map((icon) => (
                                    <button
                                        key={icon}
                                        onClick={() => setCustomIcon(icon)}
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${customIcon === icon ? "bg-primary text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}
                                    >
                                        <span className="material-symbols-outlined text-xl">{icon}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Picker */}
                        <div>
                            <p className="text-slate-500 text-xs font-medium mb-2">Pilih Warna</p>
                            <div className="flex gap-2">
                                {availableColors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setCustomColor(color)}
                                        className={`w-10 h-10 rounded-full ${color.replace("text-", "bg-")} ${customColor === color ? "ring-2 ring-offset-2 ring-offset-card-dark ring-white" : ""}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={handleAddCustomCategory}
                            disabled={!customName.trim()}
                            className="w-full bg-primary text-white py-4 rounded-xl font-bold disabled:opacity-50"
                        >
                            Simpan Kategori
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
