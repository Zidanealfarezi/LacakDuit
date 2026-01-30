import Header from "../components/Header";
import BalanceCard from "../components/BalanceCard";
import StatsCards from "../components/StatsCards";
import WeeklyChart from "../components/WeeklyChart";
import TransactionList from "../components/TransactionList";
import BottomNav from "../components/BottomNav";

export default function Dashboard() {
    return (
        <>
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen pb-24">
                <div className="max-w-md mx-auto">
                    <Header />
                    <BalanceCard />
                    <StatsCards />
                    <WeeklyChart />
                    <TransactionList />
                </div>
            </div>
            <BottomNav />
        </>
    );
}

