import { Link } from "react-router-dom";

export default function FloatingActionButton() {
    return (
        <Link
            to="/add"
            className="fixed bottom-8 right-6 w-16 h-16 bg-primary text-white rounded-full shadow-[0_8px_25px_rgba(100,103,242,0.5)] flex items-center justify-center transition-transform active:scale-90 z-50"
        >
            <span className="material-symbols-outlined text-3xl">add</span>
        </Link>
    );
}

