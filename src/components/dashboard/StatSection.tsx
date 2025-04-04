import { Habit } from '@/lib/subabase/type';

export const StatsSection = ({ habits }: { habits: Habit[] }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
            { label: "Total Habits", value: habits.length },
            { label: "Completed Today", value: `${habits.filter(h => h.lastChecked).length}/${habits.length}` },
            { label: "Longest Streak", value: Math.max(...habits.map(h => h.bestStreak)) },
            { label: "Achievements", value: "5/20" },
        ].map((stat, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-gray-500 text-sm">{stat.label}</div>
                <div className="text-xl font-semibold text-gray-800">{stat.value}</div>
            </div>
        ))}
    </div>
);