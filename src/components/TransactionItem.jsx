export default function TransactionItem({
    icon,
    title,
    time,
    category,
    amount,
    type, // "income", "expense", "transfer"
}) {
    // Determine styles based on type
    let iconClass = "text-primary bg-primary/10";
    let amountClass = "text-expense-red";
    let sign = "-";

    if (type === "income") {
        iconClass = "text-income-green bg-income-green/10";
        amountClass = "text-income-green";
        sign = "+";
    } else if (type === "transfer") {
        iconClass = "text-blue-500 bg-blue-500/10";
        amountClass = "text-slate-900 dark:text-white";
        sign = "";
    }

    // Format money
    const formattedAmount = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount);

    return (
        <div className="flex items-center gap-4 bg-transparent px-4 min-h-[76px] py-2 justify-between active:bg-slate-100 dark:active:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
                <div
                    className={`flex items-center justify-center rounded-xl shrink-0 size-12 ${iconClass}`}
                >
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
                <div className="flex flex-col justify-center">
                    <p className="text-base font-semibold leading-normal line-clamp-1">
                        {title}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                        {time} • {category}
                    </p>
                </div>
            </div>
            <div className="shrink-0 text-right">
                <p className={`text-base font-bold leading-normal ${amountClass}`}>
                    {sign}{formattedAmount}
                </p>
            </div>
        </div>
    );
}
