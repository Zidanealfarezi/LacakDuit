import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function Header() {
    const navigate = useNavigate();
    const { userProfile } = useData();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/history?search=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    // Default image if no profile image
    const defaultImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQbhyRIGC7WN1lLjVeQFOp0X10Z5IQke12-epqcNbgFqX7GAGAe86f4uOvDHw43kjgbWFzdY8Yoc9NIrfvgihCUAqiEa-pJmRMcyC0pCYML_1sfksb0HXCn4mMUEWFqEp37yi07ATMkz7zvgywh5eoOo2dQFkbMKO1dVog5eTa0Q4xn-BfHFdsK9NOK_vqSdmLqnK82PbLIO73Dnj6meFhTBhGmFOybc2gZlPIa84koLCUts8PS8cHPFnf15yR0Dav6BWKZy41LA';

    return (
        <nav className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-5 flex items-center justify-between transition-all">
            {!isSearchOpen ? (
                <>
                    <Link to="/profile" className="flex items-center gap-4">
                        <div
                            className="w-14 h-14 rounded-full bg-cover bg-center border-2 border-primary/30 shadow-lg"
                            style={{
                                backgroundImage: `url("${userProfile.profileImage || defaultImage}")`,
                            }}
                        ></div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                                Good morning,
                            </p>
                            <h1 className="text-xl font-bold capitalize">{userProfile.name}</h1>
                        </div>
                    </Link>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/5 transition-colors active:scale-95 hover:bg-slate-300/50 dark:hover:bg-white/10"
                        >
                            <span className="material-symbols-outlined text-[24px]">search</span>
                        </button>
                        <button className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/5 transition-colors relative active:scale-95 hover:bg-slate-300/50 dark:hover:bg-white/10">
                            <span className="material-symbols-outlined text-[24px]">
                                notifications
                            </span>
                            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background-dark"></span>
                        </button>
                    </div>
                </>
            ) : (
                <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2 animate-fade-in relative">
                    <button
                        type="button"
                        onClick={() => setIsSearchOpen(false)}
                        className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            autoFocus
                            placeholder="Cari transaksi..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-full bg-slate-100 dark:bg-white/5 border-none dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-slate-400"
                        />
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                            search
                        </span>
                    </div>
                </form>
            )}
        </nav>
    );
}

