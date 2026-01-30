import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle sign in logic
        window.location.href = "/";
    };

    return (
        <div className="bg-background-dark text-white min-h-screen flex flex-col">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent pointer-events-none"></div>

            {/* Content */}
            <div className="relative flex-1 flex flex-col px-6 py-8">
                {/* Logo */}
                <div className="text-center pt-8 pb-12">
                    <div className="w-20 h-20 bg-primary rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-primary/40">
                        <span className="material-symbols-outlined text-4xl text-white">account_balance_wallet</span>
                    </div>
                    <h1 className="text-2xl font-bold">FinanceTrack</h1>
                    <p className="text-slate-400 text-sm mt-1">Kelola keuanganmu dengan mudah</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
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
                        <label className="text-slate-400 text-xs font-medium mb-2 block">Password</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">lock</span>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Masukkan password"
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 pl-12 pr-12 text-white placeholder-slate-600 outline-none focus:border-primary transition-colors"
                                required
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

                    <div className="flex justify-end">
                        <button type="button" className="text-primary text-sm font-medium">
                            Lupa password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/30 active:scale-[0.98] transition-transform"
                    >
                        Masuk
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-8">
                    <div className="flex-1 h-px bg-slate-700"></div>
                    <span className="text-slate-500 text-sm">atau</span>
                    <div className="flex-1 h-px bg-slate-700"></div>
                </div>

                {/* Social Login */}
                <div className="space-y-3">
                    <button className="w-full bg-slate-800 border border-slate-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-slate-700 transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Lanjutkan dengan Google
                    </button>
                    <button className="w-full bg-slate-800 border border-slate-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-slate-700 transition-colors">
                        <span className="material-symbols-outlined">fingerprint</span>
                        Masuk dengan Biometrik
                    </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center mt-auto pt-8">
                    <p className="text-slate-400">
                        Belum punya akun?{" "}
                        <Link to="/register" className="text-primary font-bold">
                            Daftar
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
