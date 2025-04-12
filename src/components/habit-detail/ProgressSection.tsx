import { Award, TrendingUp } from 'lucide-react';

interface ProgressSectionProps {
    current_streak: number;
    flame_intensity: number;
    level: number;
}

const getFlameGradient = (intensity: number) => {
    switch (intensity) {
        case 1: return 'from-red-400 to-red-500';
        case 2: return 'from-orange-400 to-orange-500';
        case 3: return 'from-amber-400 to-amber-500';
        case 4: return 'from-green-400 to-green-500';
        default: return 'from-pink-400 to-pink-500';
    }
};

export const ProgressSection: React.FC<ProgressSectionProps> = ({
    current_streak,
    flame_intensity,
    level
}) => {
    const streakPercentage = Math.min(100, (current_streak / 30) * 100);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-r from-pink-400 to-pink-500 p-2 rounded-full shadow-sm">
                        <TrendingUp className="text-white w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">Level Progress</h2>
                </div>
                <div className="bg-pink-50 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-pink-600">Level {level}</span>
                </div>
            </div>
            
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner mb-2">
                <div
                    className={`bg-gradient-to-r ${getFlameGradient(flame_intensity)} h-full transition-all duration-500 ease-out rounded-full`}
                    style={{ width: `${streakPercentage}%` }}
                ></div>
            </div>
            
            <div className="relative mt-10 px-10 ml-12 h-10 mb-2">
                {[...Array(5)].map((_, i) => {
                    const milestone = i * 7;
                    const completed = current_streak >= milestone;
                    return (
                        <div 
                            key={i}
                            className="absolute transform -translate-x-1/2"
                            style={{ left: `${(milestone / 30) * 100}%`, bottom: 0 }}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${completed ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white' : 'bg-gray-100 text-gray-400'} shadow-sm mb-1`}>
                                <Award className="w-5 h-5" />
                            </div>
                            <div className="text-center text-xs font-medium text-gray-600">
                                {milestone} days
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}; 