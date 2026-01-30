import { Link } from "react-router-dom";

export default function Header() {
    return (
        <nav className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-5 flex items-center justify-between">
            <Link to="/profile" className="flex items-center gap-4">
                <div
                    className="w-14 h-14 rounded-full bg-cover bg-center border-2 border-primary/30 shadow-lg"
                    style={{
                        backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDQbhyRIGC7WN1lLjVeQFOp0X10Z5IQke12-epqcNbgFqX7GAGAe86f4uOvDHw43kjgbWFzdY8Yoc9NIrfvgihCUAqiEa-pJmRMcyC0pCYML_1sfksb0HXCn4mMUEWFqEp37yi07ATMkz7zvgywh5eoOo2dQFkbMKO1dVog5eTa0Q4xn-BfHFdsK9NOK_vqSdmLqnK82PbLIO73Dnj6meFhTBhGmFOybc2gZlPIa84koLCUts8PS8cHPFnf15yR0Dav6BWKZy41LA")',
                    }}
                ></div>
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        Good morning,
                    </p>
                    <h1 className="text-xl font-bold">Zidane Zidan</h1>
                </div>
            </Link>
            <div className="flex gap-2">
                <button className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/5 transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-[24px]">search</span>
                </button>
                <button className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/5 transition-colors relative active:scale-95">
                    <span className="material-symbols-outlined text-[24px]">
                        notifications
                    </span>
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background-dark"></span>
                </button>
            </div>
        </nav>
    );
}

