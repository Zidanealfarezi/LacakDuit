import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

    const passwordMatch = password === confirmPassword || confirmPassword === "";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) return;
        // Handle registration logic
        window.location.href = "/";
    };

    return (
        <div className="bg-background-dark text-white min-h-screen flex flex-col">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent pointer-events-none"></div>

            {/* Content */}
            <div className="relative flex-1 flex flex-col px-6 py-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <Link to="/login" className="text-slate-400 hover:text-white">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h1 className="text-xl font-bold">Buat Akun</h1>
                </div>

                {/* Progress */}
                <div className="flex gap-2 mb-8">
                    <div className="flex-1 h-1 bg-primary rounded-full"></div>
                    <div className="flex-1 h-1 bg-slate-700 rounded-full"></div>
                    <div className="flex-1 h-1 bg-slate-700 rounded-full"></div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 flex-1">
                    <div>
                        <label className="text-slate-400 text-xs font-medium mb-2 block">Nama Lengkap</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">person</span>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Masukkan nama lengkap"
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 pl-12 text-white placeholder-slate-600 outline-none focus:border-primary transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-slate-400 text-xs font-medium mb-2 block">Email</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">mail</span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="nama@email.com"
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 pl-12 text-white placeholder-slate-600 outline-none focus:border-primary transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-slate-400 text-xs font-medium mb-2 block">Kata Sandi</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">lock</span>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Min. 8 karakter"
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 pl-12 pr-12 text-white placeholder-slate-600 outline-none focus:border-primary transition-colors"
                                required
                                minLength={8}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                            >
                                <span className="material-symbols-outlined">
                                    {showPassword ? "visibility_off" : "visibility"}
                                </span>
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="text-slate-400 text-xs font-medium mb-2 block">Konfirmasi Kata Sandi</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">lock</span>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Ulangi kata sandi"
                                className={`w-full bg-slate-800/50 border rounded-xl p-4 pl-12 text-white placeholder-slate-600 outline-none transition-colors ${passwordMatch ? "border-slate-700 focus:border-primary" : "border-red-500"
                                    }`}
                                required
                            />
                            {!passwordMatch && (
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-red-500">
                                    error
                                </span>
                            )}
                        </div>
                        {!passwordMatch && (
                            <p className="text-red-500 text-xs mt-1">Password tidak cocok</p>
                        )}
                    </div>

                    {/* Terms */}
                    <label className="flex items-start gap-3 cursor-pointer pt-2">
                        <input
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-5 h-5 border-2 border-slate-600 rounded flex items-center justify-center shrink-0 peer-checked:bg-primary peer-checked:border-primary transition-colors">
                            {agreeTerms && (
                                <span className="material-symbols-outlined text-white text-sm">check</span>
                            )}
                        </div>
                        <span className="text-slate-400 text-sm leading-tight">
                            Saya setuju dengan{" "}
                            <button type="button" className="text-primary">Syarat & Ketentuan</button>
                            {" "}dan{" "}
                            <button type="button" className="text-primary">Kebijakan Privasi</button>
                        </span>
                    </label>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={!agreeTerms || !passwordMatch}
                            className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/30 active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                        >
                            Daftar Sekarang
                        </button>
                    </div>
                </form>

                {/* Sign In Link */}
                <div className="text-center pt-6">
                    <p className="text-slate-400">
                        Sudah punya akun?{" "}
                        <Link to="/login" className="text-primary font-bold">
                            Masuk
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
