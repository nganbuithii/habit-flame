import { Clock, Trophy } from 'lucide-react';

interface StreakCardProps {
    type: 'current' | 'best';
    value: number;
}

export const StreakCard: React.FC<StreakCardProps> = ({ type, value }) => {
    const Icon = type === 'current' ? Clock : Trophy;
    const label = type === 'current' ? 'Current Streak' : 'Best Streak';

    return (
        <div className="bg-gradient-to-br from-pink-50 to-pink-100/50 p-5 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="absolute bottom-0 right-0 h-20 w-20 text-pink-200/30 -mb-5 -mr-5">
                <Icon className="w-full h-full" />
            </div>
            <div className="flex items-center gap-3 mb-2">
                <div className="bg-white p-2 rounded-full shadow-sm">
                    <Icon className="text-pink-400 w-5 h-5" />
                </div>
                <div className="text-gray-600 text-sm font-medium">{label}</div>
            </div>
            <div className="text-3xl font-bold text-gray-800 flex items-baseline gap-2">
                {value} <span className="text-sm text-gray-500 font-medium">days</span>
            </div>
        </div>
    );
}; 