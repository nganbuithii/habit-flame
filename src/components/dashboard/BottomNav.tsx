import { Award, Flame, Settings, TrendingUp } from "lucide-react";

const NavButton = ({ icon, label, active }: { icon: React.ReactNode; label: string; active: boolean }) => (
    <button className={`p-2 ${active ? 'text-pink-600' : 'text-pink-400'} flex flex-col items-center`}>
        {icon}
        <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
);
export const BottomNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 shadow-lg p-2 flex justify-around">
        <NavButton icon={<Flame />} label="Streaks" active={true} />
        <NavButton icon={<Award />} label="Achievements" active={false} />
        <NavButton icon={<TrendingUp />} label="Stats" active={false} />
        <NavButton icon={<Settings />} label="Settings" active={false} />
    </div>
);
