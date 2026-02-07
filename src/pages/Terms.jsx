import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";

export default function Terms() {
    return (
        <PageTransition>
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen pb-10">
                {/* Header */}
                <nav className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-4 flex items-center gap-3 border-b border-slate-200 dark:border-white/5">
                    <Link
                        to="/settings"
                        className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h1 className="text-lg font-bold">Syarat & Ketentuan</h1>
                </nav>

                <main className="px-6 py-6 space-y-6 max-w-2xl mx-auto">
                    <section className="space-y-2">
                        <h2 className="text-lg font-bold text-primary">1. Pendahuluan</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Selamat datang di aplikasi LacakDuit. Dengan menggunakan aplikasi ini, Anda setuju untuk terikat oleh syarat dan ketentuan berikut. Harap baca dengan saksama sebelum melanjutkan penggunaan aplikasi.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-bold text-primary">2. Penggunaan Aplikasi</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Aplikasi ini dirancang untuk membantu Anda memantau dan mengelola keuangan pribadi. Anda bertanggung jawab penuh atas data yang Anda masukkan dan keamanan akun Anda. Kami tidak bertanggung jawab atas kesalahan pencatatan yang disebabkan oleh pengguna.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-bold text-primary">3. Privasi Data</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Kami menghargai privasi Anda. Data keuangan Anda disimpan secara lokal di perangkat Anda (untuk versi offline) atau di server kami yang terenkripsi (untuk versi sinkronisasi). Kami tidak akan membagikan data pribadi Anda kepada pihak ketiga tanpa persetujuan Anda.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-bold text-primary">4. Perubahan Layanan</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Kami berhak untuk mengubah, menangguhkan, atau menghentikan layanan kapan saja tanpa pemberitahuan sebelumnya. Kami juga dapat memperbarui syarat dan ketentuan ini dari waktu ke waktu.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-bold text-primary">5. Hubungi Kami</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Jika Anda memiliki pertanyaan mengenai syarat dan ketentuan ini, silakan hubungi tim dukungan kami melalui menu bantuan di aplikasi.
                        </p>
                    </section>

                    <div className="pt-8 text-center">
                        <p className="text-xs text-slate-400">
                            Terakhir diperbarui: 24 Oktober 2023
                        </p>
                    </div>
                </main>
            </div>
        </PageTransition>
    );
}
