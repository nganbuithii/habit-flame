import { Flame, TrendingUp } from 'lucide-react';
import { FlameDetails, Habit } from '@/lib/subabase/type';

export const HabitCard = ({ habit, flameDetails, onCheckIn }: { habit: Habit; flameDetails: FlameDetails; onCheckIn: (id: number) => void }) => (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 relative hover:shadow-md transition-shadow">
        {!habit.lastChecked && (
            <button
                onClick={() => onCheckIn(habit.id)}
                className="absolute top-3 right-3 bg-red-400 text-white px-2 py-1 rounded-full text-xs hover:bg-red-500 transition-colors"
            >
                Check-in
            </button>
        )}
        <div className="h-20 flex items-center justify-center">
            <Flame className={`${flameDetails.color} ${flameDetails.size}`} />
        </div>
        <div className="mt-3 text-lg font-medium text-gray-800">{habit.name}</div>
        <div className="flex justify-center items-center gap-2 mt-2">
            <TrendingUp className="text-red-400 w-4 h-4" />
            <span className="text-gray-600 text-sm">{habit.streak} days</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">Best: {habit.bestStreak} days</div>
        <div className="mt-3 bg-gray-100 h-1 rounded-full overflow-hidden">
            <div
                className="bg-red-400 h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (habit.streak / 30) * 100)}%` }}
            ></div>
        </div>
        <div className="mt-1 text-xs text-gray-500">{habit.streak}/30 to next level</div>
    </div>
);