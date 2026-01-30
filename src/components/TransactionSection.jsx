import TransactionItem from "./TransactionItem";

export default function TransactionSection({ title, transactions }) {
    return (
        <section>
            <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest px-4 pb-2 pt-6">
                {title}
            </h3>
            {transactions.map((tx, index) => (
                <TransactionItem key={index} {...tx} />
            ))}
        </section>
    );
}
