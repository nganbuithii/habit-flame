import { Flame, TrendingUp } from 'lucide-react';
import { FlameDetails, Habit } from '@/lib/subabase/type';

export const HabitCard = ({ habit, flameDetails, onCheckIn }: { habit: Habit; flameDetails: FlameDetails; onCheckIn: (id: number) => void }) => (
    <div className="bg-white p-3 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 relative group">
        {!habit.lastChecked && (
            <button
                onClick={() => onCheckIn(habit.id)}
                className="absolute -top-1.5 -right-1.5 bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full text-xs font-medium hover:bg-pink-200 transition-colors"
            >
                +1
            </button>
        )}
        
        <div className="flex flex-col items-center text-center">
            <div className="h-14 w-14 bg-pink-50 rounded-xl flex items-center justify-center group-hover:bg-pink-100 transition-colors mb-2">
                <Flame className={`${flameDetails.color} ${flameDetails.size}`} />
            </div>
            
            <h3 className="text-sm font-medium text-gray-800 mb-0.5">{habit.name}</h3>
            
            <div className="flex items-center gap-1 text-gray-500 text-xs">
                <TrendingUp className="w-3 h-3" />
                <span>{habit.streak || 0} days</span>
            </div>
        </div>

        <div className="mt-3">
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="bg-pink-400 h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (habit.streak / 30) * 100)}%` }}
                ></div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>Level {habit.level}</span>
                <span>{habit.streak || 0}/30</span>
            </div>
        </div>
    </div>
);