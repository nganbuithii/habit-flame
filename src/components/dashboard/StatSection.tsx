import { Habit } from '@/lib/subabase/type';

export const StatsSection = ({ habits }: { habits: Habit[] }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
            { label: "Total Habits", value: habits.length },
            { label: "Completed Today", value: `${habits.filter(h => h.lastChecked).length}/${habits.length}` },
            { label: "Longest Streak", value: Math.max(...habits.map(h => h.bestStreak)) },
            { label: "Achievements", value: "5/20" },
        ].map((stat, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-500 text-xs mb-1">{stat.label}</div>
                {/* <div className="text-lg font-medium text-gray-800">{stat.value}</div> */}
            </div>
        ))}
    </div>
);