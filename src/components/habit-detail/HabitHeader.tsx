import { Flame, Calendar } from 'lucide-react';

interface HabitHeaderProps {
    name: string;
    description?: string;
    created_at: string;
    flame_intensity: number;
}

const getFlameIntensityColor = (intensity: number) => {
    switch (intensity) {
        case 1: return 'text-red-400';
        case 2: return 'text-orange-400';
        case 3: return 'text-amber-400';
        case 4: return 'text-green-400';
        default: return 'text-pink-400';
    }
};

export const HabitHeader: React.FC<HabitHeaderProps> = ({
    name,
    description,
    created_at,
    flame_intensity
}) => {
    return (
        <div className="flex items-start gap-5 mb-6">
            <div className="h-20 w-20 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl flex items-center justify-center shadow-inner relative">
                <Flame className={`${getFlameIntensityColor(flame_intensity)} text-4xl`} />
            </div>
            <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">{name}</h1>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>Started on {new Date(created_at).toLocaleDateString()}</span>
                </div>
                {description && (
                    <p className="text-gray-600 text-sm">{description}</p>
                )}
            </div>
        </div>
    );
}; 