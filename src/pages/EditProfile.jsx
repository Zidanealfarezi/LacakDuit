import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

export default function EditProfile() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [profileImage, setProfileImage] = useState(null);
    const [formData, setFormData] = useState({
        fullName: "John Doe",
        email: "john.doe@email.com",
        phone: "08123456789",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log("Saving profile:", { ...formData, profileImage });

        // Navigate back to profile page
        navigate("/profile");
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen pb-24">
            {/* Header */}
            <div className="bg-gradient-to-b from-primary/20 to-transparent pt-8 pb-6 px-6">
                <div className="flex items-center gap-4 mb-6">
                    <Link to="/profile" className="w-10 h-10 flex items-center justify-center bg-white dark:bg-card-dark rounded-full shadow-sm text-slate-600 dark:text-slate-300">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h1 className="text-xl font-bold">Edit Profil</h1>
                </div>
            </div>

            {/* Form */}
            <div className="px-6 space-y-6">
                <div className="flex flex-col items-center mb-8">
                    <div
                        onClick={triggerFileInput}
                        className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-primary/30 mb-4 relative cursor-pointer overflow-hidden group"
                    >
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            "JD"
                        )}
                        <div className="absolute inset-0 bg-black/20 hidden group-hover:flex items-center justify-center transition-opacity">
                            <span className="material-symbols-outlined text-white">edit</span>
                        </div>
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-white dark:bg-card-dark rounded-full shadow-md flex items-center justify-center text-primary z-10">
                            <span className="material-symbols-outlined text-sm">camera_alt</span>
                        </button>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                    />
                    <p className="text-slate-500 text-sm">Ketuk untuk ubah foto</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600 dark:text-slate-400">Nama Lengkap</label>
                        <div className="flex items-center gap-3 bg-white dark:bg-card-dark p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 focus-within:border-primary transition-colors">
                            <span className="material-symbols-outlined text-slate-400">person</span>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="bg-transparent w-full outline-none font-medium placeholder:text-slate-300"
                                placeholder="Masukkan nama lengkap"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600 dark:text-slate-400">Email</label>
                        <div className="flex items-center gap-3 bg-white dark:bg-card-dark p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 focus-within:border-primary transition-colors">
                            <span className="material-symbols-outlined text-slate-400">mail</span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-transparent w-full outline-none font-medium placeholder:text-slate-300"
                                placeholder="Masukkan email"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600 dark:text-slate-400">Nomor Telepon</label>
                        <div className="flex items-center gap-3 bg-white dark:bg-card-dark p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 focus-within:border-primary transition-colors">
                            <span className="material-symbols-outlined text-slate-400">call</span>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="bg-transparent w-full outline-none font-medium placeholder:text-slate-300"
                                placeholder="Masukkan nomor telepon"
                            />
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 active:scale-95 transition-transform flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">save</span>
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
